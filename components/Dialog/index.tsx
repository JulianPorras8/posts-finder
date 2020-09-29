import * as React from 'react';

// Material Components
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
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
import { UPDATE_BODY, UPDATE_TITLE, NEW_POST } from '../../redux/actions/types';

interface Props {
  post: IPost | null;
  open: boolean;
  onClose: () => void;
}

// tslint:disable-next-line: no-shadowed-variable
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export function PostDialog(props: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  if (!props.post) {
    return null;
  }
  console.log('43 post', props.post);
  const onTitleChange = (post: IPost, title: string) => {
    dispatch({
      type: UPDATE_TITLE,
      payload: { ...post, title },
    });
  };

  const onBodyChange = (post: IPost, body: string) => {
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
            onClick={onSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  saveButton: {
    margin: theme.spacing(1),
  },
}));
