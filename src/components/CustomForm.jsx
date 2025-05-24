import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const CustomForm = ({ addItem }) => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [img, setImg] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 1 * 1024 * 1024; // 1 MB

      if (!validFormats.includes(file.type)) {
        alert("Hanya file JPG, JPEG, dan PNG yang diperbolehkan.");
        return;
      }

      if (file.size > maxSize) {
        alert("Ukuran file tidak boleh lebih dari 1 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result); // Set image as base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addItem({
      nama,
      harga,
      jumlah,
      img
    });
    setNama("");
    setHarga("");
    setJumlah("");
    setImg("");
  };

  return (
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input
          type="text"
          id="nama"
          className="input"
          value={nama}
          onInput={(e) => setNama(e.target.value)}
          required
          placeholder="Nama Barang"
        />
        <label htmlFor="nama" className="label">Nama Barang</label>
      </div>
      <div className="wrapper">
        <input
          type="number"
          id="harga"
          className="input"
          value={harga}
          step="1000"
          onInput={(e) => setHarga(e.target.value)}
          required
          placeholder="Harga Barang"
        />
        <label htmlFor="harga" className="label">Harga Barang</label>
      </div>
      <div className="wrapper">
        <input
          type="number"
          id="jumlah"
          className="input"
          value={jumlah}
          onInput={(e) => setJumlah(e.target.value)}
          required
          placeholder="Jumlah Barang"
        />
        <label htmlFor="jumlah" className="label">Jumlah Barang</label>
      </div>
      <div className="wrapper">
        <input
          type="file"
          id="img"
          className="input"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <label htmlFor="img" className="label">Unggah Gambar</label>
      </div>
      <button className="btn" aria-label="Add Item" type="submit">
        <PlusIcon />
      </button>
    </form>
  );
};

export default CustomForm;
