import React, { useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import { StoreContext } from './Context/StoreContext'
import Learning from './pages/Learning/Learning'
import Academic from './pages/Academic/Academic'
import Career from './pages/Career/Career'
import "./index.css"

const App = () => {
  const { token } = useContext(StoreContext);  

  return (
    <>
      <div className='app'>
        {token && <Navbar />}

        <Routes>
          <Route 
            path="/" 
            element={token ? <Home /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="/login" 
            element={!token ? <Login /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/learning-module" 
            element={token ? <Learning /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="/academic-tracker" 
            element={token ? <Academic /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="/career-enhancement" 
            element={token ? <Career /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>

      {token && <Footer />}
    </>
  )
}

export default App
