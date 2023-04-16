import React, { useState } from "react";
import "./FolderStructure.css";
import { Link } from "react-router-dom";

function FolderStructure() {
  const [treeviewItems, setTreeviewItems] = useState([
    {
      id: 1,
      name: "Christmas",
      children: [
        {
          id: 2,
          name: "Party",
          children: [],
        },
        {
          id: 3,
          name: "Newsletter",
          children: [],
        },
      ],
    },
    {
      id: 6,
      name: "Company's",
      children: [
        {
          id: 7,
          name: "Special Events",
          children: [],
        },
      ],
    },
  ]);

  const [newFolderName, setNewFolderName] = useState("");

  function handleItemClick(event, item) {
    // Handle item click event
  }

  function handleAddFolder(event) {
    event.preventDefault();
    const newFolder = {
      id: Date.now(),
      name: newFolderName,
      children: [],
    };
    setTreeviewItems([newFolder, ...treeviewItems]);
    setNewFolderName("");
  }

  function handleInputChange(event) {
    setNewFolderName(event.target.value);
  }

  function renderTreeviewItem(item) {
    return (
      <ul className="lists">
        {" "}
        <li key={item.id} style={{ flexDirection: "column" }}>
          <div onClick={(event) => handleItemClick(event, item)}>
            {item.name}
          </div>
          <Link to="/test">
            {item.children.length > 0 && (
              <ul>{item.children.map((child) => renderTreeviewItem(child))}</ul>
            )}
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div style={{ background: "#1AA7EC", height: "100vh", fontSize: "20px" }}>
      <form onSubmit={handleAddFolder} className="sidebar">
        <input type="text" value={newFolderName} onChange={handleInputChange} />
        <button type="submit">Add Folder</button>
      </form>
      <ul>{treeviewItems.map((item) => renderTreeviewItem(item))}</ul>
    </div>
  );
}

export default FolderStructure;
