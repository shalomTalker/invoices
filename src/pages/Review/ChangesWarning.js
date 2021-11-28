import { Typography } from '@mui/material';
import React from 'react';

const styles = {
  container: { direction: 'rtl', margin: '16px 0' },
  warnings: { padding: '16px 0' },
  warn: { fontWeight: 'bold' },
  footer: { fontWeight: 'bold', padding: '16px', borderRadius: '8px', backgroundColor: 'rgb(255 152 0 / 57%)' },
};

export default function ChangesWarning({ priceChanges }) {
  const renderWarnings = () =>
    priceChanges.map((change, i) => {
      if (change.oldPrice == 0) {
        return <Typography key={i.toString()} style={styles.warn} variant='h6' color='black'>{`- מחיר ${change.desc} יירשם כ - ₪${change.newPrice}`}</Typography>;
      } else {
        return <Typography key={i.toString()} style={styles.warn} variant='h6' color='red'>{`- מחיר ${change.desc} ישתנה מ ₪${change.oldPrice} ל- ₪${change.newPrice}`}</Typography>;
      }
    });

  return (
    Boolean(priceChanges.length) && (
      <div style={styles.container}>
        <Typography variant='h5'>שים לב! ביצעת שינויי מחיר או שעדכנת מחירים שלא היו קיימים במוצרים הבאים : </Typography>
        <div style={styles.warnings}>{renderWarnings()}</div>
        <Typography style={styles.footer} variant='body1' color='black'>
          בעת אישור ההזמנה המחירים יתעדכנו במערכת ולא תוכל לשנות שוב עד ההזמנה הבאה
        </Typography>
      </div>
    )
  );
}
