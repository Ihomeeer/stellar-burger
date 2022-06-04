import React, { FC } from 'react';
import { OrderFeed } from '../../components/OrderFeed/OrderFeed';
import { WSConnectionStartAction } from '../../services/actions/wsActions';
import { useDispatch, useSelector } from '../../services/hooks';
import { TWSState } from '../../utils/types/reducers/WSReducerTypes';
import { getCookie } from '../../utils/cookie';

export const PersonalFeed: FC = () => {
  const dispatch = useDispatch();

  const { wsConnected, responseData } = useSelector(
    (state): TWSState => state.ws
  );

  React.useEffect(() => {
    if (!wsConnected) {
      dispatch(WSConnectionStartAction(getCookie('token') as string));
    }
  }, [wsConnected, dispatch])

  return (
    <>
      {
        responseData &&
        <OrderFeed
          data={responseData.orders}
          pathname='orders/'
        />
      }
    </>
  )
}

// видимо, вся проблема в непонятных коннектах к вебсокету, коннекты происходят не тогда, когда надо