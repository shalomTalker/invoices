import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import joi from 'joi';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MiniSearch from '../../logic/MiniSearch';
import { Box } from '@mui/system';
import Table from '../../components/Table';
const products = require('../../products.json')


export default function Search() {

    const [results, setResults] = useState([])
    const [items, setItems] = useState([])

    const formik = useFormik({
        initialValues: {
            term: '',
        },

        onSubmit: async (values) => {

        },
    });
    const search = async term => {
        const data = await MiniSearch(
            {
                fields: ['desc', 'model', 'category', 'company'],
                storeFields: Object.keys(products[0] || {}),
            },
            products,
            term,
        );
        console.log(data);
        setResults(data)

    }
    useEffect(() => {
        if (formik.values.term) search(formik.values.term)
    }, [formik.values.term]);

    const addItemHandler = (itemObj) => {
        setItems([...items, itemObj])
    }
    const removeItemHandler = (itemObj) => {

        setItems(items.filter(item => item.id !== itemObj.id))
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="term"
                    name="term"
                    label="Search For Product"
                    value={formik.values.term}
                    onChange={formik.handleChange}
                    error={formik.touched.term && Boolean(formik.errors.term)}
                    helperText={formik.touched.term && formik.errors.term}
                />
            </form>
            {Boolean(results.length) && <Table type="results" rows={results.filter(res => !items.map(result => result.id).includes(res.id))} toggleItemHandler={addItemHandler} />}
            {Boolean(items.length) && <Table type="items" rows={items} toggleItemHandler={removeItemHandler} />}
        </div>
    );
};

