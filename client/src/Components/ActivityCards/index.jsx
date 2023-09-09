import React from 'react'
import style from './index.module.css'


export default function ActivityCards({ id, name, emoji, countries, description, season, duration,  difficulty, handleDeleteConfirmation }) {
  return (
    <div className={style.activityCardContainer}>
      <div className={style.cardHeader}>
       <div className={style.titleLogoHeader}>
        <span>{emoji}</span>
        <h2>{name}</h2>
        </div>
        
        <div className={style.buttonHeader}>
          <button onClick={()=> handleDeleteConfirmation(id, name)}><ion-icon name="close"></ion-icon></button>
        </div>

      </div>

      <p className={style.descriptionCards}>{description}</p>

      <div className={style.activityInfo}>
        <span className={style.season}>🌡️ {season}</span>
        <span className={style.duration}>⌚ {duration} Días</span>
        <span className={style.difficulty}>⚡ { difficulty}</span>
      </div>

      <div className={style.acitivityCountries}>
        {countries.map((c) => <img key={c.flag} src={c.flag} />)}
      </div>

    </div>
  )
}
