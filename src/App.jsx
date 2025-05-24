import { useState } from 'react';

// custom hooks
import useFirestoreCollection from './hooks/useFirestoreCollection';

// custom components
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const { items, loading, error, addItem, updateItem, deleteItem } = useFirestoreCollection();
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Validasi dan tambah item
  const handleAddItem = (item) => {
    if (!item.nama || !item.harga || !item.jumlah) {
      alert("Semua field harus diisi!");
      return;
    }
    const newItem = {
      nama: item.nama,
      harga: item.harga,
      jumlah: item.jumlah,
      img: item.img
    };
    addItem(newItem);
  };

  // Update item
  const handleUpdateItem = (item) => {
    updateItem({
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      jumlah: item.jumlah,
      img: item.img
    });
    setIsEditing(false);
    setEditedItem(null);
  };

  // Delete item
  const handleDeleteItem = (id) => {
    deleteItem(id);
  };

  // Toggle purchased
  const handleTogglePurchased = (id) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateItem({ ...item, isPurchased: !item.isPurchased });
    }
  };

  const enterEditMode = (item) => {
    setEditedItem(item);
    setIsEditing(true);
  };

  const filteredItems = items.filter(item =>
    item.nama && item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Daftar Belanja Saya</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedItem}
          updateTask={handleUpdateItem}
          closeEditMode={() => setIsEditing(false)}
        />
      )}
      <CustomForm addItem={handleAddItem} />
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama barang..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : filteredItems && (
        <TaskList
          items={filteredItems}
          deleteItem={handleDeleteItem}
          enterEditMode={enterEditMode}
          togglePurchased={handleTogglePurchased}
        />
      )}
      <ThemeSwitcher />
    </div>
  );
}

export default App;