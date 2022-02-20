import React from "react";
import styles from './ModalOverlay.module.css'

function ModalOverlay({children, isModalVisible, closeModal}) {

  const overlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }
  return (
    <div className={`${styles.container} ${isModalVisible ? styles.containerActive : ''}`} onClick={overlayClick}>
      {children}
    </div>
  )
}

export default ModalOverlay;