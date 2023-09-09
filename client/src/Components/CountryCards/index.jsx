import React from 'react'
import { Link } from 'react-router-dom'
import style from './index.module.css'

export default function CountryCards({ id, name, capital, info, flag }) {
  return (
    <Link to={`/paises/${id}`}><div className={style.countryCardContainer} >
      <div className={style.mainInfoCard} >
        <img src={flag} alt={name} />
        <h2>{name}</h2>
        <h3>{(capital)? capital : 'Sin capital'}</h3>
      </div>
      <div className={style.aditionalInfo}>
        <p className={style.info} >{(info)}</p>
      </div>
    </div>
    </Link>
  )
}
