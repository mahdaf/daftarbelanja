import { useState } from 'react';

// styles
import styles from './TaskItem.module.css';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const TaskItem = ({ item, deleteItem, enterEditMode }) => {
  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        {/* Hapus checkbox */}
        <img
          src={item.img}
          alt={item.nama}
          className={styles.image}
          style={{ width: '100px', height: '80px' }}
        />
        <div className={styles.textContainer}>
          <p><strong>Nama:</strong> {item.nama}</p>
          <p><strong>Harga:</strong> Rp{item.harga}</p>
          <p><strong>Jumlah:</strong> {item.jumlah}</p>
        </div>
      </div>
      <div className={styles["task-group"]}>
        <button
          className='btn'
          aria-label={`Update ${item.nama}`}
          onClick={() => enterEditMode(item)}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>

        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${item.nama}`}
          onClick={() => deleteItem(item.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;