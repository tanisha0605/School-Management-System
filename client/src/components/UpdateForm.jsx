import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "./Loading";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function UpdateForm({ modelName, id }) {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModelSchema();
    fetchExistingData();
  }, []);

  const fetchModelSchema = async () => {
    try {
      const response = await fetch(`/api/${modelName.toLowerCase()}/getForm`);
      const data = await response.json();

      const regularFields = [];

      Object.entries(data[0]).forEach(([fieldName]) => {
        // Skip rendering 'assignedClass' and 'class' fields
        if (fieldName !== 'assignedClass' && fieldName !== 'class') {
          regularFields.push([fieldName]);
        }
      });

      setFields(regularFields);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching model schema:", error);
    }
  };

  const fetchExistingData = async () => {
    try {
      const response = await fetch(`/api/${modelName.toLowerCase()}/get/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error fetching existing data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/${modelName.toLowerCase()}/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage(`${modelName} updated successfully.`);
        setErrorMessage(null);
      } else {
        const errorMessage = await response.text();
        setErrorMessage(`Failed to update ${modelName}`);
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error updating', modelName, ':', error.message);
      setErrorMessage(`Error updating ${modelName}: ${error.message}`);
      setSuccessMessage(null);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  if (loading) {
    return <Loading />; // Display loading component while fetching data
  }
  return (
    <>
      <Box
        sx={{
          boxShadow: 1,
          p: 3,
          borderRadius: 2,
          width: "400px",
          margin: "auto",
          mt: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update {modelName}
        </Typography>
        <form onSubmit={handleSubmit}>
          {fields.map(([fieldName]) => (
            // Skip rendering 'assignedClass' and 'class' fields
            fieldName !== 'assignedClass' && fieldName !== 'class' && (
              <TextField
                key={fieldName}
                label={`* ${capitalizeFirstLetter(fieldName)}${fieldName === "dob" ? " (YYYY-MM-DD)" : ""}${fieldName === "gender" ? " (Male/Female)" : ""}`}
                fullWidth
                margin="normal"
                SelectProps={{
                  native: true,
                }}
                InputProps={fieldName === "email" ? { inputMode: "email", pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" } : {}}
                onChange={handleChange}
                id={fieldName}
                value={formData[fieldName] || ''}
              />
            )
          ))}
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Box>
      {errorMessage && (
        <div className="flex items-center justify-center">
          <Typography variant="body1" color="error" gutterBottom>
            {errorMessage}
          </Typography>
        </div>
      )}
      {successMessage && (
        <div className="flex items-center justify-center">
          <Typography variant="body1" color="#8bc34a" gutterBottom>
            {successMessage}
          </Typography>
        </div>
      )}
    </>
  );
}

export default UpdateForm;





