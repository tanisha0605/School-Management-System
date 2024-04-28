import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
import { useNavigate } from 'react-router-dom';
import Loading from "./Loading";
import { Button } from "@mui/material";
function Table({ modelName }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      fetchData();
    } catch (error) {
      // Handle error
    }
  };
  const handleUpdate= async(lowerCaseModelName,id)=>{
    navigate(`${lowerCaseModelName}/update/${id}`);
  }
  const fetchData = async () => {
    try {
      const lowerCaseModelName = modelName.toLowerCase();
      const response = await fetch(`/api/${lowerCaseModelName}/get`); 
      const data = await response.json();
      const rowsWithSelectedFields = data.map((row, index) => {
        const selectedFields = selectedFieldsMap[lowerCaseModelName];
        const selectedValues = selectedFields.reduce((acc, key) => {
          const keys = key.split('.');
          let value = row;
          for (let i = 0; i < keys.length; i++) {
            value = value[keys[i]];
            if (value === undefined || value === null) {
              value = '';
              break;
            }
          }
          if (value !== undefined) {
            if (key === 'dob') {
              value = value.slice(0, 10);
            }
            acc[key] = value;
          }
          return acc;
        }, {});
        return {
          id: index + 1,
          ...selectedValues
        };
      });
      const firstRow = rowsWithSelectedFields[0];
      const columnNames = Object.keys(firstRow);
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
        } else {
          return {
            field: columnName,
            headerName: getHeaderTitle(columnName),
            width: 150,
          };
        }
      });
      
      // Add a new button only if modelName is 'Class'
      if (modelName === 'Class') {
        gridColumns.push({
          field: 'details', // You can change this to an appropriate field name
          headerName: 'Details',
          width: 150,
          renderCell: (params) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={`/class-analytics/${params.row.name}`}>
                <Button variant="outlined" color="primary">Details</Button>
              </Link>
            </div>
          ),
        });
      }
      
      gridColumns.push({
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        headerAlign: 'center',
        renderCell: (params) => (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <DeleteButton onClick={() => handleDelete(lowerCaseModelName, params.row._id)} />
            <UpdateButton onClick={()=> handleUpdate(lowerCaseModelName, params.row._id)}/>
          </div>
        ),
      });
      const visibleColumns = gridColumns.filter(column => column.field !== '_id');
  
      setRows(rowsWithSelectedFields);
      setColumns(visibleColumns);
      setLoading(false); 
  
    } catch (error) {
      // Handle error
    }
  };
  
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
      {loading ? ( 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Loading/>
        </div>
      ) : ( 
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
      )}
    </div>
  );
}

export default Table;

















