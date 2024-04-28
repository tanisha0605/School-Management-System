import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "./Loading"; 

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function DynamicForm({ modelName }) {
  const [loading, setLoading] = useState(true); 
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

      const modelSchema = data[0];

      if (!Object.keys(modelSchema).length) {
        return;
      }

      const regularFields = [];

      Object.entries(modelSchema).forEach(([fieldName]) => {
        regularFields.push([fieldName]);
      });

      setFields(regularFields);
      setLoading(false);
    } catch (error) {
      setErrorMessage(`Error fetching model schema: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/${modelName.toLowerCase()}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSuccessMessage(`${modelName} created successfully.`);
        setErrorMessage(null);
      } else {
        const errorMessage = await response.text();
        setErrorMessage(`Failed to create ${modelName}`);
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage(`Error creating ${modelName}: ${error.message}`);
      setSuccessMessage(null);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  
  if (loading) {
    return <Loading />;
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







