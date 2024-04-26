import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Table({ modelName }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const lowerCaseModelName=modelName.toLowerCase();
      // Define selected fields for each modelName
      const selectedFields = {
        student: ['name', 'gender', 'dob', 'contactDetails.email', 'feesPaid', 'class.name'],
        teacher: ['contactDetails.email', 'name', 'gender', 'dob', 'salary', 'assignedClass.name'],
        class: ['name', 'year', 'teacher', 'maxCapacity']
      };

      // Make the API call to fetch data for the modelName
      const response = await fetch(`/api/${lowerCaseModelName}/get`);
      const data = await response.json();

      // Extracting only the required fields based on the modelName
      const rowsWithSelectedFields = data.map((row, index) => {
        const selectedRow = { id: index + 1 }; // Generate a unique ID for each row
        selectedFields[lowerCaseModelName].forEach(field => {
          const fieldNames = field.split('.');
          let value = row;
          fieldNames.forEach(fieldName => {
            value = value && value[fieldName];
          });
          selectedRow[fieldNames[fieldNames.length - 1]] = value;
        });
        return selectedRow;
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






