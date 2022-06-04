import React, { FC } from 'react';
import styles from './FeedPage.module.css';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed';
import { ScoreBoard } from '../../components/ScoreBoard/ScoreBoard';
import { WSConnectionStartAction, WSConnectionClosedAction } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks';
import { TWSState } from '../../utils/types/reducers/WSReducerTypes';


export const FeedPage: FC = () => {
  const dispatch = useDispatch();

  const { wsConnected, responseData } = useSelector(
    (state): TWSState => state.ws
  );

  React.useEffect(() => {
      console.log('start feedpage')
      dispatch(WSConnectionStartAction());
    return() => {
      console.log('return feedpage')
      dispatch(WSConnectionClosedAction());
    }
  }, [])

  return (
    <section className={styles.page}>
      <h2 className={`${styles.header} text text_type_main-large mt-8 mb-4`}>Лента заказов</h2>
      <div className={styles.data}>
        {
          responseData &&
          <>
            <OrderFeed
              data={responseData.orders}
              pathname='/feed/'
            />
            <ScoreBoard
              data={responseData}
            />
          </>
        }

      </div>
    </section>
  )
}