import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { Context as ItemsContext } from '../../context/itemsContext';
import MiniSearch from '../../logic/MiniSearch';

const SearchForm = ({ setResults, placeholder,items,fields,returnDefaultItems=false }) => {
  // const {
  //   state: { items },
  // } = useContext(ItemsContext);

  const formik = useFormik({
    initialValues: {
      term: '',
    },
  });
  const search = async (term) => {
    if (term ) {
      const data = await MiniSearch(
        {
          fields,
          storeFields: Object.keys(items[0] || {}),
        },
        items,
        term,
      );
      setResults(data);
    } else {
      if (returnDefaultItems) {
        setResults(items);
        
      } else {
        setResults([]);
        
      }
    }
  };
  useEffect(() => {
    search(formik.values.term);
    return () => {
      setResults([]);
    };
  }, [formik.values.term]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField fullWidth id='term' name='term' placeholder={placeholder} value={formik.values.term} onChange={formik.handleChange} error={formik.touched.term && Boolean(formik.errors.term)} />
      </form>
    </div>
  );
};

export default SearchForm;
