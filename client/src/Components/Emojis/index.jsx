import style from './index.module.css'


export default function Emojis({handleEmoji}){
   
   const emojis = ['😊', '😎', '🤠', '😃', '🤑', '😇', '🥵', '🥶', '🥳', '❤️', '👩‍❤️‍💋‍👨', '🏃‍♂️', '🏃‍♀️', '🏄‍♂️', '🏄‍♀️', '🥽', '🥎', '⚾', '⛳','🎶', '🍜', '🍻', '👙', '🧢', '🚂', '🛫', '🛳️', '🚁', '🛶', '🏖️', '🏕️', '🏯', '🗽', '🎠', '🕌', '🎁', '🎈', '⭐', '🎃', '🎄']
   
   return (
    <div className={style.emojiContainer} >
    {emojis.map((e , index) => <span onClick={()=>handleEmoji(e) } className={style.emoji} key={index} >{e}</span>)}
    </div>
   )
}       