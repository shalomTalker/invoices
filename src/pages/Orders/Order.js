import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { Navigate, useParams } from 'react-router';
import IconButton from '@mui/material/IconButton';
import PrintIcon from '@mui/icons-material/Print';

import { useOrdersContext } from '../../context/ordersContext';
import RenderHtml from '../Review/RenderHtml';
import { useReactToPrint } from 'react-to-print';
export default function Order() {
  let { orderId } = useParams();
  const {
    state: { orders },
  } = useOrdersContext();

  const order = orders.find((o) => o.orderId == orderId);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: `${order?.user.fullName}_${orderId}`,
    content: () => componentRef.current,
  });

  if (order) {
    return (
      <div style={{ marginTop: '16px' }}>
        <Button aria-label='print' color='primary' onClick={handlePrint} variant='contained' startIcon={<PrintIcon sx={{ fontSize: '50px' }} />}>
          הדפס שוב
        </Button>
        <div style={{ border: '1px solid lightgray', borderRadius: '8px', marginTop: 15, width: '100%' }}>
          <RenderHtml ref={componentRef} body={order} />
        </div>
      </div>
    );
  } else {
    return <Navigate to='/orders' />;
  }
}
