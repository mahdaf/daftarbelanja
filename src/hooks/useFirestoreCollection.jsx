import { useEffect, useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// Custom hook untuk CRUD ke koleksi 'barang'
const useFirestoreCollection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Real-time listener
    const unsubscribe = onSnapshot(
      collection(db, "barang"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          harga: doc.data().harga,
          img: doc.data().img,
          jumlah: doc.data().jumlah,
          nama: doc.data().nama
        }));
        setItems(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // CREATE
  const addItem = async (item) => {
    try {
      await addDoc(collection(db, "barang"), {
        harga: item.harga,
        img: item.img,
        jumlah: item.jumlah,
        nama: item.nama
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // UPDATE
  const updateItem = async (item) => {
    try {
      const itemRef = doc(db, "barang", item.id);
      await updateDoc(itemRef, {
        harga: item.harga,
        img: item.img,
        jumlah: item.jumlah,
        nama: item.nama
      });
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE
  const deleteItem = async (id) => {
    try {
      const itemRef = doc(db, "barang", id);
      await deleteDoc(itemRef);
    } catch (err) {
      setError(err.message);
    }
  };

  return { items, loading, error, addItem, updateItem, deleteItem };
};

export default useFirestoreCollection;
