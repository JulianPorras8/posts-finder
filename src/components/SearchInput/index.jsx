import React from 'react';

// Material Components
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Person from '@material-ui/icons/Person';

// Modules
import { useSelector } from 'react-redux';

export function SearchInput(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { isLoading } = useSelector((state) => state.posts);

  return (
    <Autocomplete
      id='asynchronous-issues'
      autoComplete={true}
      className={classes.searchControl}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(_, value, reason) => {
        if (reason === 'select-option') {
          props.onPreSelectPost(value);
        } else if (reason === 'clear') {
          props.onPreSelectPost(null);
        }
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title}
      options={props.items}
      loading={isLoading}
      renderOption={(option) => (
        <React.Fragment key={option.id}>
          <div className={classes.option}>
            <span className={classes.avatar}>
              <Avatar>
                <Person />
              </Avatar>
            </span>
          </div>
          {option.title}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Post'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    margin: theme.spacing(2),
  },
  option: {
    margin: theme.spacing(1),
  },
  avatar: {
    marginRight: theme.spacing(0.5),
  },
  searchControl: {
    marginBottom: theme.spacing(1),
    width: '100%',
  },
}));
