import * as React from 'react';

// Material Components
import { AppBar, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Modules
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Config
import { withRoot } from '../_app/withRoot';
import { SearchInput } from './SearchInput';

// Actions
import { getPosts } from '../../src/actions/postsAction';

function App() {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const items = useSelector((state: RootState) => state.posts.items);
  console.log('items >>>', items);

  // const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log('getPosts ###');
    getPosts();
  });

  return (
    <Router>
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Typography
                variant='h6'
                color='inherit'
                noWrap={isMobile}
              >
                Avantica - Posts Finder
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <Grid container className={classes.root}>
              <Grid container justify={'center'}>
                <SearchInput
                // showDetailButton={handleShowDetailButton}
                // selectedIssue={handleSelectedIssue}
                // issue={selectedIssue}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Router>
  );
}

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
