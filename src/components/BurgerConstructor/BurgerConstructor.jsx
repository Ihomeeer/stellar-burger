import React from "react";
import styles from './BurgerConstructor.module.css';
import { Button, CurrencyIcon, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../../utils/data';

function BurgerConstructor () {
  return(
    <section className={`${styles.section} ml-10 pt-25`}>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={1}
      />
      <ConstructorElement
        text="Краторная булка N-200i (верх)"
        price={50}
        thumbnail={1}
      />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={1}
      />
    </div>


      <div className={`${styles.lowerPanel} mt-10 mr-4`}>
        <p className="text text_type_main-large mr-2">444</p>
        <CurrencyIcon type="primary" />
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;