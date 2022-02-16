import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import api from '../../utils/api';



function App() {

  const filterBuns = (array) => {
    return array.filter((item) => item.type === 'bun')
  }

  const [basicIngredients, setBasicIngredients] = React.useState([]);
  const [buns, setBuns] = React.useState([])

  // получение ингредиентов при отрисовке страницы
  React.useEffect(() => {
    api.getAllIngredients()
    .then((res) => {
      setBasicIngredients(res.data);
      setBuns(filterBuns(res.data))
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div id="app" className={appStyles.App}>
      <AppHeader />
      <div className={appStyles.sectionContainer}>
        <BurgerIngredients
          ingredients={basicIngredients}
        />
        <BurgerConstructor
          ingredients={basicIngredients}
          bun={buns[0]}
        />
      </div>
      <div id="modal"></div>
      <Modal
        title="тройной казел"
      />
    </div>
  );
}

export default App;
