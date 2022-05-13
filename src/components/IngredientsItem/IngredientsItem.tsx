// карточка с ингредиентом для левой секции
import { FC } from "react";
import styles from './IngredientsItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useLocation, Link } from 'react-router-dom';
import { TIngredientsItem } from '../../utils/types';

const IngredientsItem: FC<TIngredientsItem> = ({ item, openModal }) => {

  const location = useLocation()
  const ingredientId = item._id;

  // реф для реализации таскания ингредиентов
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { item },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    <Link
      className={styles.link}
      key={ingredientId}
      to={{
        // Тут задается динамический путь к каждому ингредиенту и записывается в backgroud изначальный роут с ингредиентами
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location }
      }}
    >
      <div className={`${styles.cardContainer} ${isDrag && styles.cardContainerMoving} mt-6`} onClick={() => openModal(item)} ref={dragRef}>
        <div className={styles.counter}>
          {item.counter > 0 && <Counter count={item.counter} size="default" />}
        </div>
        <img alt={item.name} src={item.image} className={`${styles.cardImage} ml-4 mr-4`}></img>
        <div className={`${styles.priceContainer} mb-2 mt-1`}>
          <p className="text text_type_main-default mr-1">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small">{item.name}</p>
      </div>
    </Link>
  )
}

export default IngredientsItem;