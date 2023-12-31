import { useState,useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './Views/LandingPage'
import HomePage from './Views/HomePage'
import Activities from './Views/Activities'
import CreateActivity from './Views/CreateActivity'
import CountryDetail from './Views/CountryDetails'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import Error404 from './Components/Error 404'
import './App.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://countriesdeploy-production.up.railway.app/'
// axios.defaults.baseURL = 'http://localhost:3001'

export default function App() {

  const firstUpdate = useRef(true);
  const [theme, setTheme] = useState(false)

  const handleTheme = () => {
    setTheme(!theme)
  }

  const location = useLocation();

  return (
    <div className={(theme)?`appContainer dark`:"appContainer"} >
       {(location.pathname !== "/") ? <NavBar handleTheme={handleTheme} theme={theme} />: null}
       
       <main>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/paises" element={<HomePage firstUpdate={firstUpdate} />}/>
        <Route path="/actividades" element={<Activities/>}/>
        <Route path="/crear-actividad" element={<CreateActivity/>}/>
        <Route path="/paises/:id" element={<CountryDetail/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
      </main>
      {(location.pathname !== "/") ? <Footer theme={theme} />: null}
    </div>
  )
}