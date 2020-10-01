import React, { useEffect } from 'react';

// Material Components
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

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
      clearOnEscape={true}
      handleHomeEndKeys={true}
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
      filterOptions={(options, state) => {
        if (!state.inputValue) {
          options = options.slice(0, 10);
        } else {
          options = options.filter((option) => option.title.indexOf(state.inputValue) > -1);
          options = options.length > 10 ? options.slice(0, 10) : options;
        }
        return options;
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title}
      options={props.items}
      loading={isLoading}
      renderOption={(option) => (
        <React.Fragment key={option.id}>
          <div className={classes.option}>
            {option.title}
          </div>
        </React.Fragment>
      )}
      renderInput={(params) => <TextField {...params} label="Post" variant="outlined" />}
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
  searchControl: {
    marginBottom: theme.spacing(1),
    width: '100%',
  },
}));
