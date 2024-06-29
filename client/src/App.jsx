import React, { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from '../theme.js' 
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout.jsx'
import Dashboard from "./pages/dashboard.jsx"
import SignUp from "./pages/signUp.jsx"
import Products from './pages/products.jsx'
import SignIn from "./pages/signIn.jsx"
import Customers from './pages/customers.jsx'
import Profile from "./pages/Profile.jsx"
import Transaction from './pages/transaction.jsx'
import DataGridCustomToolbar from './components/dataGridCustomToolbar.jsx'
import Header from './components/header.jsx'


export default function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className=''>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
        <Route path='/sign-In' element={<SignIn/>}/>
        <Route path='/sign-Up' element={<SignUp/>}/>
          <Route element={<Layout/>}>
            <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/customers' element={<Customers/>}/>
            <Route path='/transaction' element={<Transaction/>}/>
            <Route path='/data' element={<DataGridCustomToolbar/>}/>
            <Route path='/header' element={<Header/>}/>
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
