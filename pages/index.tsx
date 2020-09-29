import * as React from 'react';

// Material Components
import { AppBar, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Modules
import { useDispatch } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import { SearchInput } from '../components/SearchInput';
import { PostDialog } from '../components/Dialog';
import { PostList } from '../components/PostList';

// Actions
import { GET_POSTS, SET_POST } from '@redux/actions/types';

const Index = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const [open, setOpen] = React.useState(false);
  const {
    items,
    selectedPost,
    pageNumber,
    pageInStore,
  } = useSelector<RootState, IPostState>((state) => state.posts);

  const handleClickOpen = (post: IPost | null) => {
    dispatch({ type: SET_POST, payload: post });
    setOpen(true);
  };

  const handleClose = () => {
    dispatch({ type: SET_POST, payload: null });
    setOpen(false);
  };
  console.log('53 items', items);

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
          <PostDialog onClose={handleClose} open={open} post={selectedPost} />
          <div className={classes.content}>
            <Grid container className={classes.root}>
              <Grid container justify={'center'}>
                <SearchInput
                  items={items}
                // showDetailButton={handleShowDetailButton}
                // selectedIssue={handleSelectedIssue}
                // issue={selectedIssue}
                />
                <PostList
                  handleClickOpen={handleClickOpen}
                  items={items}
                  pageNumber={pageNumber}
                  pageInStore={pageInStore}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </Router>
  );
};

Index.getInitialProps = async ({ store }: NextJSContext) => {
  store.dispatch({
    type: GET_POSTS,
  });

  return {};
};

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

export default Index;
