import React, { useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextareaAutosize } from '@mui/material';
import { makeStyles } from '@mui/styles';
import logo from '../../logo.png';
import { formatToHebDate } from '../../utils';
import { Context as UserFormContext } from '../../context/userFormContext';
import useCurrentUser from '../../hooks/useCurrentUser';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  container: { padding: '20px 50px', width: '100%', direction: 'rtl' },
  headerContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
  headerRight: { margin: 0, padding: '0 20px', fontWeight: '200' },
  headerLeft: { margin: 0, paddingInline: '20px' },
  mainTitle: { textAlign: 'center', fontWeight: '200' },
  userDetails: { margin: '2px' },
  totalDetails: { margin: '4px 2px', direction: 'ltr', flexDirection: 'row-reverse', display: 'flex', justifyContent: 'space-between' },
  tableContainer: { marginTop: '16px', border: '3px solid lightgray', borderRadius: '8px' },
  tableRow: { maxHeight: 10 },
  tableHeadCell: { borderLeft: '1px solid lightgray', borderRight: '1px solid lightgray', backgroundColor: '#f8f9fa' },
  tableCell: { borderLeft: '1px solid lightgray', borderRight: '1px solid lightgray' },
  footer: {
    marginTop: '16px',
    padding: '8px',
    border: '1px solid lightgray',
    borderRadius: '8px',
  },
  textArea: {
    resize: 'none',
    overflow: 'hidden',
    minHeight: '50px',
    maxHeight: '100px',
  },
});
const USERS_MAPS = {
  'vrfisrael@gmail.com': {
    brandName: 'פרימיום מערכות מיזוג אוויר',
    email: 'vrfisrael@gmail.com',
    id: '301176806',
    brandLogo:logo
  },
  'shalom604@gmail.com': {
    brandName: 'פרימיום מערכות מיזוג אוויר',
    email: 'vrfisrael@gmail.com',
    id: '301176806',
    brandLogo:''
  },
  'vrftop@gmail.com': {
    brandName: 'פרפקט מערכות מיזוג אוויר',
    email: 'vrftop@gmail.com',
    id: '209230325',
    brandLogo:''
  },
  'itchikblob@gmail.com': {
    brandName: 'פרימיום מערכות מיזוג אוויר',
    email: 'vrftop@gmail.com',
    id: '301176806',
    brandLogo:logo
  },
};
export default React.forwardRef(function RenderHtml({ body, setNotes = null, editable = false,userEmail }, ref) {
  const { brandName, email, id ,brandLogo} = USERS_MAPS[userEmail];

  const { orderId, createdAt, user, items, total, notes } = body;
  const { state: formState } = useContext(UserFormContext);
  const _isFixedPrice = formState.isFixedPrice || body.isFixedPrice;
  const totalPrice = _isFixedPrice ? Number(formState.fixedPrice) || Number(body.fixedPrice) : Number(total);
  const taxes = Number((17 / 100) * totalPrice);

  const styles = useStyles();
  return (
    <div ref={ref} className={styles.container}>
      <div>
        <header className={styles.headerContainer}>
          <div className={styles.headerRight}>
            <div>{brandName}</div>
            <div>דוא"ל : {email}</div>
            <div>עוסק מורשה : {id}</div>
            <div>תאריך : {formatToHebDate(createdAt)}</div>
          </div>
          {brandLogo&&<div className={styles.headerLeft}>
            <img src={brandLogo} width='150' alt='logo' />
          </div>}
        </header>
        <h1 className={styles.mainTitle}>{`הצעת מחיר : ${orderId} (מקור)`}</h1>
        <div>
          <p className={styles.userDetails}>
            <strong>שם הלקוח :</strong>
            {user.fullName}
          </p>
          <p className={styles.userDetails}>
            <strong>פלאפון :</strong>
            {user.phone}
          </p>
          {Boolean(user.address) && (
            <p className={styles.userDetails}>
              <strong>כתובת :</strong>
              {user.address}
            </p>
          )}
        </div>
        <TableContainer className={styles.tableContainer} component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow className={styles.tableRow}>
                <TableCell className={styles.tableHeadCell} align='right'>
                  תיאור המוצר
                </TableCell>
                <TableCell className={styles.tableHeadCell} align='right'>
                  דגם
                </TableCell>
                <TableCell className={styles.tableHeadCell} align='right'>
                  יחידות
                </TableCell>
                {!_isFixedPrice && (
                  <>
                    <TableCell className={styles.tableHeadCell} align='right'>
                      מחיר יחידה
                    </TableCell>
                    <TableCell className={styles.tableHeadCell} align='right'>
                      סה"כ
                    </TableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className={styles.tableCell} align='right'>
                      {item.desc}
                    </TableCell>
                    <TableCell className={styles.tableCell} align='right'>
                      {item.model}
                    </TableCell>
                    <TableCell className={styles.tableCell} align='right'>
                      {item.count}
                    </TableCell>
                    {!_isFixedPrice && (
                      <>
                        <TableCell className={styles.tableCell} align='right'>
                          ₪ {Number(item.price).toLocaleString('en')}
                        </TableCell>
                        <TableCell className={styles.tableCell} style={{ fontWeight: 700 }} align='right'>
                          ₪ {Number(item.count * item.price).toLocaleString('en')}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginRight: '55%', padding: '15px 0' }}>
          <p className={styles.totalDetails}>
            <strong style={{ padding: '0 10px', textAlign: 'start' }}> : סך הכל</strong>
            <strong style={{ padding: '0 10px' }}>₪ {totalPrice.toLocaleString('en')}</strong>
          </p>
          <p className={styles.totalDetails}>
            <strong style={{ padding: '0 10px', textAlign: 'start' }}> : מע"מ (17%)</strong>
            <strong style={{ padding: '0 10px' }}> ₪ {taxes.toLocaleString('en')} </strong>
          </p>
          <p className={styles.totalDetails}>
            <strong style={{ padding: '0 10px', textAlign: 'start' }}> : סך הכל כולל מע"מ</strong>
            <strong style={{ padding: '0 10px' }}>₪ {(taxes + totalPrice).toLocaleString('en')}</strong>
          </p>
        </div>

        <Paper className={styles.footer}>
          <h5>
            <strong>הערות :</strong>
          </h5>
          {editable ? <TextareaAutosize style={{ width: '100%' }} id='notes' name='notes' placeholder={'הערות'} value={notes} onChange={(e) => setNotes(e.target.value)} /> : <p>{notes}</p>}
        </Paper>
      </div>
    </div>
  );
});
