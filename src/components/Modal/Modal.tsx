// Общий компонент для всех модалок
import React, { FC, KeyboardEvent } from "react";
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModal } from '../../utils/types';

const modalRoot = document.getElementById('modal');

const Modal: FC<TModal> = ({ children, title, isModalVisible, closeModal }) => {

  // закрытие по клику на esc
  const modalEscPressHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  // закрытие по клику на esc - слушатель
  React.useEffect(() => {
    // @ts-ignore
    document.addEventListener('keydown', modalEscPressHandler)
    // @ts-ignore
    return () => document.removeEventListener('keydown', modalEscPressHandler)
  }, [])

  return ReactDOM.createPortal(
    <ModalOverlay
      isModalVisible={isModalVisible}
      closeModal={closeModal}
    >
      <div className={styles.modalContainer}>
        <div className={`${styles.upperPanel} ml-10 mr-10 mt-10`}>
          {title ?
            <>
              <button className={styles.closeButton} onClick={closeModal}>
                <CloseIcon type="primary" />
              </button>
              <h2 className={`${styles.title} text text_type_main-large`}>{title && title}</h2>
            </>
            :
            <button className={styles.closeButton} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          }
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!
  )
}

export default Modal;