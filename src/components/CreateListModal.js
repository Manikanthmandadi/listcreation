import React from "react";
import "../App.css";

const CreateListModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <h2>Create a new list</h2>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default CreateListModal;