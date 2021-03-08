import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToolbarBackend from '../toolbar/Toolbar-backend';
import userInner from '../UserInfo/userInfo';


export default function DialogSave(props) {
  const {open,handleClickOpen,handleClose}= props;
  function handling_manual_saving(){
        handleClose();
        const doc_id=document.getElementById("file_name").value;
        console.log(userInner()[0]);
        
        ToolbarBackend()[2](doc_id);
        
        
    }  
  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">File Saving</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please name your file :D
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="file_name"
            label="File name"
            type="filename"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handling_manual_saving} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
