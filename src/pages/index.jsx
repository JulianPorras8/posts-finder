import React from 'react';

// Material Components
import { AppBar, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Modules
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import { SearchInput } from '../components/SearchInput';
import { PostDialog } from '../components/Dialog';
import { PostList } from '../components/PostList';

// Actions
import { GET_POSTS, SET_POST, CLOSE_ERROR, SET_PRESELECTED_POST } from '../actions/types';

const Index = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('sm')
  );

  const [open, setOpen] = React.useState(false);

  const {
    items,
    selectedPost,
    pageNumber,
    error,
    preSelectedPost,
  } = useSelector((state) => state.posts);

  const handleErrorClose = () => {
    dispatch({ type: CLOSE_ERROR });
  };

  const handleClickOpen = (post) => {
    dispatch({ type: SET_POST, payload: post });
    setOpen(true);
  };

  const handleClose = () => {
    dispatch({ type: SET_POST, payload: null });
    setOpen(false);
  };

  const onPreSelectPost = (post) => {
    dispatch({ type: SET_PRESELECTED_POST, payload: post });
  };

  return (
    <Router>
      <div className={classes.root}>
        <PostDialog onClose={handleClose} open={open} post={selectedPost} />
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
            <Grid container className={classes.pageContent}>
              <Grid container justify={'center'}>
                <Grid item md={6}>
                  <Grid container justify={'center'}>
                    <Grid item xs={12}>
                      <SearchInput
                        items={items}
                        onPreSelectPost={onPreSelectPost}
                      />
                    </Grid>
                  </Grid>
                  <PostList
                    onClickOpen={handleClickOpen}
                    items={items}
                    pageNumber={pageNumber}
                    preSelectedPost={preSelectedPost}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleErrorClose}>
          <Alert onClose={handleErrorClose} severity='error'>
            {error}
          </Alert>
        </Snackbar>
      </div>
    </Router>
  );
};

/* istanbul ignore next */
Index.getInitialProps = async ({ store }) => {
  store.dispatch({
    type: GET_POSTS,
  });

  return {};
};

const useStyles = makeStyles((theme) => ({
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
  pageContent: {
    padding: 20,
    [theme.breakpoints.down('md')]: {
      paddingTop: 50,
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
}));

export default Index;
