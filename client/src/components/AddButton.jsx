import React from 'react'
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';
function AddButton({ModelName}) {
  return (
    <div className="flex justify-end mr-10 mt-5">
        <Button variant="contained" endIcon={<AddIcon />}>
            Add {ModelName}
        </Button>
    </div>
  )
}

export default AddButton