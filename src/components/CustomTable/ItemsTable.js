import { Button, ButtonGroup, Card, CardContent, Input, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import CustomTable from '.';
import { useUserFormContext } from '../../context/userFormContext';
import Item from './Item';

const columns = [
  { id: 'desc', label: 'תיאור', minWidth: 100 },
  { id: 'model', label: 'מודל', minWidth: 100 },
  { id: 'btu', label: 'BTU/H', minWidth: 100 },
  { id: 'category', label: 'קטגוריה', minWidth: 120 },
  { id: 'company', label: 'חברה', minWidth: 100 },
  { id: 'price', label: 'מחיר', minWidth: 100 },
  { id: 'count', label: 'יחידות', minWidth: 120 },
  { id: 'totalCount', label: 'מחיר כולל', minWidth: 100 },
];

const styles = {
  container: { width: '100%', border: '1px solid gray', overflow: 'hidden', backgroundColor: '#f8f9ff' },
  emptyDataContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 },
};

const Row = ({ item }) => {
  const { state, removeItem, updateItem } = useUserFormContext();

  const countHandler = (value) => {
    if (value == 0) {
      removeItem(item);
      return;
    }
    updateItem({ ...item, count: Number(value) });
  };

  const count = state.items[item.id].count;
  return (
    <Item
      noExtraHeaderCell
      columns={columns}
      row={item}
      renderCounter={() => (
        <ButtonGroup size='small' aria-label={`small outlined button group`}>
          <Button
            disabled={!count}
            onClick={(e) => {
              countHandler(count - 1);
            }}>
            -
          </Button>
          <Button disabled>{count}</Button>
          <Button
            onClick={() => {
              countHandler(count + 1);
            }}>
            +
          </Button>
        </ButtonGroup>
      )}
      renderPrice={() => (
        <TextField
          id={`${item.model}-price`}
          placeholder='מחיר'
          defaultValue={item.price}
          onChange={(e) => {
            updateItem({ ...item, price: e.target.value });
          }}
        />
      )}
    />
  );
};

export default function ItemsTable({ rows }) {

  return (
    <Paper sx={styles.container}>
      {Boolean(!rows.length) ? (
        <Box sx={styles.emptyDataContainer}>
          <Card variant='elevation' sx={{ width: '50%', backgroundColor: 'gray' }}>
            <CardContent>
              <Typography variant='h4' component='div' align='center'>{`לא נוספו פריטים לרשימה`}</Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <CustomTable rows={rows.map((r) => ({ ...r, totalCount: `${r.count * r.price} ₪` }))} columns={columns} renderRow={(row) => <Row key={row.id} item={row} />} disableEmptyCell={true} />
      )}
    </Paper>
  );
}
