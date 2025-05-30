import React, { useState } from "react";
import { Content } from "../classes/Content";
import { auth, db } from "../classes/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { v4 } from "uuid";

export const WriteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    head: "",
    body: "",
    author: "",
    tags: "",
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = new Content(
      undefined,
      formData.head,
      formData.body,
      formData.author,
      formData.tags.split(",").map((tag) => tag.trim()),
      formData.imageUrl || null
    );
    console.log("New content:", content);
    // add a content to firestore
    if (!auth.currentUser) {
      console.error("User is not authenticated");
      return;
    }
    const uid = auth.currentUser!.uid;
    const userSubmissionsDocument = doc(
      db,
      "casualpapers",
      "user_generated",
      "allSubmissions",
      uid
    );
    const docRef = await setDoc(
      userSubmissionsDocument,
      { [content.id]: content.toJson() },
      { merge: true }
    );
    window.alert(
      "Your submission has been saved and is awaiting approval. Thank you for your contribution!"
    );
  };

  const handlePreview = () => {
    const content = new Content(
      undefined,
      formData.head,
      formData.body,
      formData.author,
      formData.tags.split(",").map((tag) => tag.trim()),
      formData.imageUrl || null
    );

    const contentJson = content.toJson();
    sessionStorage.setItem("previewContent", contentJson);
    window.location.href = "/write/preview";
  };

  return (
    <form onSubmit={handleSubmit} className="write-form">
      <label htmlFor="head">Title:</label>
      <input
        type="text"
        id="head"
        name="head"
        value={formData.head}
        onChange={handleChange}
        required
      />

      <label htmlFor="body">Content:</label>
      <textarea
        id="body"
        name="body"
        rows={4}
        value={formData.body}
        onChange={handleChange}
        required
      />

      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <label htmlFor="tags">Tags (comma-separated):</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
      />

      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="url"
        id="imageUrl"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <div className="button-row">
        <button onClick={handlePreview}>Preview</button>
        <button>My Submissions</button>
        <button type="submit" className="primary-button">
          Submit
        </button>
      </div>
      <p>
        Your submission will first undergo an approval process before it may be
        published.
      </p>
    </form>
  );
};
