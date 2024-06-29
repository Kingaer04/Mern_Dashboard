import { React, useEffect, useState } from 'react'
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import { SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, PublishOutlined, PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined, AdminPanelSettingsOutlined, TrendingUpOutlined, PieChartOutlined, PublicOutlined } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './flexBetween'
import { useSelector } from 'react-redux'

const navItem =  [
  {
    text: "Dashboard",
    icon: <HomeOutlined/>
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined/>
  },
  {
    text: "Customers",
    icon: <Groups2Outlined/>
  },
  {
    text: "Transaction",
    icon: <ReceiptLongOutlined/>
  },
  {
    text: "Geography",
    icon: <PublicOutlined/>
  },
  {
    text: "Sales",
    icon: null
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined/>
  },
  {
    text: "Daily",
    icon: <TodayOutlined/>
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined/>
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined/>
  },
  {
    text: "Management",
    icon: null
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined/>
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined/>
  },
]

export default function SideBar(props) {
    const {currentUser} = useSelector((state) => state.user)
    const { pathname } = useLocation() //To grab current location
    const [active, setActive] = useState("") //To determine the current page
    const navigate = useNavigate()
    const theme = useTheme()

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname]) // to set the current url
  return (
    <Box componet="nav">
      {props.isSidebarOpen && (
        <Drawer
          open={props.isSidebarOpen}
          onClose={() => props.setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: props.drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: props.isNonMobile ? 0 : "2px",
              width: props.drawerWidth
            }
          }}>
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary.main}>
                  <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight="bold">
                      MoiPayWay
                    </Typography>
                  </Box>
                  {!props.isNonMobile && (
                    <IconButton onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
                  >
                    <ChevronLeft/>
                  </IconButton>
                  )}
                </FlexBetween>
              </Box>
            </Box>
            <List>
              {navItem.map(({text, icon}) => {
                if(!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    </Typography>
                  )
                }
                const lcText = text.toLowerCase()

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => { navigate(`/${lcText}`) 
                    setActive(lcText)}}
                    sx={{
                      backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                      color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100]
                    }}>
                      <ListItemIcon sx={{
                        ml: "2rem",
                        color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200]
                      }}>
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }}/>
                      )}
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
            <Box bottom="2rem">
              <Divider/>
              <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                <Box 
                component="img"
                alt="profile"
                src={currentUser ? currentUser.avatar: "Login"}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{objectFit: "cover"}}
                />
                  <Box textAlign="left">
                      <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
                        {currentUser? currentUser.userName : ""}
                      </Typography>
                      <Typography  fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                        {currentUser? currentUser.occupation || "Admin":""}
                      </Typography>
                  </Box>
                  <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}/>
              </FlexBetween>
            </Box>
          </Drawer>
      )}

    </Box>
  )
}
