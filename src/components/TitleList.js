import React from "react";
import './components.scss';

function TitleList({ titles, deleteTitle }) {
  return (
    <div>
      <h3>Your Titles</h3>
      <ul className="tile-list-container">
        {titles.map((title) => (
          <li key={title.id}>
            <p>{title.subject + ", " + title.description}</p>
            <div>
              <button className="list-delete-button" onClick={() => deleteTitle && deleteTitle(title.id)} disabled={!deleteTitle}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TitleList;
