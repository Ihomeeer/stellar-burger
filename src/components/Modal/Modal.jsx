import React from "react";
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal');

function Modal ({title}) {

  return ReactDOM.createPortal (
    <div className={styles.modalContainer}>
      <div className={`${styles.upperPanel} ml-10 mr-10 mt-10`}>
        <h2 className={`${styles.title} text text_type_main-large`}>{title && title}</h2>
        <button className={styles.closeButton}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay>

      </ModalOverlay>
    </div>,
    modalRoot
  )
}

export default Modal;