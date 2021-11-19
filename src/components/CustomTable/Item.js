import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react'

export default function Item({ columns, row, children, noExtraHeaderCell }) {

    return (
        <TableRow hover role="checkbox" >
            {columns.map((column) => {
                const value = row[column.id] || "-";

                return (
                    <TableCell key={column.id} align='center'>
                        {column.id != 'count' ? value : children}
                    </TableCell>
                )
            })}
            {!noExtraHeaderCell && <TableCell key={'actions'} align='center' >
                {children}

            </TableCell>}
        </TableRow>
    )
}
