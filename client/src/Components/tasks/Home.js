import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth'; 

// Item Types
const ItemTypes = {
  TASK: 'task',
};

// Task Component

const Task = ({ task, index, moveTask, columnStatus }) => {
  const [, ref] = useDrag({
    type: ItemTypes.TASK,
    item: { index, columnStatus, id: task._id },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    hover: (item) => {
      if (item.index !== index || item.columnStatus !== columnStatus) {
        moveTask(item.index, index, item.columnStatus, columnStatus, item.id);
        item.index = index;
        item.columnStatus = columnStatus;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="task p-[16px] bg-white rounded-[6px] m-[8px]">
      <h3
        style={{
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: '400',
          lineHeight: '20px',
          letterSpacing: '-0.006em',
          textAlign: 'left',
          color: '#252C32',
        }}
      >
        {task.description}
      </h3>

      {/* Always display the category */}
      <div>
        {task.priority && (
          <div>
            <img src="badge.png" alt="Badge" className="mr-[8px] mt-[12px]" />
          </div>
        )}
        <div className="flex items-center justify-between mt-[12px]">
        {task.priority && (
          <img src="statuses.png" alt="Statuses" className="mr-[8px]" />
        )}
          <span className="flex-1 text-right"
            style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: '400',
              lineHeight: '20px',
              letterSpacing: '-0.006em',
              
              color: '#252C32',
             
            }}
          >
            {task.category}
          </span>
        </div>
      </div>
    </div>
  );
};






// Column Component
const Column = ({ status, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.index, tasks.length, item.columnStatus, status, item.id),
  });

  return (
    <div ref={drop} className="task-column w-[100%] h-screen pt-[12px] bg-gray-100 rounded-[6px,6px,0px,0px]  ">
      <h2 className="mb-4 pl-[8px] uppercase" style={{ 
          fontFamily: 'Inter', 
          fontSize: '14px', 
          fontWeight: '600', 
          lineHeight: '24px', 
          letterSpacing: '0.006em', 
          textAlign: 'left' ,
          color: '#6E7C87'
        }}>
        {status === 'todo' ? 'To Do' : status === 'inProgress' ? 'In Progress' : 'Done'}
      </h2>
      {tasks.map((task, index) => (
        <Task key={task.id} index={index} task={task} moveTask={moveTask} columnStatus={status} />
      ))}
    </div>
  );
};

// TaskBoard Component
const Home = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch tasks from backend on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Wait for the authentication state to resolve
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            setCurrentUser(user);
            const response = await axios.get('http://localhost:8080/api/tasks');
            const data = response.data;
  
            // Filter tasks based on the current user
            const userTasks = data.filter(task => task.assignedTo === user.email);
  
            // Categorize tasks based on their status
            const todo = userTasks.filter(task => task.status === 'todo');
            const inProgress = userTasks.filter(task => task.status === 'inProgress');
            const done = userTasks.filter(task => task.status === 'done');
  
            setTasks({
              todo,
              inProgress,
              done,
            });
          }
        });
  
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchTasks();
  }, []);

  // Move task between columns
  const moveTask = async (fromIndex, toIndex, fromStatus, toStatus, taskId) => {
    const columns = { ...tasks };
    const [movedTask] = columns[fromStatus].splice(fromIndex, 1);
    movedTask.status = toStatus;
    columns[toStatus].splice(toIndex, 0, movedTask);
    setTasks(columns);

    try {
      await axios.put(`http://localhost:8080/api/tasks/${taskId}`, {
        status: toStatus,
      });
    } catch (error) {
      console.error('Error updating task status:', error);
      // Rollback state update if backend update fails
      const rollbackColumns = { ...tasks };
      rollbackColumns[fromStatus].splice(fromIndex, 0, movedTask);
      rollbackColumns[toStatus].splice(toIndex, 1);
      setTasks(rollbackColumns);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User successfully logged out");
      // Redirect to login page or handle logout as needed
      window.location.href = '/login'; // Redirect to login page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
  <div className="navbar bg-[#F2F2F8] p-4 shadow-md flex justify-between items-center w-full" style={{ height: '116px' }}>
    <div className="flex items-center">
      <div className="logo p-2 flex items-center">
        <img src="icon button.png" alt="Another Icon" />
        <img src="logo.png" alt="Taskfy" className="ml-2" />
        <span className="app-name" style={{ 
            fontFamily: 'DM Sans', 
            fontSize: '20px', 
            fontWeight: '700', 
            lineHeight: '21px', 
            textAlign: 'left' 
          }}>Taskfy</span>
        <img src="line 2.png" alt="line" className="ml-[45px]" />
      </div>
      <div className="workspace-name ml-[30px]" style={{
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '-0.006em',
          textAlign: 'left'
        }}>
        Workspace : Knight Owl
      </div>
      <div className="task-dashboard-title ml-[313px]" style={{
          fontFamily: 'Inter',
          fontSize: '24px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '-0.006em',
          textAlign: 'left'
        }}>
        Task Dashboard
      </div>
    </div>
    <div className="user-profile flex items-center">
      <span className="font-medium mr-[32px]" style={{
          fontFamily: 'Inter',
          fontSize: '16px',
          fontWeight: '400',
          lineHeight: '24px',
          letterSpacing: '-0.006em',
          
        }}>jorn</span>
      <img src="avatar w. photo.png" alt="User" className=" w-[50px] h-[50px]  rounded-full" onClick={handleLogout} />
    </div>
  </div>
  <div className="task-dashboard p-[2px] bg-[#FFFFFF]">
    <div className="task-board flex justify-between gap-2.5">
      {['todo', 'inProgress', 'done'].map((column) => (
        <Column
          key={column}
          status={column}
          tasks={tasks[column]}
          moveTask={moveTask}
        />
      ))}
    </div>
  </div>
</DndProvider>




  );
};

export default Home;
