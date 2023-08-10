import React, { useState, useContext, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Snackbar, Alert } from '@mui/material';
import { TaskContext } from '../../Context/TaskContext';
import { format } from 'date-fns';

const EditTaskForm = ({ task, closeModal }) => {
  const { updateTask } = useContext(TaskContext);
  const [updatedTask, setUpdatedTask] = useState({ title: '', dueDate: '', status: 'PENDING' });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false); 
  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  useEffect(() => {
    setUpdatedTask({
      title: task.title,
      dueDate: task.dueDate,
      status: task.status,
    });
  }, [task]);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Formatear la fecha antes de enviarla
      const formattedDueDate = new Date(updatedTask.dueDate).toISOString().split('T')[0];
  
      // Crear una copia del objeto updatedTask con la fecha formateada
      const updatedTaskData = { ...updatedTask, dueDate: formattedDueDate };
  
      await updateTask(task._id, updatedTaskData);
      console.log('Task updated successfully:', updatedTaskData);
      closeModal();
      setIsSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const formStyles = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: '1px solid black',
      },
    },
    '& label.Mui-focused': {
      color: '#000',
    },
  };

  const buttonStyles = {
    mt: 1.5,
    mb: 3,
    backgroundColor: '#4D4117',
    "&:hover": {
      backgroundColor: '#DFBD43',
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: '1rem' }}>
      <Typography variant="h1" mb={3} sx={{ fontSize: 28 }}>
        Want to update your task?
      </Typography>

      <TextField
        label='Title'
        variant='outlined'
        name='title'
        value={updatedTask.title}
        onChange={handleChange}
      />
      <TextField
        variant='outlined'
        type='date'
        name='dueDate'
        value={updatedTask.dueDate ? format(new Date(updatedTask.dueDate), 'yyyy-MM-dd') : ''}
        onChange={handleChange}
      />
      <TextField
        select
        label="Status"
        variant='outlined'
        name='status'
        value={updatedTask.status}
        onChange={handleChange}
      >
        <MenuItem value="COMPLETED">Completed</MenuItem>
        <MenuItem value="IN PROGRESS">In Progress</MenuItem>
        <MenuItem value="PENDING">Pending</MenuItem>
        <MenuItem value="POSTPONED">Postponed</MenuItem>
        <MenuItem value="DELETED">Deleted</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleSave} sx={buttonStyles}> 
        Save
      </Button>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        sx={{
          width: '300px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Task successfully updated
        </Alert>
      </Snackbar>
    </Box>   

  );
};

export default EditTaskForm;