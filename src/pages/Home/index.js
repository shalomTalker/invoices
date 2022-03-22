import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import MiniSearch from '../../logic/MiniSearch';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

import Table from '../../components/CustomTable';
import { Search, SearchIconWrapper, StyledInputBase, StyledTextFieldBase } from '../../components/BaseStyled';
import { CircularProgress, FormControlLabel, Typography } from '@mui/material';
import SearchForm from '../../components/SearchForm';
import DetailsForm from '../../components/DetailsForm';
import ResultsTable from '../../components/CustomTable/ResultsTable';
import ItemsTable from '../../components/CustomTable/ItemsTable';
import { Context as UserFormContext } from '../../context/userFormContext';
import { Context as OrdersContext } from '../../context/ordersContext';
import { Context as ItemsContext } from '../../context/itemsContext';
import useCurrentUser from '../../hooks/useCurrentUser';
import AddItemForm from '../../components/AddItemForm';

export default function Home() {
  const [results, setResults] = useState([]);
  const { state: orderState, toggleFixedPrice,updateFixedPrice } = useContext(UserFormContext);

  const {
    state: { items, loading },
    fetchItems,
  } = useContext(ItemsContext);
  const {
    fetchOrders,
  } = useContext(OrdersContext);

  useEffect(() => {
    let cancel = false;
    if (!cancel) {
      fetchItems();
      fetchOrders()
    }
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <Box style={{ marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress />
          <Typography style={{ marginTop: 50, fontSize: 40 }}> ... טוען מוצרים </Typography>
        </Box>
      ) : (
        <>
          <SearchForm setResults={setResults} placeholder={`חיפוש מוצר`} items={items} fields={['desc', 'model', 'category', 'company']} />
          <section>
            <Typography style={{ margin: '16px 0 24px' }} variant='h4' component='div' align='center'>
              {`חיפוש מוצרים`}
            </Typography>
            <ResultsTable type='results' rows={results.filter((res) => !Object.keys(orderState.items).includes(res.id))} />
            <Typography style={{ margin: '16px 0 24px' }} variant='h4' component='div' align='center'>
              {`פריטים שנוספו להזמנה`}
            </Typography>
            <ItemsTable isFixedPrice={orderState.isFixedPrice} type='items' rows={Object.entries(orderState.items).map(([key, value]) => value)} />
          </section>
          <section style={{ padding: 8 }}>
            <FormControlLabel value='fixedPrice' control={<Checkbox checked={orderState.isFixedPrice} onChange={toggleFixedPrice} inputProps={{ 'aria-label': 'controlled' }} />} label='מחיר כולל' labelPlacement='start' />
              {orderState.isFixedPrice && <TextField
                onChange={(e) => {
                  updateFixedPrice(e.target.value);
                }}
                size='small'
                key={'fixedPrice'}
                id={'fixedPrice'}
                name={'fixedPrice'}
                placeholder={'מחיר כולל'} />}
          </section>
          <section style={{ padding: 8 }}>
            <Typography style={{ margin: '16px 0 24px' }} variant='h4' component='div' align='center'>
              {`פרטי לקוח`}
            </Typography>
            <DetailsForm />
          </section>
        </>
      )}
    </div>
  );
}
