import { React, useState } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from "@mui/icons-material"
import FlexBetween from './flexBetween'
import { useDispatch, useSelector } from 'react-redux'
import { setMode } from '../redux/modeSlice.js'
import { AppBar, IconButton, Toolbar, useTheme, InputBase, Button, MenuItem, Box, Typography, Menu } from '@mui/material'
import { signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/userSlice'

export default function Navbar({isSidebarOpen, setIsSidebarOpen}) {
    const {currentUser} = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    }
    function handleClose() {
        setAnchorEl(null)
    }
    async function handleSignOut() {
        dispatch(signOutUserStart())
        try {
          const res = await fetch('/user/signOut')
          const data = await res.json()
          if (data.error) {
            dispatch(signOutUserFailure(data.error))
            setError(data.error)
            return
          }
          dispatch(signOutUserSuccess(data))
        } catch (error) {
          dispatch(signOutUserFailure(error))
            setError(error)
        }}

  return (
    <AppBar sx={{
        position: "static",
        background: "none",
        boxShadow: "none"
        }}>
        <Toolbar sx={{justifyContent: "space-between"}}>
            <FlexBetween>
                <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <MenuIcon/>
                </IconButton>
                <FlexBetween backgroundColor={theme.palette.background.alt} borderRadiua="9px" gap="3rem" p="0.1rem 1.5rem">
                <InputBase placeholder='Search...'/>
                <IconButton>
                    <Search/>
                </IconButton>
                </FlexBetween>
            </FlexBetween>
            <FlexBetween gap="1.5rem">
                <IconButton onClick={()=>dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (<DarkModeOutlined sx={{ fontSize: "25px" }}/>) : (<LightModeOutlined sx={{ fontSize: "25px" }}/>)}
                </IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }}/>
                <FlexBetween>
                    <Button onClick={handleClick} sx={{
                        display: "flex", justifyContent: "space-between", alignItems:"center", textTransform: "none", gap: "1rem" 
                    }}>
                        <Box 
                        component="img"
                        alt="profile"
                        src={currentUser ? currentUser.avatar: "Login"}
                        height="32px"
                        width="32px"
                        borderRadius="50%"
                        sx={{objectFit: "cover"}}
                        />
                        <Box textAlign="left">
                            <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}>
                            {currentUser? currentUser.userName : ""}
                            </Typography>
                            <Typography  fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }}>
                            {currentUser? currentUser.occupation || "Admin":""}
                            </Typography>
                        </Box>
                        <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px"}}/>
                    </Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} anchorOrigin={{ vertical: "buttom", horizontal: "center" }}>
                        <MenuItem onClick={handleClose}>
                        <MenuItem onClick={handleSignOut}>
                        Log Out
                        </MenuItem>
                        </MenuItem>
                    </Menu>
                </FlexBetween>
            </FlexBetween>
        </Toolbar>
    </AppBar>
  )
}
