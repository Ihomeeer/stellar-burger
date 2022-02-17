import React from "react";
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal');

function Modal ({children, title, item}) {

  return ReactDOM.createPortal (
    <ModalOverlay>
      <div className={styles.modalContainer}>
        <div className={`${styles.upperPanel} ml-10 mr-10 mt-10`}>
          {title ?
            <>
              <button className={styles.closeButton}>
                <CloseIcon type="primary" />
              </button>
              <h2 className={`${styles.title} text text_type_main-large`}>{title && title}</h2>
            </>
          :
            <button className={styles.closeButton}>
              <CloseIcon type="primary" />
            </button>
          }

        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  )
}

export default Modal;