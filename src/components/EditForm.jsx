import React, { useState, useEffect } from 'react';

// library imports
import { CheckIcon } from '@heroicons/react/24/solid';

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updatedNama, setUpdatedNama] = useState(editedTask.nama);
  const [updatedHarga, setUpdatedHarga] = useState(editedTask.harga);
  const [updatedJumlah, setUpdatedJumlah] = useState(editedTask.jumlah);
  const [updatedImg, setUpdatedImg] = useState(editedTask.img);

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
        setUpdatedImg(reader.result); // Set updated image as base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask({
      ...editedTask,
      nama: updatedNama,
      harga: updatedHarga,
      jumlah: updatedJumlah,
      img: updatedImg,
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
            id="editNama"
            className="input"
            value={updatedNama}
            onInput={(e) => setUpdatedNama(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Nama Barang"
          />
          <label htmlFor="editNama" className="label">Update Nama Barang</label>
        </div>
        <div className="wrapper">
          <input
            type="number"
            id="editHarga"
            className="input"
            value={updatedHarga}
            onInput={(e) => setUpdatedHarga(e.target.value)}
            required
            placeholder="Update Harga Barang"
          />
          <label htmlFor="editHarga" className="label">Update Harga Barang</label>
        </div>
        <div className="wrapper">
          <input
            type="number"
            id="editJumlah"
            className="input"
            value={updatedJumlah}
            onInput={(e) => setUpdatedJumlah(e.target.value)}
            required
            placeholder="Update Jumlah Barang"
          />
          <label htmlFor="editJumlah" className="label">Update Jumlah Barang</label>
        </div>
        <div className="wrapper">
          <input
            type="file"
            id="editImg"
            className="input"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="editImg" className="label">Update Gambar</label>
        </div>
        <button
          className="btn"
          aria-label={`Confirm edited task to now read ${updatedNama}`}
          type="submit"
        >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  );
};

export default EditForm;
