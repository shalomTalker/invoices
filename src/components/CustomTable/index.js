import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHeader from './TableHeader';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 300,
  },
};

export default function CustomTable({ columns, renderRow, rows, disableEmptyCell, withPagination }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const _rows = withPagination ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows;
  return (
    <Paper sx={styles.container}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHeader columns={columns} disableEmptyCell={disableEmptyCell} />
          <TableBody>{_rows.map(renderRow)}</TableBody>
        </Table>
        {withPagination && <TablePagination rowsPerPageOptions={[10, 25, 100]} component='div' count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />}
      </TableContainer>
    </Paper>
  );
}
