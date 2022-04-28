// модалка с инфой про ингредиент
import React from 'react';
import styles from './ModalIngredient.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SET_INGREDIENT_MODAL_VISIBLE } from '../../services/actions/currentIngredient';

function ModalIngredient() {
  const dispatch = useDispatch();
  const { ingredientId } = useParams();

  const { currentIngredient } = useSelector(
    state => state.currentIngredient
  );
  const { ingredients } = useSelector(
    state => state.allIngredients
  );

  const item = currentIngredient ?
    currentIngredient
    :
    ingredients.filter(ingredient => ingredient._id === ingredientId)[0]
    ;

  React.useEffect(
    () => {
      if (ingredientId !== '') {
        dispatch({
          type: SET_INGREDIENT_MODAL_VISIBLE
        })
      }
    }, [])

  return (
    <>
      {
        item !== undefined &&
        <div className={styles.container}>
          <>
            <img alt={item.name} src={item.image} className={`${styles.image} mb-4`}></img>
            <p className="text text_type_main-medium mb-8">{item.name}</p>
            <ul className={`${styles.list} mb-15`}>

              <li className={`${styles.listItem} mr-5`}>
                <p className={`${styles.itemTitle} text text_type_main-default text_color_inactive mb-2`}>
                  Калории,ккал
                </p>
                <p className={`${styles.itemQuantity} text text_type_digits-default text_color_inactive`}>
                  {item.calories}
                </p>
              </li>

              <li className={`${styles.listItem} mr-5`}>
                <p className={`${styles.itemTitle} text text_type_main-default text_color_inactive mb-2`}>
                  Белки, г
                </p>
                <p className={`${styles.itemQuantity} text text_type_digits-default text_color_inactive`}>
                  {item.proteins}
                </p>
              </li>

              <li className={`${styles.listItem} mr-5`}>
                <p className={`${styles.itemTitle} text text_type_main-default text_color_inactive mb-2`}>
                  Жиры, г
                </p>
                <p className={`${styles.itemQuantity} text text_type_digits-default text_color_inactive`}>
                  {item.fat}
                </p>
              </li>

              <li className={`${styles.listItem}`}>
                <p className={`${styles.itemTitle} text text_type_main-default text_color_inactive mb-2`}>
                  Углеводы, г
                </p>
                <p className={`${styles.itemQuantity} text text_type_digits-default text_color_inactive`}>
                  {item.carbohydrates}
                </p>
              </li>

            </ul>
          </>
        </div>
      }
    </>
  )
}

export default ModalIngredient;