import React, { useEffect } from 'react';

// Material components
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Person from '@material-ui/icons/Person';
import Edit from '@material-ui/icons/Edit';
import Pagination from '@material-ui/lab/Pagination';

// Modules
import map from 'lodash/map';
import { useDispatch } from 'react-redux';

// Actions
import { SET_PRESELECTED_POST } from '../../actions/types';
import { updatePageNumber } from '../../actions/postsAction';

// Constants
const LIMIT = 10;

const filterPosts = (pageNumber, postsPerPage, items) => {
  const start = (pageNumber - 1) * postsPerPage;
  const end = start + postsPerPage;
  return items.slice(start, end);
};

export const PostList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let posts = filterPosts(props.pageNumber, LIMIT, props.items);
  if (props.preSelectedPost) {
    posts = [props.preSelectedPost];
  }

  const pageChange = (_, value) => {
    dispatch(updatePageNumber(value));
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      dispatch({ type: SET_PRESELECTED_POST, payload: null });
    };
  });

  return (
    <Grid container justify={'center'}>
      <Grid container justify={'center'}>
        <List className={classes.list}>
          {map(posts, (item, index) => (
            <div key={index}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={item.body}
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='delete' onClick={() => props.onClickOpen(item)}>
                    <Edit />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider component='li' />
            </div>
          ))}
        </List>
      </Grid>
      <Grid container justify={'center'} item md={8} sm={12}>
        {!props.preSelectedPost &&
          <Pagination
            count={Math.ceil(props.items.length / LIMIT)}
            page={props.pageNumber} color='primary'
            onChange={pageChange}
          />}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
