// сюда впихивается все содержание модалки через компонент Modal, а еще тут всякие хэндлеры для закрытия модалок
import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';

function ModalOverlay({ children, isModalVisible, closeModal }) {

  // закрытие по клику на оверлей
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

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  isModalVisible: PropTypes.bool,
  closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;