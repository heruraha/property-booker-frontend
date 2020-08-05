import React from 'react';
import Routes from 'routes';
import Store from 'store';

import 'assets/scss/index.scss';

const App = () => {
  document.title = `Trekker`;
  
  return (
    <Store>
      <Routes/>
    </Store>
  ); 
}

export default App;
