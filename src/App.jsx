import { useState } from 'react';

// custom hooks
import useLocalStorage from './hooks/useLocalStorage';

// custom components
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import TaskList from './components/TaskList';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [items, setItems] = useLocalStorage('shopping-list.items', []);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addItem = (item) => {
    // Validasi data
    if (!item.name || !item.price || !item.quantity) {
      alert("Semua field harus diisi!");
      return;
    }

    // Tambahkan properti default
    const newItem = {
      ...item,
      isPurchased: false, // Default belum dibeli
    };

    // Tambahkan item ke daftar
    setItems((prevState) => [...prevState, newItem]);
  };

  const deleteItem = (id) => {
    setItems(prevState => prevState.filter(i => i.id !== id));
  };

  const updateItem = (item) => {
    setItems(prevState => prevState.map(i => (
      i.id === item.id ? { ...i, ...item } : i
    )));
    setIsEditing(false);
    setEditedItem(null);
  };

  const togglePurchased = (id) => {
    setItems(prevState =>
      prevState.map(item =>
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      )
    );
  };

  const enterEditMode = (item) => {
    setEditedItem(item);
    setIsEditing(true);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Daftar Belanja Saya</h1>
      </header>
      {isEditing && (
        <EditForm
          editedTask={editedItem}
          updateTask={updateItem}
          closeEditMode={() => setIsEditing(false)}
        />
      )}
      <CustomForm addItem={addItem} />
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama barang..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {filteredItems && (
        <TaskList
          items={filteredItems}
          deleteItem={deleteItem}
          enterEditMode={enterEditMode}
          togglePurchased={togglePurchased} // Pass togglePurchased function
        />
      )}
      <ThemeSwitcher />
    </div>
  );
}

export default App;