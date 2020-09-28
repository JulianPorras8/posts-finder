import * as React from 'react';

// Material Components
import {
  AppBar, IconButton, Toolbar, Typography, useMediaQuery
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

// Modules
import { Route, Router } from 'react-router-dom';

// Config
import { history } from '../../src/configureStore';
// import { IssuesPage } from './pages';
import { withRoot } from './withRoot';
import { Temp } from './Temp';

function Routes() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Route exact={true} path='/' component={<Temp />} />
      <Route exact={true} path='/issues' component={<Temp />} />
    </div>
  );
}

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router history={history}>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant='h6'
                color='inherit'
                noWrap={isMobile}
              >
                Avantica - Posts Finder
              </Typography>
            </Toolbar>
          </AppBar>
          <Routes />
        </div>
      </div>
    </Router>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'absolute',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
}));

export default withRoot(App);
