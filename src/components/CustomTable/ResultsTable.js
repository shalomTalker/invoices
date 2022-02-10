import { Button, Card, CardContent, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
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
];

const styles = {
  container: { width: '100%', border: '1px solid gray', backgroundColor: '#f8f9ff' },
  emptyDataContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 },
};

export default function ResultsTable({ rows }) {
  const { addItem } = useUserFormContext();

  const renderRow = (row) => {
    return (
      <Item renderPrice={() => <Typography>{row.price}</Typography>} columns={columns} row={row} key={`results-${row.id}`}>
        <Button onClick={() => addItem({ ...row, count: 1 })}>{`הוסף`}</Button>
      </Item>
    );
  };

  return (
    <Paper sx={styles.container}>
      {Boolean(!rows.length) ? (
        <Box sx={styles.emptyDataContainer}>
          <Card variant='elevation' sx={{ width: '50%', backgroundColor: 'gray' }}>
            <CardContent>
              <Typography variant='h4' component='div' align='center'>{`לא קיימות תוצאות חיפוש`}</Typography>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <CustomTable rows={rows} columns={columns} renderRow={renderRow} withPagination />
      )}
    </Paper>
  );
}
