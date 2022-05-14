import { FC } from 'react'
import { useSelector, RootStateOrAny } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { TUserState } from '../../utils/types';

export const ProtectedRoute: FC = ({ children, ...rest }) => {
  const { isLoggedIn, loggingIn } = useSelector((state: RootStateOrAny):TUserState => state.user);

  return (
    <>
      {
        !loggingIn
          ?
          <Route
            {...rest}
            // Получим текущий маршрут, с которого произойдёт переадресация
            // для неавторизованного пользователя
            render={({ location }) =>
              isLoggedIn
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
          :
          <Route
            {...rest}
            // Получим текущий маршрут, с которого произойдёт переадресация
            // для неавторизованного пользователя
            render={({ location }) =>
              <Redirect
                // Передадим в пропс to не строку, а объект.
                to={{
                  // Маршрут, на который произойдёт переадресация
                  pathname: '/login',
                  // В from сохраним текущий маршрут
                  state: { from: location }
                }}
              />
            }
          />
      }
    </>
  )
}