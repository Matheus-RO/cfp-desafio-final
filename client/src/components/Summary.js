import React from 'react';
import { formatMoney } from '../helpers/formatHelpers';

export default function Summary({ summary }) {
  const { countTransactions, totalEarnings, totalExpenses, balance } = summary;

  const valueColor = (value) => {
    return value > 0 ? styles.earningColor : styles.expenseColor;
  };

  return (
    <div style={styles.flexRowBox}>
      <span style={styles.fontText}>Lançamentos: {countTransactions}</span>
      <span style={styles.fontText}>
        Receitas:{' '}
        <span style={styles.earningColor}>{formatMoney(totalEarnings)}</span>
      </span>
      <span style={styles.fontText}>
        Despesas:{' '}
        <span style={styles.expenseColor}>{formatMoney(totalExpenses)}</span>
      </span>
      <span style={styles.fontText}>
        Saldo: <span style={valueColor(balance)}>{formatMoney(balance)}</span>
      </span>
    </div>
  );
}
const styles = {
  flexRowBox: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid lightGray',
    borderRadius: '5px',
    padding: '5px',
  },
  fontText: {
    fontWeight: '620',
  },
  expenseColor: {
    color: '#c0392b',
  },
  earningColor: {
    color: '#16a085',
  },
};
