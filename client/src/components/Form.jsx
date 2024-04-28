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

  useEffect(() => {
    fetchModelSchema();
  }, []);

  const fetchModelSchema = async () => {
    try {
      let modelSchema;
      switch (modelName) {
        case "Class":
          modelSchema = {
            name: { type: "String", required: true },
            year: { type: "Number", required: true },
            maxCapacity: { type: "Number", required: true },
          };
          break;
        case "Student":
          modelSchema = {
            name: { type: "String", required: true },
            gender: { type: "String", enum: ["Male", "Female"], required: true },
            dob: { type: "Date", required: true },
            contactDetails: {
              email: { type: "String", required: true },
              phone: { type: "String" },
              address: { type: "String" },
            },
            class: { type: "String", required: true }, 
            feesPaid: { type: "Number", required: true },
          };
          break;          
        case "Teacher":
          modelSchema = {
            name: { type: "String", required: true },
            gender: { type: "String", enum: ["Male", "Female"], required: true },
            dob: { type: "Date", required: true },
            contactDetails: {
              email: { type: "String", required: true },
              phone: { type: "String" },
              address: { type: "String" },
            },
            assignedClass: { type: "String", required: true },
            salary: { type: "Number", required: true },
          };
          break;
        default:
          throw new Error("Invalid model name");
      }

      const filteredFields = Object.entries(modelSchema).filter(
        ([fieldName, fieldConfig]) => !["__v", "_id"].includes(fieldName)
      );

      setFields(filteredFields);
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
          fieldName === "contactDetails" ? (
            <div key={fieldName}>
              <Typography variant="subtitle1" gutterBottom align="left">
                Contact Details:
              </Typography>
              {Object.entries(fieldConfig).map(([contactField, contactFieldConfig]) => (
                <TextField
                  key={contactField}
                  label={capitalizeFirstLetter(contactField)}
                  type={contactFieldConfig.type === "Number" ? "number" : "text"}
                  required={contactFieldConfig.required}
                  fullWidth
                  margin="normal"
                />
              ))}
            </div>
          ) : (
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
          )
        ))}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default DynamicForm;






