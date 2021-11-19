import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import MiniSearch from '../../logic/MiniSearch';
const products = require('../../products.json')


const SearchForm = ({ setResults }) => {
    const formik = useFormik({
        initialValues: {
            term: '',
        },

    });
    const search = async term => {
        if (term) {
            const data = await MiniSearch(
                {
                    fields: ['desc', 'model', 'category', 'company'],
                    storeFields: Object.keys(products[0] || {}),
                },
                products,
                term,
            );
            setResults(data)

        } else {
            setResults([])

        }

    }
    useEffect(() => {
        search(formik.values.term)
    }, [formik.values.term]);


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    inputProps={{ 'aria-label': 'search' }}
                    fullWidth
                    id="term"
                    name="term"
                    placeholder={`חיפוש מוצר`}
                    value={formik.values.term}
                    onChange={formik.handleChange}
                    error={formik.touched.term && Boolean(formik.errors.term)}

                />
            </form>
        </div>
    );
}

export default SearchForm;