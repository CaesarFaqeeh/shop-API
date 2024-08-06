import  { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetails from './components/ProductDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} filter={filter} setFilter={setFilter} />
      <Switch>
        <Route path="/" exact>
          <Home filter={filter} />
        </Route>
        <Route path="/category/:category" component={Category} />
        <Route path="/product/:id" component={ProductDetails} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
