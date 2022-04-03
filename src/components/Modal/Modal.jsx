// Общий компонент для всех модалок
import React from "react";
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal');

function Modal ({children, title, isModalVisible, closeModal}) {

    // закрытие по клику на esc
    const modalEscPressHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    // закрытие по клику на esc - слушатель
    React.useEffect(() => {
      document.addEventListener('keydown', modalEscPressHandler)
      return  () => document.removeEventListener('keydown', modalEscPressHandler)
    }, [])

  return ReactDOM.createPortal (
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
    modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  isModalVisible: PropTypes.bool,
  closeModal: PropTypes.func.isRequired
}

export default Modal;