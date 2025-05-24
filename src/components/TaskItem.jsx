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
          src={item.image}
          alt={item.name}
          className={styles.image}
          style={{ width: '100px', height: '80px' }}
        />
        <div className={styles.textContainer}>
          <p><strong>Nama:</strong> {item.name}</p>
          <p><strong>Harga:</strong> Rp{item.price}</p>
          <p><strong>Jumlah:</strong> {item.quantity}</p>
        </div>
      </div>
      <div className={styles["task-group"]}>
        <button
          className='btn'
          aria-label={`Update ${item.name}`}
          onClick={() => enterEditMode(item)}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>

        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${item.name}`}
          onClick={() => deleteItem(item.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;