import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MiniSearch from '../../logic/MiniSearch';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';

import Table from '../../components/CustomTable';
import { Search, SearchIconWrapper, StyledInputBase, StyledTextFieldBase } from '../../components/BaseStyled';
import { useUserFormContext } from '../../context/userFormContext';
import { Typography } from '@mui/material';
import SearchForm from '../../components/SearchForm';
import DetailsForm from '../../components/DetailsForm';
import ResultsTable from '../../components/CustomTable/ResultsTable';
import ItemsTable from '../../components/CustomTable/ItemsTable';
import { useOrdersContext } from '../../context/ordersContext';
import { useItemsContext } from '../../context/itemsContext';
import useCurrentUser from '../../hooks/useCurrentUser';
import AddItemForm from '../../components/AddItemForm';

export default function Home() {
  const [results, setResults] = useState([]);
  const { state: orderState } = useUserFormContext();

  const {
    state: { orders },
    fetchOrders,
  } = useOrdersContext();

  const {
    state: { items },
    fetchItems,
  } = useItemsContext();

  const currentUserEmail = useCurrentUser();

  useEffect(() => {
    fetchOrders();
    fetchItems();
  }, []);

  return (
    <div>
      <SearchForm setResults={setResults} placeholder={`חיפוש מוצר`} />
      <section>
        <Typography style={{ margin: '16px 0 24px' }} variant='h4' component='div' align='center'>
          {`חיפוש מוצרים`}
        </Typography>
        <ResultsTable type='results' rows={results.filter((res) => !Object.keys(orderState.items).includes(res.id))} />
        <Typography style={{ margin: '16px 0 24px' }} variant='h4' component='div' align='center'>
          {`פריטים שנוספו להזמנה`}
        </Typography>
        <ItemsTable type='items' rows={Object.entries(orderState.items).map(([key, value]) => value)} />
      </section>
      <section style={{ padding: 8 }}>
        <Typography style={{ margin: '16px 0 24px' }} variant='h4' component='div' align='center'>
          {`פרטי לקוח`}
        </Typography>
        <DetailsForm />
      </section>
    </div>
  );
}
