import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

export default function TableHeader({ columns, disableEmptyCell }) {
    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align='center'
                        style={{ minWidth: column.minWidth }}
                    >
                        {column.label}
                    </TableCell>

                ))}
                {Boolean(!disableEmptyCell) && <TableCell />}
            </TableRow>
        </TableHead>)
}


