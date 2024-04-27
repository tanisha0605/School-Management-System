import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton({onClick}) {
  return (
    <div>
        <IconButton aria-label="delete" size="large" onClick={onClick}>
            <DeleteIcon fontSize="inherit" color='error'/>
        </IconButton> 
    </div>
  )
}

export default DeleteButton