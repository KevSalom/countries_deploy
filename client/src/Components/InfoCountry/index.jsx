import style from './index.module.css'

export default function InfoCountry ({logo, title, text, items, color, border}){

    return(
        <div className={style.container} >
             <div className={style.logoContainer } style={{border: border}} >
                <span>{logo}</span>
                <h3 style={{color: color}} >{title}</h3>
                <p>{text}</p>
                {items && items.length > 0 && <ol>
                    {items.map(item => <li>{item}</li>)}
                </ol>}
                </div>
        </div>
    )
}