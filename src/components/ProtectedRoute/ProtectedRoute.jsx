import React from "react";
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
  const token = getCookie('token')
  const currentUser = useSelector(store => store.user);
  return (
    <Route
      {...rest}
      // Получим текущий маршрут, с которого произойдёт переадресация
      // для неавторизованного пользователя
      render={({ location }) =>
        token || currentUser?.user.name
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
  )
}