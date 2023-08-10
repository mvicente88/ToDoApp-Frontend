import React, { useContext, useState } from 'react';
import { Button, TextField, Box, MenuItem } from '@mui/material';
import { TaskContext } from '../../Context/TaskContext';
import { Snackbar, Alert } from '@mui/material';


const TaskForm = ({ closeModal }) => {
  const { addTask } = useContext(TaskContext); // Get the addTask function from the context
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', status: 'PENDING' });
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await addTask(newTask); 
      console.log('Task added successfully:', newTask);
      closeModal();
      setIsSnackbarOpen(true); 
      setSnackbarMessage('Task successfully created');
    } catch (error) {
      console.error('Error adding task:', error);
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
      <TextField
        label='Title'
        variant='outlined'
        name='title'
        value={newTask.title}
        onChange={handleChange}
      />
      <TextField
        variant='outlined'
        type='date'
        name='dueDate'
        value={newTask.dueDate}
        onChange={handleChange}
      />
      <TextField
        select
        label="Status"
        variant='outlined'
        name='status'
        value={newTask.status}
        onChange={handleChange}
      >
        <MenuItem value="IN PROGRESS">In Progress</MenuItem>
        <MenuItem value="PENDING">Pending</MenuItem>
      </TextField>
      <Button variant='contained' onClick={handleSave} sx={buttonStyles}>
        Save
      </Button>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)} 
        sx={{
          width: '300px',
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Alert
          onClose={() => setIsSnackbarOpen(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskForm;