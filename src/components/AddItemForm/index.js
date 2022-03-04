import { Button, TextField, Typography } from '@mui/material';
import Auth from '@aws-amplify/auth';
import * as yup from 'yup';
import React, { useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

// import { useUserFormContext } from '../../context/userFormContext';
import { Box } from '@mui/system';
import { postOrder } from '../../logic/api';
import { generateRandomId, getCurrentHebDate } from '../../utils.js';
import SelectField from '../SelectField';
import AutoCompleteSearch from '../AutoCompleateSearch';
import { categories } from './config';
import { useFormik } from 'formik';
import { useItemsContext } from '../../context/itemsContext';

const useStyles = makeStyles({
  container: {},
  form: {
    margin: '0px 30px',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
  },
});

const validationSchema = yup.object().shape({
  desc: yup.string().min(2, 'תיאור לא תקין').required('חסר תיאור מוצר'),
  model: yup
    .string()
    .matches(/[a-zA-Z0-9]+/g, 'דגם לא תקין')
    .required('חסר דגם'),
  price: yup
    .string()
    .matches(/[0-9]+/g, 'מחיר לא תקין')
    .transform((value) => parseFloat(value.replace(',', '')).toLocaleString('en'))
    .required('מחיר חסר'),
  btu: yup
    .string()
    .matches(/[0-9|,|.]+/g, 'BTU לא תקין')
    .transform((value) => parseFloat(value.replace(',', '')).toLocaleString('en'))
    .required('BTU חסר'),
  company: yup.string().required('אנא בחר יצרן'),
  category: yup.string().required('אנא בחר קטגוריה מתאימה'),
});
const inputsConfig = [
  [
    {
      name: 'desc',
      placeholder: `תיאור המוצר`,
    },
    {
      name: 'model',
      placeholder: `דגם`,
    },
    {
      name: 'price',
      placeholder: `מחיר`,
    },
    {
      name: 'btu',
      placeholder: `BTU`,
    },
  ],
  [
    {
      name: 'company',
      placeholder: `שם החברה`,
      type: 'select',
    },
    {
      name: 'category',
      placeholder: `קטגוריה`,
      type: 'search',
    },
  ],
];
export default function AddItemForm() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { createItem } = useItemsContext();

  const formik = useFormik({
    initialValues: {
      desc: '',
      model: '',
      price: '',
      btu: '',
      company: '',
      category: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    try {
      await createItem(values)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const [textInputs, otherInputs] = inputsConfig;
  return (
    <div>
      <Box onSubmit={formik.handleSubmit} component='form' sx={[styles.form]}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            '& .MuiTextField-root': {
              m: 0.5,
              width: '25%',
            },
          }}
        >
          {textInputs.map(({ name, placeholder }) => (
            <TextField size='small' fullWidth key={name} id={name} name={name} placeholder={placeholder} value={formik.values[name]} onChange={formik.handleChange} />
          ))}
        </Box>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            '& .MuiTextField-root': {
              marginInline: 1,
              // paddingInline: 4,
              // width: '100%',
            },
          }}
        >
          {otherInputs.map(({ name, placeholder, type }) => {
            return type == 'select' ? (
              <SelectField
                onChange={formik.handleChange}
                value={formik.values[name]}
                key={name}
                fullWidth
                name={name}
                placeholder={placeholder}
                values={[
                  {
                    value: 'Tadiran',
                    label: 'Tadiran',
                  },
                  {
                    value: 'Toshiba',
                    label: 'Toshiba',
                  },
                  {
                    value: 'Electra',
                    label: 'Electra',
                  },
                ]}
              />
            ) : (
              <AutoCompleteSearch onChange={formik.setFieldValue} value={formik.values[name]} key={name} name={name} placeholder={placeholder} options={categories} />
            );
          })}
        </Box>
        
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            '& .MuiTextField-root': {
              m: 0.5,
              width: '50%',
            },
          }}
        >
          <Button disabled={!(formik.isValid && formik.dirty)} endIcon={<AddBoxIcon />} sx={{ width: '33%' }} variant='contained' type='submit'>{`צור פריט`}</Button>
        </Box>
      </Box>
      <Box>
        {Object.entries(formik.errors).map(([key, err]) => {
          console.log(key);
          return (
            <Typography key={err} variant='body1' color='red'>
              {' '}
              * {err}
            </Typography>
          );
        })}
      </Box>
    </div>
  );
}
