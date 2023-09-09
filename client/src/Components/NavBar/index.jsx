import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import style from "./index.module.css";
import actizone from "../../assets/actizone.svg";
import Button from "../Button"

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
         < Button text={(theme)?<ion-icon name="sunny-outline"></ion-icon>:<ion-icon name="moon"></ion-icon> } onclick={handleTheme}/>
        <Link to="/crear-actividad">< Button text={<span><ion-icon name="add-sharp"></ion-icon>Actividad</span>} /></Link>
        <Link to="/">< Button text={<span><ion-icon name="log-out-outline"></ion-icon> Salir</span>} /></Link>
      </div>
    </header>)
}
