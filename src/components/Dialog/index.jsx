import React from 'react';

// Material Components
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

// Modules
import { useDispatch } from 'react-redux';

// Actions
import { UPDATE_BODY, UPDATE_TITLE, NEW_POST } from '../../actions/types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function PostDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  if (!props.post) {
    return null;
  }
  const onTitleChange = (post, title) => {
    dispatch({
      type: UPDATE_TITLE,
      payload: { ...post, title },
    });
  };

  const onBodyChange = (post, body) => {
    dispatch({
      type: UPDATE_BODY,
      payload: { ...post, body },
    });
  };

  const onSave = () => {
    dispatch({
      type: NEW_POST,
      payload: props.post,
    });
    props.onClose();
  };
  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        onClose={props.onClose}
        aria-labelledby='form-dialog-title'
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id='form-dialog-title'>Post # {props.post.id}</DialogTitle>
        <DialogContent>
          <TextField
            id='standard-full-width'
            label='Title'
            placeholder='ej: loremp ipsum'
            fullWidth
            value={props.post.title}
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => onTitleChange(props.post, e.target.value)}
          />
          <TextField
            id='standard-textarea'
            label='Body'
            fullWidth
            placeholder='ej: large loremp ipsum'
            multiline
            value={props.post.body}
            onChange={(e) => onBodyChange(props.post, e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            size='small'
            className={classes.saveButton}
            startIcon={<SaveIcon />}
            onClick={() => { onSave() }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  saveButton: {
    margin: theme.spacing(1),
  },
}));
