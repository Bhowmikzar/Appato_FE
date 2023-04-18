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
  const [newFolderParent, setNewFolderParent] = useState(null);

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

    if (newFolderParent) {
      // Find the parent folder and add the new folder to its children
      const newTreeviewItems = [...treeviewItems];
      const parentFolder = findItemById(newTreeviewItems, newFolderParent.id);
      parentFolder.children.push(newFolder);
      setTreeviewItems(newTreeviewItems);
    } else {
      // Add the new folder to the top level of the treeview
      setTreeviewItems([newFolder, ...treeviewItems]);
    }
    setNewFolderName("");
    setNewFolderParent(null);
  }

  function handleInputChange(event) {
    setNewFolderName(event.target.value);
  }

  function handleParentSelect(event) {
    const parentId = parseInt(event.target.value);
    if (parentId === 0) {
      setNewFolderParent(null);
    } else {
      const parentItem = findItemById(treeviewItems, parentId);
      setNewFolderParent(parentItem);
    }
  }

  function findItemById(items, id) {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children.length > 0) {
        const foundItem = findItemById(item.children, id);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return null;
  }

  function renderTreeviewItem(item) {
    return (
      <ul className="lists">
        <li
          key={item.id}
          style={{ flexDirection: "column", cursor: "pointer" }}
        >
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
      <form onSubmit={handleAddFolder}>
        <input type="text" value={newFolderName} onChange={handleInputChange} />
        <select onChange={handleParentSelect}>
          <option value="0">-- Top Level --</option>

          {treeviewItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Folder</button>
      </form>
      <ul>{treeviewItems.map((item) => renderTreeviewItem(item))}</ul>
    </div>
  );
}

export default FolderStructure;
