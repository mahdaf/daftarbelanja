// component import
import TaskItem from './TaskItem';

// styles
import styles from './TaskList.module.css';

const TaskList = ({ items, deleteItem, enterEditMode }) => {
  return (
    <ul className={styles.tasks}>
      {items.sort((a, b) => b.id - a.id).map(item => (
        <TaskItem
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          enterEditMode={enterEditMode}
        />
      ))}
    </ul>
  );
};

export default TaskList;
