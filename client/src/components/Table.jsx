import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Table({ modelName }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const selectedFieldsMap = {
    student: ['name', 'gender', 'dob', 'contactDetails.email', 'feesPaid', 'class.name'],
    teacher: ['contactDetails.email', 'name', 'gender', 'dob', 'salary', 'assignedClass'],
    class:['name','year','teacher.name','maxCapacity']
  };
  
  const fetchData = async () => {
    try {
      // Convert modelName to lowercase
      const lowerCaseModelName = modelName.toLowerCase();
  
      // Make the API call to fetch data for the modelName
      const response = await fetch(`/api/${lowerCaseModelName}/get`); 
      const data = await response.json();
  
      // Extracting only the required fields from the data
      const rowsWithSelectedFields = data.map((row, index) => {
        const selectedFields = selectedFieldsMap[lowerCaseModelName];
        const selectedValues = selectedFields.reduce((acc, key) => {
          const keys = key.split('.');
          let value = row;
          for (let i = 0; i < keys.length; i++) {
            value = value[keys[i]];
            if (value === undefined) {
              break;
            }
          }
          if (value !== undefined) {
            acc[key] = value;
          }
          return acc;
        }, {});
        return {
          id: index + 1, // Generate a unique ID for each row
          ...selectedValues
        };
      });
  
      // Extract column names from the first row of data
      const firstRow = rowsWithSelectedFields[0];
      const columnNames = Object.keys(firstRow);
  
      // Create column definition for DataGrid
      const gridColumns = columnNames.map((columnName) => ({
        field: columnName,
        headerName: columnName.charAt(0).toUpperCase() + columnName.slice(1),
        width: 150,
      }));
  
      setRows(rowsWithSelectedFields);
      setColumns(gridColumns);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        sx={{
          m: 7,
          boxShadow: 1,
        }}
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={5}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
}

export default Table;







