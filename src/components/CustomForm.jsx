import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";

const CustomForm = ({ addItem }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");

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
        setImage(reader.result); // Set image as base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addItem({
      name,
      price,
      quantity,
      image,
      id: Date.now(),
    });
    setName("");
    setPrice("");
    setQuantity("");
    setImage("");
  };

  return (
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input
          type="text"
          id="name"
          className="input"
          value={name}
          onInput={(e) => setName(e.target.value)}
          required
          placeholder="Nama Barang"
        />
        <label htmlFor="name" className="label">Nama Barang</label>
      </div>
      <div className="wrapper">
        <input
          type="number"
          id="price"
          className="input"
          value={price}
          step="1000"
          onInput={(e) => setPrice(e.target.value)}
          required
          placeholder="Harga Barang"
        />
        <label htmlFor="price" className="label">Harga Barang</label>
      </div>
      <div className="wrapper">
        <input
          type="number"
          id="quantity"
          className="input"
          value={quantity}
          onInput={(e) => setQuantity(e.target.value)}
          required
          placeholder="Jumlah Barang"
        />
        <label htmlFor="quantity" className="label">Jumlah Barang</label>
      </div>
      <div className="wrapper">
        <input
          type="file"
          id="image"
          className="input"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <label htmlFor="image" className="label">Unggah Gambar</label>
      </div>
      <button className="btn" aria-label="Add Item" type="submit">
        <PlusIcon />
      </button>
    </form>
  );
};

export default CustomForm;
