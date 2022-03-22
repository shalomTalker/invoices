//
//       

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import LoadingIcon from '@mui/icons-material/HourglassEmpty';


import ChangesWarning from './ChangesWarning';

export default function ChangesAlertButton({ children, onApprove, priceChanges,loading }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = (bool) =>{
    onApprove(bool)
    handleClose()
  }



  return (
    <div>
      <Button 
      disabled={loading}
      color='primary' 
      startIcon={loading?<LoadingIcon />:<CheckRoundedIcon style={{ fontSize: '25px', fontWeight: 'bolder' }} />} 
      onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'><ChangesWarning priceChanges={priceChanges} /></DialogContentText>
        </DialogContent>
        <DialogActions style={{display:'flex',justifyContent:'center'}}>
          <Button disabled={loading} style={{width:'33%'}} variant='outlined' onClick={()=>handleChanges(false)}>אל תכלול שינויים</Button>
          <Button disabled={loading} style={{width:'33%'}} onClick={()=>handleChanges(true)} autoFocus>
            כלול שינויים
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
