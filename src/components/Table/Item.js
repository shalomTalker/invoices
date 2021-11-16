import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'

export default function Item({ columns, row, toggleItemHandler, type }) {
    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            {columns.map((column) => {
                const value = row[column.id] || "-";
                return (
                    <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                    </TableCell>
                );
            })}
            <Button onClick={() => toggleItemHandler(row)}>{type === 'results' ? `הוסף` : `הסר`}</Button>
        </TableRow>
    )
}
