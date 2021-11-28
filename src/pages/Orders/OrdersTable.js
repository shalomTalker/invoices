import * as React from 'react';
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

function createData({ orderId, user: { fullName, phone }, createdAt, items, total }) {
  return {
    orderId,
    fullName,
    phone,
    total: total + (total * 17) / 100,
    createdAt,
    items,
  };
}

function Row({ row }) {
  const { orderId, fullName, phone, createdAt, total, items } = row;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const subColumns = ['מספר פריט', 'תיאור', 'מודל', 'כמות', 'מחיר יחידה', 'סה"כ'].reverse();

  const renderMainRow = () =>
    [orderId, fullName, phone, createdAt, `₪ ${total.toFixed(2)}`].reverse().map((r, i) => (
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
    <React.Fragment>
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
              <Typography variant='h6' gutterBottom component='div' textAlign='end'>
                פריטים
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>{renderSubHeadRow()}</TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align='right'>₪ {Number(item.count * item.price).toFixed(2)}</TableCell>
                      <TableCell align='right'>₪ {item.price}</TableCell>
                      <TableCell align='right'>{`יח' ${item.count}`}</TableCell>
                      <TableCell align='right'>{item.model}</TableCell>
                      <TableCell align='right'>{item.desc}</TableCell>
                      <TableCell align='right'>{item.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// propTypes = {
//   row: PropTypes.shape({
//     orderId: PropTypes.string.isRequired,
//     fullName: PropTypes.string.isRequired,
//     createdAt: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired,
//     total: PropTypes.number.isRequired,
//     items: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         model: PropTypes.string.isRequired,
//         desc: PropTypes.string.isRequired,
//         count: PropTypes.number.isRequired,
//         price: PropTypes.number.isRequired,
//       }),
//     ).isRequired,
//   }).isRequired,
// };

export default function OrdersTable({ orders }) {
  const rows = orders.map(createData);
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
          {rows.map((row) => (
            <Row key={row.orderId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
