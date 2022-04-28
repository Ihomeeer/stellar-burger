import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
  const {currentUser, isLoggedIn} = useSelector(store => store.user);
  return (
    <Route
      {...rest}
      // Получим текущий маршрут, с которого произойдёт переадресация
      // для неавторизованного пользователя
      render={({ location }) =>
      isLoggedIn || currentUser?.user.name
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