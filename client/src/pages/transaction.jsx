import { React, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid"
import Header from '../components/header';
import DataGridCustomToolbar from "../components/dataGridCustomToolbar.jsx"

export default function Transaction() {
    const { loading, error } = useSelector
  ((state) => state.user);
  const theme = useTheme()
  const [transactionData, setTransactionData] = useState([])
    const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState("")

  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const sortString = sort ? JSON.stringify(sort): ''
        const res = await fetch(`/client/transaction?page=${page}&pageSize=${pageSize}&sort=${sortString}&search=${search}`, {
          method: 'GET',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          
          // credentials: 'include'
        });
        const data = await res.json();
        setTransactionData(data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [page, pageSize, sort, search])
  const columns = [
    {
        field: "_id",
        headerName: "ID",
        flex: 1
    },
    {
        field: "userId",
        headerName: "User Id",
        flex: 1
    },
    {
        field: "createdAt",
        headerName: "CreatedAt",
        flex: 1
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        sortable: false,
        renderCell: (params) => params.value.length
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
  ]
    return (
    <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of transactions"/>
        <Box height="80vh" sx={{
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
                loading={loading || !transactionData}
                getRowId={(row)=>row._id}
                rows={(transactionData && transactionData.transactions) || []}
                columns={columns}
                rowCount={(transactionData && transactionData.total) || 0}
                pageSizeOptions={[20, 50, 100]}
                sortingMode="server"
                paginationMode="server"
                onPaginationModelChange={(newPageSize) => setPageSize(Number(newPageSize.pageSize))}
                onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                slots={{ toolbar: DataGridCustomToolbar }}
                slotProps={{
                    toolbar: { searchInput, setSearchInput, setSearch }
                }}
            />
        </Box>
    </Box>
  )
}
