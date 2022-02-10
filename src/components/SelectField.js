import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

const SelectField = ({ name, placeholder, values,fullWidth, ...props }) => {

  return (
    <FormControl size='small' fullWidth >
      <InputLabel>{placeholder}</InputLabel>
      <Select {...props} id={name} name={name} placeholder={placeholder} label={placeholder} >
        {values.map(({ value, label }) => (
          <MenuItem key={value} value={value}>{label}</MenuItem>
        ))}
      </Select>
      {/* <Select  {...props} labelId={`${name}-label`} id={name} >
        {values.map(({ value, label }) => (
          <MenuItem key={value} value={value}>{label}</MenuItem>
        ))}
      </Select> */}
    </FormControl>
  );
};

export default SelectField;
