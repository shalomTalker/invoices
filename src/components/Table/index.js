import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHeader from './TableHeader';
import Item from './Item';

const columns = [
    { id: 'desc', label: 'תיאור', minWidth: 170 },
    { id: 'model', label: 'מודל', minWidth: 100 },
    { id: 'btu', label: 'BTU/H', minWidth: 170, },
    { id: 'category', label: 'קטגוריה', minWidth: 170, },
    { id: 'notes', label: 'הערות', minWidth: 170, },
    { id: 'company', label: 'חברה', minWidth: 170, },
];



export default function CustomTable({ rows, toggleItemHandler, type }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHeader columns={columns} />
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <Item columns={columns} row={row} key={row.id} type={type} toggleItemHandler={toggleItemHandler} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
