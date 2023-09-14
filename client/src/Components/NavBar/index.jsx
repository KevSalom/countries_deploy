import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import style from "./index.module.css";
import actizone from "../../assets/actizone.svg";
import Button from "../Button"
import logoutaW from '../../assets/logoutaW.svg'
import logoutB from '../../assets/logoutB.svg'
import plusB from '../../assets/plusB.svg'
import plusW from '../../assets/plusW.svg'

export default function NavBar({handleTheme, theme}) {


  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  return (
    <header className={(isScrolled)? `${style.navBarContainer} ${style.border}` : style.navBarContainer}>
      <div className={style.logoSection}>
      <Link to="/paises">
        <div className={style.logo}>
         <img src={actizone} alt="logo ActiVue" />
          <span className={style.titleLogo}>ctiZone</span>
        </div></Link>

        <div className={style.menu} >
        <NavLink to="/paises"><span>Países</span></NavLink>
        <NavLink to="/actividades"><span>Actividades</span></NavLink>

       
      </div>

      </div>
      
      <div className={style.menuButton} >
         < Button text={(theme)?'☀️':'🌙'} onclick={handleTheme}/>
         <Link to="/crear-actividad">< Button text={ (theme)?  <span><img src={plusW} /> Crear Actividad</span>: <span><img src={plusB}/> Crear Actividad</span>} /></Link>
        <Link to="/">< Button text={(theme)? <span><img src={logoutaW}/>Salir</span> :<span><img src={logoutB}/>Salir</span>} /></Link>

        
      </div>
    </header>)
}
