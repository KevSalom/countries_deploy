import React from "react";
import style  from './index.module.css'


export default function Pagination({
  onPrevious,
  onNext,
  currentPage,
  totalPages
}) {
  return (
  <div> 
    <div className={style.mainContainerLeft}>
      <div className={style.containerButton}>
    <button className={style.button} onClick={onPrevious} disabled={currentPage === 1}>
    ←
      </button>
      <span className={style.backButton}></span>
      </div>
      </div>
      <div className={style.mainContainerRigth}>
      <div className={style.containerButton}>
      <button className={style.button} onClick={onNext} disabled={currentPage === totalPages}>
      →
      </button>
      <span className={style.backButton}></span>
      </div>
      </div>
      <div className={style.numberPagination} >
      <p>{currentPage} de {totalPages}</p>
      </div>
  </div>
)}


