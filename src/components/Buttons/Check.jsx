import React from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IconButton } from '@mui/material';
import { useCustomTheme } from '../../Theme/CustomTheme';

const TaskCheck = ({ checked, onCheck }) => {
  const { theme } = useCustomTheme();

  const iconStyles = {
    color: theme.icons,
  };

  const handleToggle = () => {
    onCheck(!checked);
  };

  return (
    <IconButton onClick={handleToggle}>
      {checked ? <CheckBoxIcon style={iconStyles} /> : <CheckBoxOutlineBlankIcon style={iconStyles} />}
    </IconButton>
  );
};

export default TaskCheck;
