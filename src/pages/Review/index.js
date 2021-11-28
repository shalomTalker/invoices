import { Button, ButtonGroup, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useNavigate, Navigate } from 'react-router';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import RenderPdf from './RenderPdf';
import { useFormContext } from '../../context/formContext';
import { postOrder } from '../../logic/api';
import { generateRandomId, getCurrentHebDate } from '../../utils';
import RenderHtml from './RenderHtml';
import { useReactToPrint } from 'react-to-print';
import { useOrdersContext } from '../../context/ordersContext';
import { useItemsContext } from '../../context/itemsContext';
import ChangesWarning from './ChangesWarning';

import useCurrentUser from '../../hooks/useCurrentUser';

export default function Review() {
  const {
    state: { items, user, orderId, createdAt },
    cleanForm,
  } = useFormContext();

  const {
    state: { items: itemsState },
    updateChanges,
  } = useItemsContext();

  const currentUser = useCurrentUser();

  let total = 0;
  const _items = Object.values(items).map(({ model, id, price, count, desc }) => {
    total += count * price;
    return { model, id, price, count: String(count), desc };
  });

  const body = {
    user,
    items: _items,
    orderId,
    createdAt,
    total,
    createdBy: currentUser.email,
  };

  let priceListObj = {};
  let priceChanges = [];

  itemsState.forEach((item) => {
    priceListObj[item.id] = item.price;
  });

  _items.forEach((orderItem) => {
    let newPrice = orderItem.price;
    let oldPrice = priceListObj[orderItem.id];

    if (newPrice != oldPrice) {
      priceChanges.push({ newPrice, oldPrice, desc: orderItem.desc, id: orderItem.id });
    }
  });

  const { addOrder } = useOrdersContext();
  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    documentTitle: `${user.fullName}_${orderId}`,
    content: () => componentRef.current,
  });

  const backToEdit = () => {
    navigate('/');
  };
  const approveOrder = async () => {
    handlePrint();
    navigate('/orders');
    await addOrder(body);
    if (priceChanges.length) {
      await updateChanges(priceChanges);
    }
    cleanForm();
  };
  return Boolean(body.items.length) ? (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 15 }}>
      <ChangesWarning priceChanges={priceChanges} />
      <ButtonGroup variant='contained' aria-label='contained primary button group'>
        <Button onClick={approveOrder} color='primary' startIcon={<CheckRoundedIcon style={{ fontSize: '25px', fontWeight: 'bolder' }} />}>
          אשר הזמנה
        </Button>
        <Button onClick={backToEdit} style={{ backgroundColor: 'gray' }} startIcon={<EditRoundedIcon />}>
          חזור לעריכה
        </Button>
      </ButtonGroup>

      <div style={{ border: '1px solid lightgray', borderRadius: '8px', marginTop: 15, width: '100%' }}>
        <RenderHtml body={body} ref={componentRef} />
      </div>
    </div>
  ) : (
    <Navigate to='/' />
  );
}
