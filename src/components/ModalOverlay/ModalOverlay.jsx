import React from "react";
import styles from './ModalOverlay.module.css'

function ModalOverlay({children}) {

  return (
    <section className={styles.container}>
      {children}
    </section>
  )
}

export default ModalOverlay;