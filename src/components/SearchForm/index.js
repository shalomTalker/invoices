import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useItemsContext } from '../../context/itemsContext';
import MiniSearch from '../../logic/MiniSearch';

const SearchForm = ({ setResults }) => {
  const {
    state: { items, loading },
  } = useItemsContext();

  const formik = useFormik({
    initialValues: {
      term: '',
    },
  });
  const search = async (term) => {
    if (term && !loading) {
      const data = await MiniSearch(
        {
          fields: ['desc', 'model', 'category', 'company'],
          storeFields: Object.keys(items[0] || {}),
        },
        items,
        term,
      );
      setResults(data);
    } else {
      setResults([]);
    }
  };
  useEffect(() => {
    search(formik.values.term);
  }, [formik.values.term]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField inputProps={{ 'aria-label': 'search' }} fullWidth id='term' name='term' placeholder={`חיפוש מוצר`} value={formik.values.term} onChange={formik.handleChange} error={formik.touched.term && Boolean(formik.errors.term)} />
      </form>
    </div>
  );
};

export default SearchForm;
