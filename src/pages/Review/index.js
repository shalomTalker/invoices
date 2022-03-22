import { Button, ButtonGroup, Typography } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import LoadingIcon from '@mui/icons-material/HourglassEmpty';


import RenderPdf from './RenderPdf';
import { postOrder } from '../../logic/api';
import RenderHtml from './RenderHtml';
import { useReactToPrint } from 'react-to-print';
import { Context as UserFormContext } from '../../context/userFormContext';
import { Context as OrdersContext } from '../../context/ordersContext';
import { Context as ItemsContext } from '../../context/itemsContext';

import useCurrentUser from '../../hooks/useCurrentUser';
import ChangesAlertButton from './ChangesAlertButton';

export default function Review() {
  const {
    state: { items, user, orderId, createdAt, fixedPrice, isFixedPrice },
    cleanForm,
  } = useContext(UserFormContext);

  const {
    state: { items: itemsState },
    updateChanges,
  } = useContext(ItemsContext);

  const { addOrder } = useContext(OrdersContext);

  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const componentRef = useRef();
  const [notes, setNotes] = useState(`פירוט ההתקנה\nחיבורי צנרת, חיבורי יחידות, הספקת תעלות גמישות ומרכזיות ליחידות, תריסי אוויר חוזר, אביזרי צנרת,הלחמות צנרת גז והחזקה בלחץ קבועה, הפעלה מבוקרת בנוכחות נציג היבואן.\n\nהמחיר לא כולל\nעבודות והכנות ניקוז, חשמל, נקודות תרמוסטט תיקון גבס ואיטום מעברים.\n\nתוספות\nעבודות מנוף מרים משא 350 ₪ לא כולל מע"מ מנוף זרוע 2500 ₪ לא כולל מע"מ.`);

  const handlePrint = useReactToPrint({
    documentTitle: `${user.fullName}_${orderId}`,
    content: () => componentRef.current,
  });

  const [editable, setEditable] = useState(true);
  const [loading, setLoading] = useState(false);

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
    total: isFixedPrice ? fixedPrice : total,
    createdBy: currentUser.email,
    notes,
    isFixedPrice,
    fixedPrice,
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

  const backToEdit = () => {
    navigate('/');
  };
  const approveOrder = async (isUpdateChanges) => {
    setLoading(true)
    setEditable(false);
    setTimeout(async () => {
      try {
        await addOrder(body);
        if (priceChanges.length && isUpdateChanges) {
          await updateChanges(priceChanges);
        }
        handlePrint();
        navigate('/orders');
        cleanForm();
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }, 2000);
  };
  return Boolean(body.items.length) ? (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 15 }}>
      <ButtonGroup variant='contained' aria-label='contained primary button group'>
        {Boolean(priceChanges.length) ? (
          <ChangesAlertButton loading={loading} onApprove={approveOrder} priceChanges={priceChanges}>
          {loading ? `מוסיף הזמנה...` : `אשר הזמנה`}
          </ChangesAlertButton>
        ) : (
          <Button 
          onClick={() => approveOrder(false)} 
          color='primary'
          disabled={loading} 
          endIcon={loading ? <LoadingIcon /> : <CheckRoundedIcon style={{ fontSize: '25px', fontWeight: 'bolder' }} />} sx={{ width: '33%' }} variant='contained' 
          type='submit'>
            {loading ? `מוסיף הזמנה...` : `אשר הזמנה`}
          </Button>
        )}
        <Button disabled={loading} onClick={backToEdit} style={{ backgroundColor: 'gray' }} startIcon={<EditRoundedIcon />}>
          חזור לעריכה
        </Button>
      </ButtonGroup>

      <div style={{ border: '1px solid lightgray', borderRadius: '8px', marginTop: 15, width: '100%' }}>{currentUser.email && <RenderHtml body={body} ref={componentRef} setNotes={setNotes} editable={editable} userEmail={currentUser.email} />}</div>
    </div>
  ) : (
    <Navigate to='/' />
  );
}
