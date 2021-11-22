import { Button, ButtonGroup } from '@mui/material';
import React from 'react';
import { useNavigate, Navigate } from 'react-router';
import RenderPdf from '../../components/RenderPdf';
import { useFormContext } from '../../context/formContext';
import { createOrder } from '../../logic/api';
import { generateRandomId, getCurrentHebDate } from '../../utils';

export default function Review(props) {
  const {
    state: { items, user, url },
  } = useFormContext();
  const navigate = useNavigate();
  console.log(url);

  const backToEdit = () => {
    navigate('/');
  };
  const approveOrder = async () => {
    const res = await createOrder({
      orderId: generateRandomId(),
      createAt: getCurrentHebDate(),
      user: user,
      items: Object.values(items).map(({ model, id, price, count, desc }) => ({ model, id, price, count: String(count), desc })),
    });
    console.log(res.data);
  };
  if (!url) {
    return <Navigate to='/' />;
  }
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
        <ButtonGroup variant='contained' color='primary' aria-label='contained primary button group'>
          <Button onClick={approveOrder} color='success'>
            אשר הזמנה
          </Button>
          <Button onClick={backToEdit} color='error'>
            חזור לעריכה
          </Button>
        </ButtonGroup>
      </div>
      <RenderPdf url={url} />
    </>
  );
}
