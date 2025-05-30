import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ExpansionTile({
  content,
  handleApprove,
  handleReject,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`expansion-tile ${expanded ? "expanded" : ""}`}>
      <div className="tile-header">
        <div className="action-buttons">
          <button
            className="approve-btn"
            onClick={() => {
              handleApprove(content);
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
              />
            </svg>
          </button>
          <button
            className="reject-btn"
            onClick={() => {
              handleReject(content);
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </button>
        </div>
        <div className="title-section" onClick={() => setExpanded(!expanded)}>
          <h3>{content.head}</h3>
          <div className="metadata">
            <span>By {content.metadata.author}</span>
            <span className="seperator">|</span>
            <span>Tags: {content.metadata.tags.join(", ")}</span>
            <span className="seperator">|</span>
            <span>
              {new Date(content.metadata.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="content-body">
        <ReactMarkdown>{content.body}</ReactMarkdown>
      </div>
    </div>
  );
}
