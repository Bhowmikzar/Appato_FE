import React, { useState } from "react";
import "./campaigns.css";

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: [],
};

const Campaigns = (props) => {
  const [items, setItems] = useState(props.items);
  const [list, setList] = useState(items);
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const [selectedStatus, setSelectedStatus] = useState("");

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: list,
    });

    event.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (event) => {
    event.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = (event) => {
    setList(dragAndDrop.updatedOrder);

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    if (event.target.value === "") {
      setList(items);
    } else {
      setList(items.filter((item) => item.status === event.target.value));
    }
  };

  return (
    <section className="campaign">
      <div className="filters">
        <label htmlFor="status-filter">Filter by status:</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="Sending">Sending</option>
          <option value="Sent">Sent</option>
          <option value="Draft">Draft</option>
          <option value="Error">Error</option>
          <option value="Stopped">Stopped</option>
        </select>
      </div>
      <ul className="campaign">
        {list.map((item, index) => {
          return (
            <li
              key={index}
              data-position={index}
              draggable
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onDragLeave={onDragLeave}
              className={
                dragAndDrop && dragAndDrop.draggedTo === Number(index)
                  ? "dropArea"
                  : ""
              }
            >
              <span>{item.campaign}</span>
              <p className="status">{item.status}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default Campaigns;
