// Список ингредиентов для бургеров (секция слева)
import React from "react";
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import { useSelector } from 'react-redux';




function BurgerIngredients ({ openModal }) {

  const { buns, sauces, mainIngredients } =  useSelector(
    state => state.allIngredients
  );

  const [current, setCurrent] = React.useState('one')

  return (
    <section className={styles.section}>

      <div className="mb-5 mt-10">
        <h2 className={`${styles.text} ${styles.header} text text_type_main-large`}>Соберите бургер</h2>
      </div>

      <div className={`${styles.tabsContainer} mb-10`}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={`${styles.itemsContainer} ${styles.scrollIngredients}`}>
        <div>
          <h3 className={`${styles.text} ${styles.header} text text_type_main-medium mb-6`}>Булки</h3>
          <ul className={`${styles.list}`}>
            {
              buns && buns?.map(function(item) {
                return (
                  <li key={item._id}>
                    <IngredientsItem
                    item={item}
                    openModal={openModal}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div>
          <h3 className={`${styles.text} ${styles.header} text text_type_main-medium mb-6`}>Соусы</h3>
          <ul className={`${styles.list}`}>
            {
              sauces && sauces?.map(function(item) {
                return (
                  <li key={item._id}>
                    <IngredientsItem
                    item={item}
                    openModal={openModal}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div>
          <h3 className={`${styles.text} ${styles.header} text text_type_main-medium mb-6`}>Начинки</h3>
          <ul className={`${styles.list}`}>
            {
              mainIngredients && mainIngredients?.map(function(item) {
                return (
                  <li key={item._id}>
                    <IngredientsItem
                    item={item}
                    openModal={openModal}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;