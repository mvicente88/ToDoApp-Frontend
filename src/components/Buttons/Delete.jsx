import React from 'react';
import axios from 'axios';

const handleDelete  = async (taskId) => {
    try {
        const response = await axios.delete(`http://localhost:8000/tasks/${taskId}`);
        console.log('Tarea eliminada:', response.data);        
    } catch (error) {
        console.error(error);
    }
}

export default handleDelete;


