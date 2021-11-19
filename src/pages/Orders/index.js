import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listInvoices } from '../../graphql/queries';
import { createInvoice as createInvoiceMutation, deleteInvoice as deleteInvoiceMutation } from '../../graphql/mutations';

const initialFormState = { name: '', description: '' }

function Orders() {
    const [invoices, setInvoices] = useState([]);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchInvoices();
    }, []);

    async function fetchInvoices() {
        const apiData = await API.graphql({ query: listInvoices });
        setInvoices(apiData.data.listInvoices.items);
    }

    async function createInvoice() {
        if (!formData.name || !formData.description) return;
        await API.graphql({ query: createInvoiceMutation, variables: { input: formData } });
        setInvoices([...invoices, formData]);
        setFormData(initialFormState);
    }

    async function deleteInvoice({ id }) {
        const newInvoicesArray = invoices.filter(invoice => invoice.id !== id);
        setInvoices(newInvoicesArray);
        await API.graphql({ query: deleteInvoiceMutation, variables: { input: { id } } });
    }

    return (
        <div className="App">
            <h1>{`My Invoices App`}</h1>
            <input
                onChange={e => setFormData({ ...formData, 'name': e.target.value })}
                placeholder="Invoice name"
                value={formData.name}
            />
            <input
                onChange={e => setFormData({ ...formData, 'description': e.target.value })}
                placeholder="Invoice description"
                value={formData.description}
            />
            <button onClick={createInvoice}>Create Invoice</button>
            <div style={{ marginBottom: 30 }}>
                {
                    invoices.map(invoice => (
                        <div key={invoice.id || invoice.name}>
                            <h2>{invoice.name}</h2>
                            <p>{invoice.description}</p>
                            <button onClick={() => deleteInvoice(invoice)}>Delete invoice</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Orders;