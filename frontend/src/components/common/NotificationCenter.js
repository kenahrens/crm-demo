import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { removeNotification } from '../../store/slices/uiSlice';

const NotificationCenter = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.ui);

  const handleClose = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration || 4000}
          onClose={() => handleClose(notification.id)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{ mb: notifications.indexOf(notification) * 8 }}
        >
          <Alert
            severity={notification.type || 'info'}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={() => handleClose(notification.id)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default NotificationCenter; 