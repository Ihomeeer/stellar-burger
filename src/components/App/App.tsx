import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';

function App() {
const click = () => {
  console.log('click')
}

  return (
    <div className={appStyles.App}>
      <AppHeader />
    </div>
  );
}

export default App;
