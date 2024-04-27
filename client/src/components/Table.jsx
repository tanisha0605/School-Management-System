import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
function Table({ modelName }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const selectedFieldsMap = {
    student: ['name', 'gender', 'dob', 'contactDetails.email', 'feesPaid', 'class.name'],
    teacher: ['contactDetails.email', 'name', 'gender', 'dob', 'salary', 'assignedClass.name'],
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
        //console.log(row);
        const selectedFields = selectedFieldsMap[lowerCaseModelName];
        const selectedValues = selectedFields.reduce((acc, key) => {
          const keys = key.split('.');
          //console.log(keys);
          let value = row;
          //console.log(value);
          for (let i = 0; i < keys.length; i++) {
            value = value[keys[i]];
            if (value === undefined) {
              break;
            }
          }
          if (value !== undefined) {
            if (key === 'dob') {
              value = value.slice(0, 10); // Extract YYYY-MM-DD part
            }
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
      const gridColumns = columnNames.map((columnName) => {
        // Modify column configuration for 'name' column when modelName is 'Class'
        if (modelName === 'Class' && columnName === 'name') {
          return {
            field: columnName,
            headerName: getHeaderTitle(columnName),
            width: 150,
            renderCell: (params) => (
              // Render a Link to navigate to a new page
              <Link to={`/class-analytics/${params.row.name}`}>{params.value}</Link>
            ),
          };
        }
        return {
          field: columnName,
          headerName: getHeaderTitle(columnName), // Get customized header title
          width: 150,
        };
      });
  
      setRows(rowsWithSelectedFields);
      setColumns(gridColumns);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  // Function to get customized header title
  const getHeaderTitle = (columnName) => {
    switch (columnName) {
      case 'dob':
        return 'Date of Birth';
      case 'assignedClass.name':
        return 'Assigned Class';
      case 'contactDetails.email':
        return 'Email';
      case 'maxCapacity':
        return 'Max Capacity';
      case 'teacher.name' :
        return 'Assigned Teacher';
      case 'class.name':
        return 'Class Name'
      case 'feesPaid':
        return 'Fees Paid';
      case 'id':
        return 'ID';
      default:
        return columnName.charAt(0).toUpperCase() + columnName.slice(1);
    }
  };
  

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        sx={{
          m: 7,
          boxShadow: 1,
          fontSize: 14,
          columnGap:10,
          rowGap: 3,
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
        pageSizeOptions={[5,10,25]}
      />
    </div>
  );
}

export default Table;














