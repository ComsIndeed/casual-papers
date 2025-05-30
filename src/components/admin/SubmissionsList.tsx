import ExpansionTile from "./ExpansionTile";
import React, { useEffect, useState } from "react"; // Add useState
import { Content } from "../../classes/Content";

// Import Firebase SDK functions
import { onAuthStateChanged } from "firebase/auth"; // Listen for auth state changes
import { auth, db } from "../../classes/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Content[]>([]); // Use useState
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null); // To store authenticated user info

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // Re-fetch submissions when auth state changes
      if (user) {
        fetchAllSubmissions(user);
      } else {
        setSubmissions([]); // Clear submissions if logged out
        setError("Please log in to view submissions.");
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribeAuth();
  }, []); // Only run once on mount to set up auth listener

  useEffect(() => {
    // This effect depends on currentUser, so it re-runs when currentUser changes
    if (currentUser) {
      fetchAllSubmissions(currentUser);
    } else if (auth.currentUser === null && !loading) {
      // Handle initial state when no user is logged in
      setError("Please log in to view submissions.");
      setLoading(false);
    }
  }, [currentUser]); // Re-run when currentUser changes

  const fetchAllSubmissions = async (user: any) => {
    setLoading(true);
    setError(null);

    if (!user) {
      // Should ideally be handled by useEffect above, but a safety check
      setError("Authentication required to view submissions.");
      setLoading(false);
      return;
    }

    try {
      // Force refresh token to get latest claims (important for admin check)
      const idTokenResult = await user.getIdTokenResult(true);
      const isAdmin = idTokenResult.claims.admin === true;

      if (!isAdmin) {
        setError("You do not have permission to view submissions.");
        setLoading(false);
      }

      const allSubmissionsCollectionRef = collection(
        db,
        "casualpapers",
        "user_generated",
        "allSubmissions"
      );

      const querySnapshot = await getDocs(allSubmissionsCollectionRef);
      const fetchedSubmissions: Content[] = [];
      querySnapshot.forEach((doc) => {
        const submissionsObject = doc.data() as object;
        const submissions = Object.values(submissionsObject);
        console.log("Fetched submissions:", submissions);
        submissions.forEach((submission: string) => {
          try {
            const content = Content.fromJson(submission);
            console.log("Parsed content:", content);
            fetchedSubmissions.push(content);
          } catch (parseError) {
            console.error("Error parsing submission:", parseError);
          }
        });
      });

      setSubmissions(fetchedSubmissions);
    } catch (err: any) {
      console.error("Error fetching submissions: ", err);
      if (err.code === "permission-denied") {
        // This might happen if the token didn't refresh in time or rule is strict
        setError(
          "Permission denied. You might not have access or your session needs refreshing."
        );
      } else {
        setError("Failed to fetch submissions. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="submissions-list">Loading submissions...</div>;
  }

  if (error) {
    return <div className="submissions-list error">{error}</div>;
  }

  if (submissions.length === 0) {
    // Distinguish between no submissions at all vs. no submissions for this user
    if (
      currentUser &&
      !currentUser.isAnonymous &&
      !currentUser.getIdTokenResult().then((r: any) => {
        r.claims.admin;
      })
    ) {
      return (
        <div className="submissions-list">
          You haven't made any submissions yet.
        </div>
      );
    }
    return <div className="submissions-list">No submissions found.</div>;
  }

  const handleApprove = async (content: Content) => {
    console.log("Approve:", content.id);
    // Set "status" to "approved" and move to /casualpapers/contents/content_collection
    try {
      const submittedContentRef = doc(
        db,
        "casualpapers",
        "user_generated",
        "allSubmissions",
        currentUser.uid
      );
      const targetContent = await getDoc(submittedContentRef);
      const contentCollectionRef = collection(
        db,
        "casualpapers",
        "contents",
        "content_collection"
      );
      await setDoc(doc(contentCollectionRef, content.id), targetContent.data());
      await deleteDoc(submittedContentRef);
    } catch (e) {
      console.error("Error approving content:", e);
      setError("Failed to approve submission. Please try again.");
    }
  };

  const handleReject = (content: Content) => {
    console.log("Reject:", content.id);
    // Set "status" to "rejected" and do nothing else
  };

  return (
    <div className="submissions-list">
      {submissions.map((submission) => (
        <ExpansionTile
          key={submission.id}
          content={submission}
          handleApprove={handleApprove}
          handleReject={handleReject}
        />
      ))}
    </div>
  );
}
