import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

const initialFormState = { name: "", description: "" };

function Orders() {
  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {}

  async function createInvoice() {
    if (!formData.name || !formData.description) return;
  }

  async function deleteInvoice({ id }) {}

  return (
    <div className='App'>
      <h1>{`My Invoices App`}</h1>
      <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder='Invoice name' value={formData.name} />
      <input onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder='Invoice description' value={formData.description} />
      <button onClick={createInvoice}>Create Invoice</button>
      <div style={{ marginBottom: 30 }}>
        {invoices.map((invoice) => (
          <div key={invoice.id || invoice.name}>
            <h2>{invoice.name}</h2>
            <p>{invoice.description}</p>
            <button onClick={() => deleteInvoice(invoice)}>Delete invoice</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
