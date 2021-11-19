import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'

export default function Item({ columns, row, children, noExtraHeaderCell, renderCounter, renderPrice }) {

    const renderCell = (columnId, defaultValue) => {
        switch (columnId) {
            case 'count':

                return renderCounter()
            case 'price':
                return renderPrice()


            default:
                return defaultValue
        }
    }
    return (
        <TableRow hover role="checkbox" >
            {columns.map((column) => {
                const value = row[column.id] || "-";

                return (
                    <TableCell key={column.id} align='center'>
                        {renderCell(column.id, value)}
                    </TableCell>
                )
            })}
            {!noExtraHeaderCell && <TableCell key={'actions'} align='center' >
                {children}

            </TableCell>}
        </TableRow>
    )
}
