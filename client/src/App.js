import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './partials/_global.scss'
import Header from "./components/Header/Header";
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
    return (
    
        <div>
            <BrowserRouter>
            <Header/>
                <div className='main-section'>
                    <Routes>
                        <Route path="/login" exact element={ <Login /> } />
                        <Route path="/register" exact element={ <Register/> } />
                        <Route path="/dashboard" exact element={ <Dashboard/> } />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App