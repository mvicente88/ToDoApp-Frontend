import React, { useContext, useState, useEffect } from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Check, Delete, EditNote } from '@mui/icons-material';
import { TaskContext } from '../../Context/TaskContext';
import { useCustomTheme } from '../../Theme/CustomTheme';
import CustomModal from '../Modal/Modal';
import EditTaskForm from '../Form/EditTaskForm';
import TaskCheck from '../Buttons/Check';

const ToDoList = () => {
  const { tasks, deleteTask, updateTask, setTasks } = useContext(TaskContext);
  const { darkMode, theme, toggleTheme } = useCustomTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatingTask, setUpdatingTask] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(true);
  const [completedTasks, setCompletedTasks] = useState([]);
  console.log(tasks);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      toggleTheme();
    }

    // Inicializamos los estados con las tareas y las tareas completadas
    setTasks(tasks);
    setCompletedTasks(tasks.filter((task) => task.status === 'COMPLETED'));
  }, [tasks, toggleTheme]);


  const containerStyles = {
    padding: '0px',
    backgroundColor: darkMode ? theme.background.dark : theme.background.light,
  };

  const cardStyles = {
    backgroundColor: 'transparent',
    marginBottom: '20px',
    border: `1px solid ${theme.text}`,
    color: darkMode ? theme.text : '#D6D6D6' && !darkMode ? theme.text : '#444444',
  };

  const iconStyles = {
    color: theme.icons,
  };

  const handleOpenModal = (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    setUpdatingTask(taskToUpdate);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const handleCheck = async (taskId, checked) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId);
      const updatedTaskData = { ...taskToUpdate, status: checked ? 'COMPLETED' : 'PENDING' };
      await updateTask(taskId, updatedTaskData);

      // Aquí actualizamos la lista de tareas filtradas si la tarea se ha marcado como completada
      if (checked) {
        const completedTask = tasks.find((task) => task._id === taskId);
        setCompletedTasks((prevCompletedTasks) => [...prevCompletedTasks, completedTask]);
      }

      // Actualizamos el estado de las tareas pendientes para que la tarea desaparezca de la lista
      const pendingTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(pendingTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Filtrar las tareas según el estado de showOnlyPending y las tareas completadas
  const filteredTasks = tasks.filter((task) => {
    if (showOnlyPending) {
      return task.status === 'PENDING' && !completedTasks.find((completedTask) => completedTask._id === task._id);
    } else {
      return !completedTasks.find((completedTask) => completedTask._id === task._id);
    }
  });

  return (
    <Box sx={containerStyles}>
       {filteredTasks && filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
            <Card key={task._id} variant='outlined' sx={cardStyles}>
              <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='h5' component='h2' sx={{ flexGrow: 1 }}>
                  {task.title}
                </Typography>
                <TaskCheck
                  checked={task.status === 'COMPLETED'}
                  onCheck={(checked) => handleCheck(task._id, checked)} // Pasamos la función handleCheck
                />
                <IconButton onClick={() => handleDelete(task._id)}>
                  <Delete style={iconStyles} />
                </IconButton>
                <IconButton onClick={() => handleOpenModal(task._id)}>
                  <EditNote style={iconStyles} />
                </IconButton>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant='body1'>No tasks found.</Typography>
        )}
        <CustomModal open={isModalOpen} onClose={handleCloseModal}>
          <EditTaskForm task={updatingTask} closeModal={handleCloseModal} />
        </CustomModal>
    </Box>
  );
};

export default ToDoList;
