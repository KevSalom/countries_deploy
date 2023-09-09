import style from './index.module.css'


export default function Button ({ text, type, onclick}) {
  return(
    <div className={style.containerButton}>
        <button className={style.button} onClick={(onclick)? onclick : undefined} type={(type)?type:'button'}>
             {text}
        </button>
        <span className={style.backButton}>
        </span>
    </div>
  )
}