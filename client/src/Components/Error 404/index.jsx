import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './index.module.css'

export default function Error404() {

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 5500)
  }, [])

  return (
    <div>
      <h1>¡Ups! No hay nada por acá...</h1>
      <h3>Serás redirigido a la página principal en unos segundos...</h3>
    </div>
  )
}
