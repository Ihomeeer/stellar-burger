import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/user';


export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isLoggedIn, loggingIn } = useSelector(store => store.user);
  let location = useLocation();

  React.useEffect(() => {
    getUser();
  })

  return (


    <>{
      !loggingIn &&
      <Route
        {...rest}
        // Получим текущий маршрут, с которого произойдёт переадресация
        // для неавторизованного пользователя
        render={({ location }) =>
          isLoggedIn && isLoggedIn
            ?
            (
              children
            ) : (
              <Redirect
                // Передадим в пропс to не строку, а объект.
                to={{
                  // Маршрут, на который произойдёт переадресация
                  pathname: '/login',
                  // В from сохраним текущий маршрут
                  state: { from: location }
                }}
              />
            )
        }
      />
    }</>



  )






}