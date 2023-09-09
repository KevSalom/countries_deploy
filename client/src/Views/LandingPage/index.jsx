import { useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../../Components/Loader"
import './style.css'
import logo from '../../assets/actizone.svg'

export default function LandingPage() {
  
  return (
    <div className={'landingContainer'} >
      <div className="background"></div>
      <img src={logo} alt="" className="logoLanding"/>
      <h2>ActiZone</h2>
      <h3>Tu <span className="companero">Compañero </span>de <span className="viaje">Viaje</span></h3>
     <div ><Link to="/paises"><button className="landingButton">INGRESAR</button></Link></div> 
    </div>
  )
}
