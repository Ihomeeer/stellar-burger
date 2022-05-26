// модалка с инфой про ингредиент
import React, { FC } from 'react';
import styles from './ModalIngredient.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { useParams } from 'react-router-dom';
import { setIngredientModalVisibleAction } from '../../services/actions/allIngredients';
import { TCurrentIngredientState, TAllIngredientsState } from '../../utils/types/types';

const ModalIngredient: FC = () => {
  const dispatch = useDispatch();
  const { ingredientId } = useParams<{ ingredientId?: string }>();

  const { currentIngredient } = useSelector(
    (state): TCurrentIngredientState => state.currentIngredient
  );
  const { ingredients } = useSelector(
    (state): TAllIngredientsState => state.allIngredients
  );

  const item = currentIngredient ?
    currentIngredient
    :
    ingredients.filter(ingredient => ingredient._id === ingredientId)[0];

  React.useEffect(
    () => {
      if (ingredientId !== '') {
        dispatch(setIngredientModalVisibleAction())
      }
      // eslint-disable-next-line
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