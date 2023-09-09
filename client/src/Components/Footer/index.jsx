import style from './index.module.css'
import whiteLinkLogo from '../../assets/link logo blanco.svg'
import whiteXLogo from '../../assets/x blanco logo.svg'
import linkLogo from '../../assets/link logo.svg'
import xLogo from '../../assets/x logo.svg'

export default function Footer ({theme}){
    return (
        <footer >
            
            {!theme && <div><a href=""><img src={whiteLinkLogo}/></a>  <a href=""><img src={whiteXLogo}/></a> </div>}
            {theme && <div><a href=""><img src={linkLogo} /></a>  <a href=""><img src={xLogo} /></a> </div>}
            <p>Desarrollado con ❤️ por Kevin Salom</p> 
        </footer>
    )
}