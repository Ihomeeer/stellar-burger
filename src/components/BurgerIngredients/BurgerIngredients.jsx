// Список ингредиентов для бургеров (секция слева)
import { useRef } from "react";
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CURRENT_TAB } from '../../services/actions/allIngredients';

function BurgerIngredients({ openModal }) {
  const dispatch = useDispatch();
  const { ingredients, buns, sauces, mainIngredients, currentTab } = useSelector(
    state => state.allIngredients
  );

  // Тут работа со вкладками ингредиентов --------------------------------------------------------------------------------------
  // Рефы для всех видов ингредиентов и общего их списка
  // Булки
  const bunsRef = useRef(null);
  // Соусы
  const saucesRef = useRef(null);
  // Основные ингредиенты
  const mainIngredientsRef = useRef(null);
  // Общий список
  const refContainer = useRef(null);

  //Обработка нажатий на вкладки
  const handleSelectTab = (ref, currentTab) => {
    // прыжок к нужному рефу
    ref.current.scrollIntoView({ behavior: "smooth" });
    handleTab(currentTab);
  }

  //Обработка скроллинга для активации актуальной вкладки
  const handleScroll = () => {
    // булочные отступы
    const bunsSpacing = bunsRef.current.getBoundingClientRect().top - refContainer.current.getBoundingClientRect().top;
    // соусные отступы
    const saucesSpacing = saucesRef.current.getBoundingClientRect().top - refContainer.current.getBoundingClientRect().top;
    // Переключение вкладок
    switch (true) {
      case (bunsSpacing >= -220): {
        handleTab("buns");
        break;
      }
      case (saucesSpacing >= -440): {
        handleTab("sauces");
        break;
      }
      case (saucesSpacing <= -440): {
        handleTab("mainIngredients");
        break;
      }
      default: {
        return
      }
    }
  }

  // Пробрасывание актуальной вкладки в хранилище
  const handleTab = (tab) => {
    dispatch({
      type: SET_CURRENT_TAB,
      currentTab: tab
    })
  }
  // --------------------------------------------------------------------------------------

  return (
    <section className={styles.section}>

      <div className="mb-5 mt-10">
        <h2 className={`${styles.text} ${styles.header} text text_type_main-large`}>Соберите бургер</h2>
      </div>

      <div className={`${styles.tabsContainer} mb-10`}>
        <Tab value='one' active={currentTab === 'buns'} onClick={() => { handleSelectTab(bunsRef, "buns") }}>
          Булки
        </Tab>
        <Tab value='two' active={currentTab === 'sauces'} onClick={() => { handleSelectTab(saucesRef, "sauces") }}>
          Соусы
        </Tab>
        <Tab value='three' active={currentTab === 'mainIngredients'} onClick={() => { handleSelectTab(mainIngredientsRef, "mainIngredients") }}>
          Начинки
        </Tab>
      </div>
      {ingredients.length > 0
        ?
        <div className={`${styles.itemsContainer} ${styles.scrollIngredients}`} ref={refContainer} onScroll={ handleScroll }>

          <div>
            <h3 className={`${styles.text} ${styles.header} text text_type_main-medium mb-6`} ref={bunsRef}>Булки</h3>
            <ul className={`${styles.list}`}>
              {
                buns && buns?.map(function (item) {
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
            <h3 className={`${styles.text} ${styles.header} text text_type_main-medium mb-6`} ref={saucesRef}>Соусы</h3>
            <ul className={`${styles.list}`}>
              {
                sauces && sauces?.map(function (item) {
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
            <h3 className={`${styles.text} ${styles.header} text text_type_main-medium mb-6`} ref={mainIngredientsRef}>Начинки</h3>
            <ul className={`${styles.list}`}>
              {
                mainIngredients && mainIngredients?.map(function (item) {
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
        :
        <h2 className={styles.loading}>Загрузка...</h2>
      }

    </section>
  )
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;