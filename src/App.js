import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyle from './styles/globals';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <GlobalStyle />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
