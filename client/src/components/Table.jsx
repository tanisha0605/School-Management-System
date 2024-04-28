import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
function Table({ modelName }) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const selectedFieldsMap = {
    student: ['name', 'gender', 'dob', 'email', 'feesPaid', 'class.name','_id'],
    teacher: ['email', 'name', 'gender', 'dob', 'salary', 'assignedClass.name','_id'],
    class:['name','year','teacher.name','maxCapacity','_id']
  };
  const handleDelete =async(lowerCaseModelName,id)=>{
    try {
      const response = await fetch(`/api/${lowerCaseModelName}/delete/${id}`,{
        method:'DELETE',
      });
      const data = await response.json();
      //console.log(data);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
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
            if (value === undefined || value === null) {
              value = ''; // Assign empty string if value is undefined or null
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
        if (modelName === 'Class' && columnName === 'name') {
          return {
            field: columnName,
            headerName: getHeaderTitle(columnName),
            width: 150,
            renderCell: (params) => (
              <div>
                <Link to={`/class-analytics/${params.row.name}`}>{params.value}</Link>
              </div>
            ),
          };
        }
        return {
          field: columnName,
          headerName: getHeaderTitle(columnName), // Get customized header title
          width: 150,
        };
      });
  
      // Add a new column definition for the delete and update button
      gridColumns.push({
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        headerAlign: 'center', // Center align the header
        renderCell: (params) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <DeleteButton onClick={() => handleDelete(lowerCaseModelName, params.row._id)} />
            <UpdateButton />
          </div>
        ),
      });
      
      
      
      const visibleColumns = gridColumns.filter(column => column.field !== '_id');
  
      setRows(rowsWithSelectedFields);
      setColumns(visibleColumns);
  
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
















