import React, { useState, useEffect } from 'react';

// library imports
import { CheckIcon } from '@heroicons/react/24/solid';

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);
  const [updatedPrice, setUpdatedPrice] = useState(editedTask.price);
  const [updatedQuantity, setUpdatedQuantity] = useState(editedTask.quantity);
  const [updatedImage, setUpdatedImage] = useState(editedTask.image);

  useEffect(() => {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeEditMode();
    };

    window.addEventListener('keydown', closeModalIfEscaped);

    return () => {
      window.removeEventListener('keydown', closeModalIfEscaped);
    };
  }, [closeEditMode]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImage(reader.result); // Set updated image as base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask({
      ...editedTask,
      name: updatedTaskName,
      price: updatedPrice,
      quantity: updatedQuantity,
      image: updatedImage,
    });
  };

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => { e.target === e.currentTarget && closeEditMode(); }}
    >
      <form
        className="todo"
        onSubmit={handleFormSubmit}
      >
        <div className="wrapper">
          <input
            type="text"
            id="editTask"
            className="input"
            value={updatedTaskName}
            onInput={(e) => setUpdatedTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Nama Barang"
          />
          <label htmlFor="editTask" className="label">Update Nama Barang</label>
        </div>
        <div className="wrapper">
          <input
            type="number"
            id="editPrice"
            className="input"
            value={updatedPrice}
            onInput={(e) => setUpdatedPrice(e.target.value)}
            required
            placeholder="Update Harga Barang"
          />
          <label htmlFor="editPrice" className="label">Update Harga Barang</label>
        </div>
        <div className="wrapper">
          <input
            type="number"
            id="editQuantity"
            className="input"
            value={updatedQuantity}
            onInput={(e) => setUpdatedQuantity(e.target.value)}
            required
            placeholder="Update Jumlah Barang"
          />
          <label htmlFor="editQuantity" className="label">Update Jumlah Barang</label>
        </div>
        <div className="wrapper">
          <input
            type="file"
            id="editImage"
            className="input"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="editImage" className="label">Update Gambar</label>
        </div>
        <button
          className="btn"
          aria-label={`Confirm edited task to now read ${updatedTaskName}`}
          type="submit"
        >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  );
};

export default EditForm;
