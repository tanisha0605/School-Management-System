import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

function AddButton({ ModelName }) {
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate(`/${ModelName.toLowerCase()}/add-${ModelName.toLowerCase()}`);
  };

  return (
    <div className="flex justify-end mr-10 mt-5">
      <Button variant="contained" endIcon={<AddIcon />} onClick={handleAddButtonClick}>
        Add {ModelName}
      </Button>
    </div>
  );
}

export default AddButton;
