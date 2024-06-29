import { React, useState, useEffect } from 'react'
import { Box, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import Header from '../components/header.jsx';

export default function Customers() {
  const { loading, error } = useSelector
  ((state) => state.user);
  const theme = useTheme()
  const [customerData, setCustomerData] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/client/customers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await res.json();
        setCustomerData(data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])
  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1
    },
    {
        field: "name",
        headerName: "Name",
        flex: 0.5
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1
    },
    {
        field: "phoneNumber",
        headerName: "Phone Number",
        flex: 0.5,
        renderCell: (params) => {
            return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")
        }
    },
    {
        field: "country",
        headerName: "Country",
        flex: 0.4
    },
    {
        field: "occupation",
        headerName: "Occupation",
        flex: 1
    },
    {
        field: "role",
        headerName: "Role",
        flex: 0.5
    }
  ]
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="CUSTOMERS" subtitle="List of Customers"/>
        <Box mt="40px" height="75vh" 
        sx={{
            "& .MuiDataGrid-root": {
                border: "none"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none"
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
                background: theme.palette.primary.light
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`
            }
        }}>
            <DataGrid
                loading={loading || !customerData}
                getRowId={(row)=>row._id}
                rows={customerData || []}
                columns={columns}
            />
        </Box>

    </Box>
  )
}
