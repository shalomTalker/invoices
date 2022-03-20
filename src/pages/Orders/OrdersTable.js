import {useContext,useState,Fragment} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router';

import { formatToHebDate } from '../../utils';


function Row({ row }) {
  const { orderId, fullName, phone, createdAt, total, items, createdBy,isFixedPrice } = row;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const subColumns = (isFixedPrice?['מספר פריט', 'תיאור', 'מודל', 'כמות']:['מספר פריט', 'תיאור', 'מודל', 'כמות', 'מחיר יחידה', 'סה"כ']).reverse();

  const renderMainRow = () =>
    [orderId, fullName, phone, formatToHebDate(createdAt), `₪ ${Number(total).toLocaleString('en')}`].reverse().map((r, i) => (
      <TableCell key={i.toString()} component='th' scope='row' align='right'>
        {r}
      </TableCell>
    ));

  const renderSubHeadRow = () => {
    return subColumns.map((l) => (
      <TableCell key={l} align='right'>
        {l}
      </TableCell>
    ));
  };

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, backgroundColor: '#f8f9fa' }}>
        <TableCell component='th' scope='row' align='right'>
          <IconButton aria-label='open in new tab' size='small' onClick={() => navigate(`/orders/${orderId}`)}>
            <OpenInNewIcon />
          </IconButton>
        </TableCell>
        {renderMainRow()}
        <TableCell component='th' scope='row' align='right'>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom fontSize={25} textAlign='end'>
                פריטים
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>{renderSubHeadRow()}</TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      {!isFixedPrice &&
                      <>
                        <TableCell align='right'>₪ {Number(item.count * item.price).toLocaleString('en')}</TableCell>
                        <TableCell align='right'>₪ {item.price}</TableCell>
                      </>
                      }
                      <TableCell align='right'>{`יח' ${item.count}`}</TableCell>
                      <TableCell align='right'>{item.model}</TableCell>
                      <TableCell align='right'>{item.desc}</TableCell>
                      <TableCell align='right'>{item.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography sx={{ direction: 'rtl' }}>{`החשבונית נוצרה על ידי : ${createdBy}`}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function OrdersTable({ orders }) {

  const rows = orders.map(({ orderId, user: { fullName, phone }, createdAt, items, total, createdBy ,isFixedPrice}) => {
      return {
        orderId,
        fullName,
        phone,
        total: Number(total) + Number(total * 17) / 100,
        createdAt,
        items,
        createdBy,
        isFixedPrice
      };
  });
  const mainColumns = ['', 'מספר הזמנה', 'שם לקוח', 'פלאפון', 'נוצר בתאריך', 'סכום כולל מע"מ', ''].reverse();

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            {mainColumns.map((col, i) =>
              col ? (
                <TableCell key={i.toString()} align='right'>
                  {col}
                </TableCell>
              ) : (
                <TableCell key={i.toString()} align='right' />
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((row) => (
              <Row key={row.orderId} row={row} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
