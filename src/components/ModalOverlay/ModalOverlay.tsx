// сюда впихивается все содержание модалки через компонент Modal, а еще тут всякие хэндлеры для закрытия модалок
import { FC, MouseEvent } from 'react'
import styles from './ModalOverlay.module.css'
import { TModalOverlay } from '../../utils/types/types'

const ModalOverlay: FC<TModalOverlay> = ({ children, isModalVisible, closeModal }) => {

  // закрытие по клику на оверлей
  const overlayClick = (e: MouseEvent) => {
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