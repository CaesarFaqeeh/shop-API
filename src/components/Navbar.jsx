import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, TextField, IconButton, Tooltip, Select, MenuItem, Switch, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ toggleDarkMode, darkMode, filter, setFilter }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const history = useHistory();
  const theme = useTheme();

  const handleSearch = () => {
    history.push(`/?search=${searchTerm}`);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <AppBar position="static" color={darkMode ? "default" : "primary"}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: theme.palette.common.white, textDecoration: 'none' }}>
          My E-commerce App
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          sx={{ marginRight: 1, flexGrow: 1, borderRadius: 2, backgroundColor: theme.palette.background.paper }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch} color="inherit">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <Select
          value={filter}
          onChange={handleFilterChange}
          sx={{ marginLeft: 2, color: theme.palette.common.white, backgroundColor: theme.palette.action.hover }}
          inputProps={{ 'aria-label': 'Filter' }}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price_asc">Price Low to High</MenuItem>
          <MenuItem value="price_desc">Price High to Low</MenuItem>
        </Select>
        <Tooltip title="Cart">
          <IconButton color="inherit" sx={{ marginLeft: 2 }}>
            <ShoppingCartIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Menu">
          <IconButton color="inherit" sx={{ marginLeft: 2 }}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle Dark Mode">
          <IconButton color="inherit" onClick={toggleDarkMode} sx={{ marginLeft: 2 }}>
            <Switch checked={darkMode} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
