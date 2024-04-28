import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function DynamicForm({ modelName }) {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); 

  useEffect(() => {
    fetchModelSchema();
  }, []);

  const fetchModelSchema = async () => {
    try {
      const response = await fetch(`/api/${modelName.toLowerCase()}/getForm`);
      const data = await response.json();

      // Extract the first document's schema
      const modelSchema = data[0];

      // Check if the modelSchema object is empty
      if (!Object.keys(modelSchema).length) {
        console.error("Model schema is empty");
        return;
      }

      const regularFields = [];

      // Extract regular fields
      Object.entries(modelSchema).forEach(([fieldName]) => {
          regularFields.push([fieldName]);
      });
      console.log(regularFields);
      setFields(regularFields);
    } catch (error) {
      console.error("Error fetching model schema:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(formData);
      // Make POST request to the API endpoint
      const response = await fetch(`/api/${modelName.toLowerCase()}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Handle the response
      if (response.ok) {
        setSuccessMessage(`${modelName} created successfully.`)
        setErrorMessage(null)
      } else {
        const errorMessage = await response.text();
        setErrorMessage(`Failed to create ${modelName}`);
        setSuccessMessage(null) 
      }
    } catch (error) {
      console.error('Error creating', modelName, ':', error.message);
      setErrorMessage(`Error creating ${modelName}: ${error.message}`);
      setSuccessMessage(null) ;
    }
  };
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    //console.log(formData);
  };
  
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
          Add {modelName}
        </Typography>
        <form onSubmit={handleSubmit}>
          {fields.map(([fieldName]) => (
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
            >
            </TextField>
          ))}
          <Button type="submit" variant="contained" color="primary">
            Submit
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

export default DynamicForm;






