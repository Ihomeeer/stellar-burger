// Список ингредиентов для бургеров (секция слева)
import React from "react";
import { ingredientsPropTypes } from "../../utils/PropTypes";
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import IngredientsItem from '../IngredientsItem/IngredientsItem';


function BurgerIngredients ({ ingredients, openModal }) {

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
              ingredients.filter(function(item) {
                return item.type === "bun"
              }).map(function(item) {
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
              ingredients.filter(function(item) {
                return item.type === "sauce"
              }).map(function(item) {
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
              ingredients.filter(function(item) {
                return item.type === "main"
              }).map(function(item) {
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
  ingredients: ingredientsPropTypes,
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;