import { Typography } from '@mui/material';
import React from 'react';

export default function SignedOut() {
  return (
    <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h6'>התנתקת מהמערכת ... אתה מועבר למסך ההתחברות</Typography>
    </div>
  );
}
