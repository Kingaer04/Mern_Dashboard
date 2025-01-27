import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import { GridToolbarDensitySelector, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import FlexBetween from './flexBetween.jsx'

export default function DataGridCustomToolbar({ searchInput, setSearchInput, setSearch }) {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton/>
          <GridToolbarDensitySelector/>
          <GridToolbarExport/>
        </FlexBetween>
        <TextField
          label="search..."
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput} 
          variant='standard'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={()=>{
                    setSearch(searchInput)
                    setSearchInput("")
                }}>
                  <Search/>
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  )
}
