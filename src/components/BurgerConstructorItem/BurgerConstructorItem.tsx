
import { useRef, FC } from "react";
import { useDrag, useDrop } from 'react-dnd';
import styles from './BurgerConstructorItem.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks';
import { TBurgerConstructorItem, TConstructorIngredient } from '../../utils/types/types';
import { deleteItemAction, decreaseCounterAction } from "../../services/actions/allIngredients";

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({ item, index, isTop, isBottom, isLocked, moveItem }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  // реф для тасовки ингредиентов
  const [, drop] = useDrop({
    accept: "ingredient",
    hover(item: TConstructorIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      if (index !== undefined) {
        // начальное положение
        const dragIndex = item?.index;
        // конечное положение
        const hoverIndex = index;
        // если индексы равны, то ничего не трогать
        if (dragIndex === hoverIndex) {
          return;
        }
        // Рассчет координат и положения указателя мыши
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor?.getClientOffset();
        // @ts-ignore
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex! < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex! > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        // плохо мутировать объет напрямую, но тут ничего не поделать
        moveItem(dragIndex!, hoverIndex);
        item.index = hoverIndex;
      }
    }
  })

  // реф для таскания
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  dragRef(drop(ref));

  // удаление ингредиента из конструктора
  const handleDelete = (item: TConstructorIngredient) => {
    dispatch(deleteItemAction(item))
    dispatch(decreaseCounterAction(item))
  }

  return (
    <div className={`${styles.item} ${isTop || isBottom ? styles.borderItem : ''}`} ref={isLocked ? null : ref} style={{ opacity }}>
      {!isLocked && <DragIcon type="primary" />}
      {
        item && <ConstructorElement
          type={isTop ? 'top' : isBottom ? 'bottom' : undefined}
          isLocked={isLocked ? true : false}
          text={isTop ? item.name + ` верх` : isBottom ? item.name + ` низ` : item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => handleDelete(item)}
        />
      }
    </div>
  )
}

export default BurgerConstructorItem;