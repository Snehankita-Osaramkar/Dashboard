import React from 'react';
import './Modal.scss'; 

const Modal = ({ isOpen, onClose, vendor }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Vendor All Details</h2>
        <div>
          <p><strong>Name:</strong> {vendor.name}</p>
          <p><strong>Type:</strong> {vendor.type}</p>
          <p><strong>Criticality:</strong> {vendor.criticality}</p>
          <p><strong>Status:</strong> {vendor.status}</p>
          <p><strong>Contact:</strong> {vendor.contact}</p>
          <p><strong>Service Provided:</strong> {vendor.serviceProvided}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
