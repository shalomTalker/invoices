import { Button, TextField, Typography } from '@mui/material';
import Auth from '@aws-amplify/auth';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LoadingIcon from '@mui/icons-material/HourglassEmpty';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

// import { useUserFormContext } from '../../context/userFormContext';
import { Box } from '@mui/system';
import { postOrder } from '../../logic/api';
import SelectField from '../SelectField';
import AutoCompleteSearch from '../AutoCompleateSearch';
import { categories } from './config';
import { useFormik } from 'formik';
import { Context as ItemsContext } from '../../context/itemsContext';

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
    .required('מחיר חסר'),
  btu: yup
    .string()
    .matches(/[0-9|,|.]+/g, 'BTU לא תקין')
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
      type: 'text',
    },
    {
      name: 'category',
      placeholder: `קטגוריה`,
      type: 'search',
    },
  ],
];
export default function AddItemForm() {
  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  const navigate = useNavigate();
  const { createItem } = useContext(ItemsContext);

  const formik = useFormik({
    initialValues: {
      desc: '',
      model: '',
      price: '',
      btu: '',
      company: '',
      category: 'כללי',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit({ price, btu, ...restValues }) {
    setLoading(true);
    try {
      const objValues = {
        price: parseFloat(price.replace(',', '')),
        btu: parseFloat(btu.replace(',', '')),
        ...restValues,
      };
      await createItem(objValues);
      navigate('/');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
            return type == 'text' ? (
              <TextField
                size="small"
                fullWidth
                key={name}
                id={name}
                name={name}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange} />
            ) : (
                <AutoCompleteSearch
                  defaultValue={formik.values[name]}
                  defaultChecked
                  onChange={formik.setFieldValue}
                  // value={formik.values[name]}
                  key={name}
                  name={name}
                  placeholder={placeholder}
                  options={categories} />
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
          <Button disabled={!(formik.isValid && formik.dirty)||loading} endIcon={loading ? <LoadingIcon /> : <AddBoxIcon />} sx={{ width: '33%' }} variant='contained' type='submit'>
            {loading ? `מוסיף מוצר` : `צור פריט`}
          </Button>
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
