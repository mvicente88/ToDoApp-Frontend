import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddTask, SettingsBrightness } from '@mui/icons-material';
import { Box, IconButton, Typography, Divider } from '@mui/material';
import CustomModal from './components/Modal/Modal';
import { TaskProvider } from './Context/TaskContext';
import { CustomThemeProvider, useCustomTheme } from './Theme/CustomTheme';
import ToDoList from './components/Main/ToDoList';
import TaskForm from './components/Form/TaskForm';

const App = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useCustomTheme(); // useCustomTheme hook to get the context

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CustomThemeProvider>
      <TaskProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: context.theme.background,
          }}
        >
          <IconButton onClick={context.toggleTheme}>
            <SettingsBrightness />
          </IconButton>
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography
                variant='h5'
                sx={{
                  flexGrow: 1,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: '#bbb7b7',
                  p: 2,
                  borderRadius: '4px',
                }}
                onClick={handleOpenModal}
              >
                Add new task
                <IconButton sx={{ ml: 2 }}>
                  <AddTask />
                </IconButton>
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant='h4' gutterBottom sx={{ mt: 5, mb: 5 }}>
              Task List
            </Typography>

            <Box sx={{ mt: 3 }}>
              <ToDoList /> 
            </Box>
          </Box>

          <CustomModal open={isModalOpen} onClose={handleCloseModal}>
            <TaskForm
              closeModal={() => {
                handleCloseModal();
              }}
            />
          </CustomModal>
        </Box>
      </TaskProvider>
    </CustomThemeProvider>
  );
};

export default App;
