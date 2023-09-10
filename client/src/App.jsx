import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './Views/LandingPage'
import HomePage from './Views/HomePage'
import Activities from './Views/Activities'
import CreateActivity from './Views/CreateActivity'
import CountryDetail from './Views/CountryDetails'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import './App.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001'


export default function App() {

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
        <Route path="/paises" element={<HomePage/>}/>
        <Route path="/actividades" element={<Activities/>}/>
        <Route path="/crear-actividad" element={<CreateActivity/>}/>
        <Route path="/paises/:id" element={<CountryDetail/>}/>
      </Routes>
      </main>
      {(location.pathname !== "/") ? <Footer theme={theme} />: null}
    </div>
  )
}