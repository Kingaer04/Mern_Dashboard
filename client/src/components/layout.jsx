import React, {useState} from 'react'
import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NavBar from "./navbar.jsx"
import SideBar from "./sidebar.jsx"

export default function Layout() {
    const isNonMobile = useMediaQuery("(min-width: 600px)")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  return (
    <Box display={isNonMobile ? 'flex' : 'block'} width="100%" height="100%">
        <SideBar 
        isNonMobile={isNonMobile} 
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
            <NavBar 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            />
            <Outlet/>
        </Box>
    </Box>
  )
}
