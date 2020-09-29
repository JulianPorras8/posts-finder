import * as React from 'react';

// Material Components
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TextField from '@material-ui/core/TextField';

// Modules
import { useSelector } from 'react-redux';
import map from 'lodash/map';

interface Props {
  items: IPost[];
  selectedIssue?: (issue: any | null) => void;
  showDetailButton?: (value: boolean) => void;
}

export function SearchInput(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { isLoading } = useSelector<RootState, IPostState>((state) => state.posts);

  return (
    <Autocomplete
      id='asynchronous-issues'
      autoComplete={true}
      className={classes.searchControl}
      open={open}
      onOpen={() => {
        setOpen(true);
        // props.showDetailButton(false);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(_, value: any | null, reason: string) => {
        // props.selectedIssue(value);
        if (reason === 'select-option') {
          // props.showDetailButton(true);
        } else if (reason === 'clear') {
          // props.showDetailButton(false);
        }
      }}
      getOptionSelected={(option, value) => option.databaseId === value.databaseId}
      getOptionLabel={(option) => option.title}
      options={props.items}
      loading={isLoading}
      renderOption={(option) => (
        <React.Fragment key={option.databaseId}>
          <span>
            {option.state === 'OPEN' && <ErrorOutlineIcon style={{ color: '#28a745' }} />}
            {option.state === 'CLOSED' && <HighlightOffIcon style={{ color: '#cb2431' }} />}
          </span>
          {option.title}
          <span>
            {map(option.labels, (label, index) => {
              return (
                <Chip key={index}
                  label={label.name}
                  className={classes.chip}
                />
              );
            })}
          </span>
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Issue'
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

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    margin: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  searchControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
}));
