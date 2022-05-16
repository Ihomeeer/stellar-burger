import { FC } from 'react';
import { TAllIngredientsState, TBaseIngredient } from '../../utils/types';
import styles from './IngredientPage.module.css';
import { useSelector, RootStateOrAny } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientPage: FC = () => {
  const { ingredientId } = useParams<{ ingredientId?: string }>()

  const { ingredients } = useSelector(
    (state: RootStateOrAny): TAllIngredientsState => state.allIngredients
  );

  const item: TBaseIngredient = ingredients.filter(ingredient => ingredient._id === ingredientId)[0];

  return (

    <div className={styles.container}>
      {item &&
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
      }
    </div>
  )
}

export default IngredientPage;