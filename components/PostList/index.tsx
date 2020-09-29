import * as React from 'react';

// Material components
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Person from '@material-ui/icons/Person';
import Visibility from '@material-ui/icons/Visibility';

// Modules
import map from 'lodash/map';

interface Props {
  handleClickOpen: (IPost: IPost) => void;
  items: IPost[];
  pageNumber: number;
  pageInStore: number[];
}

const filterPosts = (pageNumber: number, postsPerPage, items: IPost[]) => {
  const start = (pageNumber - 1) * postsPerPage;
  const end = start + postsPerPage;
  return items.slice(start, end);
};

export function PostList(props: Props) {
  const classes = useStyles();
  console.log('35 props.items', props.items.length);
  const posts = filterPosts(props.pageNumber, 5, props.items);
  console.log('37 posts', posts.length);
  if (props.pageInStore.indexOf(props.pageNumber) === -1) {
    
  }

  return (
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
              <IconButton edge='end' aria-label='delete' onClick={() => props.handleClickOpen(item)}>
                <Visibility />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component='li' />
        </div>
      ))}
    </List>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
