import React from "react";
import styles from './ModalOverlay.module.css'

function ModalOverlay({children}) {

  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}

export default ModalOverlay;