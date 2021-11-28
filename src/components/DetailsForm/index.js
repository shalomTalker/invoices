import { Button, TextField, Typography } from '@mui/material';
import Auth from '@aws-amplify/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useFormContext } from '../../context/formContext';
import { Box } from '@mui/system';
import { postOrder } from '../../logic/api';
import { generateRandomId, getCurrentHebDate } from '../../utils.js';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  fullName: yup.string().min(2).max(50).required('חסר שם לקוח'),
  phone: yup
    .string()
    .matches(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/, 'מספר פלאפון לא תקין')
    .required('חסר מספר פלאפון'),
  email: yup.string().email('אימייל לא תקין'),
});
const inputsConfig = [
  {
    name: 'fullName',
    placeholder: `שם הלקוח`,
  },
  {
    name: 'phone',
    placeholder: `פלאפון`,
  },
  {
    name: 'email',
    placeholder: `אימייל`,
  },
];
export default function DetailsForm() {
  const navigate = useNavigate();
  const { state: formState, updateUser } = useFormContext();
  const [errors, setErrors] = useState([]);
  const validateUserField = async (obj) => {
    try {
      const data = await schema.validate(obj);
      return true;
    } catch (error) {
      console.log(error.errors);
      return false;
    }
  };
  const validateOrder = async (order) => {
    const _errors = [];
    if (!order.items.length) {
      _errors.push('לא נוספו פריטים להזמנה');
    }
    order.items.forEach((item) => {
      if (!item.price || item.price == 0) {
        _errors.push(` ${item.desc} - חסר מחיר בפריט `);
      }
    });
    const isValid = await validateUserField(order.user);
    if (!isValid) {
      _errors.push('פרטי לקוח חסרים');
    }

    setErrors(_errors);
    return _errors.length ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      user: formState.user,
      items: Object.values(formState.items).map(({ model, id, price, count, desc }) => ({ model, id, price, count: String(count), desc })),
    };
    try {
      const isValidOrder = await validateOrder(orderDetails);
      if (isValidOrder) {
        navigate('/review');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          {inputsConfig.map(({ name, placeholder }) => (
            <TextField fullWidth inputProps={{ 'aria-label': name }} key={name} id={name} name={name} placeholder={placeholder} value={formState.user[name]} onChange={(e) => updateUser({ ...formState.user, [name]: e.target.value })} />
          ))}
        </div>
        <Button sx={{ width: '33%', alignSelf: 'center', margin: 6 }} variant='contained' type='submit'>{`צור הזמנה`}</Button>
        <Box>
          {errors.map((err) => (
            <Typography key={err} variant='body1' color='red'>
              {' '}
              * {err}
            </Typography>
          ))}
        </Box>
      </form>
    </div>
  );
}
