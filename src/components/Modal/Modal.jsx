import React from 'react';
import { Modal as MuiModal, Box } from '@mui/material';
import { useCustomTheme } from '../../Theme/CustomTheme';

const CustomModal = ({ children, open, onClose }) => {
  const { darkMode, theme } = useCustomTheme();

  const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '60vw',
    backgroundColor: theme.background,
    color: theme.text,
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
  };

  const buttonStyles = {
    backgroundColor: theme.icons,
    "&:hover": {
      backgroundColor: darkMode ? '#4D4117' : '#DFBD43',
    },
  };

  return (
    <MuiModal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: { style: { backgroundColor: '#4d41178b' } },
      }}
    >
      <Box sx={modalStyles}>{children}</Box>
    </MuiModal>
  );
};

export default CustomModal;
