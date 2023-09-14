import {useEffect, useState} from 'react';
import styles from './index.module.css'

const Modal = ({ modalOpen, onClose, title, content, type, options, handleOptions }) => {

  const [modalClassName, setModalClassName] = useState(styles.modal);
  const [modalContentClassName, setModalContentClassName] = useState(styles['modal-content']);

  useEffect(() => {
    setModalClassName(modalOpen ? `${styles.modal} ${styles.opened}` : styles.modal);


    setModalContentClassName(modalOpen? `${styles['modal-content']} ${styles.open} ${styles[type]}`
      : styles['modal-content']);
  }, [modalOpen]);

  return (
    <div className={modalClassName}>
      
      <form className={modalContentClassName}>
        <div className={styles.image} > { (type === 'success')? '✔' : (type === 'error') ? 'X' : '!' } </div>

        <span className={styles.title} >{title}</span>

        <span className={styles.content} >{content}</span>

        <div className={styles.buttonsArea}  ><button className={styles.close}  type="button" onClick={()=>{ onClose(); (handleOptions)? handleOptions(true): undefined; }}>Aceptar</button> {(options)? <button className={styles.cancel} type="button" onClick={()=>{ onClose(); (handleOptions)? handleOptions(false): undefined; }} >Cancelar</button>: undefined } </div>

      </form>
    </div>
  );
};

export default Modal;