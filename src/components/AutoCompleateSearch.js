import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoCompleteSearch({ options, placeholder, name, value, ...props }) {
  return (
    <Autocomplete
      {...props}
      fullWidth
      size='small'
      onChange={(e) => {
        console.log(e)
        props.onChange(name,e.target.textContent);
      }}
      id={name}
      name={name}
      disablePortal
      options={options}
      renderInput={(params) => <TextField {...params}  placeholder={placeholder} />}
    />
  );
}
