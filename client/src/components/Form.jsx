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
    const [contactDetailsFields, setContactDetailsFields] = useState([]);
  
    useEffect(() => {
      fetchModelSchema();
    }, []);
  
    const fetchModelSchema = async () => {
      try {
        const response = await fetch(`/api/${modelName.toLowerCase()}/getForm`);
        const data = await response.json();
        
        // Extract the first document's schema
        const modelSchema = data[0];
    
        const filteredFields = Object.entries(modelSchema).filter(
          ([fieldName, fieldConfig]) => !["__v", "_id", "createdAt", "updatedAt","role"].includes(fieldName)
        );
    
        // Separate contactDetails fields
        const regularFields = [];
        const contactDetails = [];
        filteredFields.forEach(([fieldName, fieldConfig]) => {
          if (fieldName === "contactDetails") {
            contactDetails.push(...Object.entries(fieldConfig));
          } else {
            regularFields.push([fieldName, fieldConfig]);
          }
        });
    
        setFields(regularFields);
        setContactDetailsFields(contactDetails);
      } catch (error) {
        console.error("Error fetching model schema:", error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Implement form submission logic here
    };
  
    return (
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
          {fields.map(([fieldName, fieldConfig]) => (
            (fieldName === "dob" && fieldConfig.type === "Date") ? (
              <TextField
                key={fieldName}
                label={capitalizeFirstLetter(fieldName)}
                type="date"
                required={fieldConfig.required}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : (fieldName === "feesPaid") ? (
              <TextField
                key={fieldName}
                label="Fees Paid"
                type={fieldConfig.type === "Number" ? "number" : "text"}
                required={fieldConfig.required}
                fullWidth
                margin="normal"
              />
            ) : (fieldName === "gender" && fieldConfig.enum) ? (
              <TextField
                key={fieldName}
                select
                label={capitalizeFirstLetter(fieldName)}
                fullWidth
                margin="normal"
                SelectProps={{
                  native: true,
                }}
              >
                {fieldConfig.enum.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            ) : (
              <TextField
                key={fieldName}
                label={capitalizeFirstLetter(fieldName)}
                type={fieldConfig.type === "Number" ? "number" : "text"}
                required={fieldConfig.required}
                fullWidth
                margin="normal"
              />
            )
          ))}
          {contactDetailsFields.length > 0 && (
            <>
              <Typography variant="subtitle1" gutterBottom align="left">
                Contact Details:
              </Typography>
              {contactDetailsFields.map(([contactField, contactFieldConfig]) => (
                <TextField
                  key={contactField}
                  label={capitalizeFirstLetter(contactField)}
                  type={contactFieldConfig.type === "Number" ? "number" : "text"}
                  required={contactFieldConfig.required}
                  fullWidth
                  margin="normal"
                />
              ))}
            </>
          )}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    );
  }
  
  export default DynamicForm;
