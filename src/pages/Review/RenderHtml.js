import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const TAX_RATE = 0.07;

const styles = {
  container: { padding: '20px 50px', width: '100%', direction: 'rtl' },
  header: {
    container: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    right: { margin: 0, paddingInline: '20px' },
    left: { margin: 0, paddingInline: '20px' },
  },
  mainTitle: { textAlign: 'center' },
  userDetails: { margin: 2 },
  table: {
    container: { marginTop: '16px', border: '1px solid lightgray', borderRadius: '8px' },
    headCell: { borderLeft: '1px solid lightgray', borderRight: '1px solid lightgray', backgroundColor: '#f8f9fa' },
    cell: { borderLeft: '1px solid lightgray', borderRight: '1px solid lightgray' },
  },
  footer: {
    marginTop: '16px',
    padding: '8px',
    border: '1px solid lightgray',
    borderRadius: '8px',
  },
};

export default React.forwardRef(function RenderHtml({ body }, ref) {
  const { orderId, createdAt, user, items, total } = body;

  return (
    <div ref={ref} style={styles.container}>
      <div>
        <header style={styles.header.container}>
          <div style={styles.header.right}>
            <div>
              <strong>פרימיום מערכות מיזוג אוויר</strong>
            </div>
            <div>
              <strong>דוא"ל : vrfisrael@gmail.com</strong>
            </div>
            <div>
              <strong>עוסק מורשה : 301176806</strong>
            </div>
            <div>
              <strong>תאריך : {createdAt}</strong>
            </div>
          </div>
          <div style={styles.header.left}>
            <img src='https://orderspdfs.s3.eu-west-1.amazonaws.com/logo.png' width='150' alt='logo' />
          </div>
        </header>
        <h1 style={styles.mainTitle}>{`הצעת מחיר : ${orderId} (מקור)`}</h1>

        <div>
          <p style={styles.userDetails}>
            <strong>שם הלקוח :</strong>
            <span>{user.fullName}</span>
          </p>
          <p style={styles.userDetails}>
            <strong>פלאפון :</strong>
            <span>{user.phone}</span>
          </p>
          {Boolean(user.email) && (
            <p style={styles.userDetails}>
              <strong>אימייל :</strong>
              <span>{user.email}</span>
            </p>
          )}
        </div>
        <TableContainer style={styles.table.container} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={styles.table.headCell} align='right'>
                  תיאור המוצר
                </TableCell>
                <TableCell style={styles.table.headCell} align='right'>
                  דגם
                </TableCell>
                <TableCell style={styles.table.headCell} align='right'>
                  יחידות
                </TableCell>
                <TableCell style={styles.table.headCell} align='right'>
                  מחיר יחידה
                </TableCell>
                <TableCell style={styles.table.headCell} align='right'>
                  סה"כ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell style={styles.table.cell} align='right'>
                      {item.desc}
                    </TableCell>
                    <TableCell style={styles.table.cell} align='right'>
                      {item.model}
                    </TableCell>
                    <TableCell style={styles.table.cell} align='right'>
                      {item.count}
                    </TableCell>
                    <TableCell style={styles.table.cell} align='right'>
                      ₪ {item.price}
                    </TableCell>
                    <TableCell style={styles.table.cell} align='right'>
                      ₪ {item.count * item.price}
                    </TableCell>
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell style={styles.table.headCell} align='right'>
                  סה"כ לא כולל מע"מ
                </TableCell>
                <TableCell style={styles.table.cell} align='right'>
                  ₪ {Number(total).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={styles.table.headCell} align='right'>
                  מע"מ (17%)
                </TableCell>
                <TableCell style={styles.table.cell} align='right'>
                  ₪ {Number((17 / 100) * total).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={styles.table.headCell} align='right'>
                  סה"כ כולל מע"מ
                </TableCell>
                <TableCell style={styles.table.cell} align='right'>
                  <strong>₪ {Number((17 / 100) * total + total).toFixed(2)}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Paper style={styles.footer}>
          <h5>
            <strong>הערות :</strong>
          </h5>
          <p>הערות טקסטס</p>
        </Paper>
      </div>
    </div>
  );
});
