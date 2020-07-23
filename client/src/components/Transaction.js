import React from 'react';
import Action from './Action';
import { formatMoney } from '../helpers/formatHelpers';

const EARNING_COLOR = '#a1f0dc';
const EXPENSE_COLOR = '#f0a1a8';

export default function Transaction({
  transaction,
  onEdit,
  onDelete,
  isDiferentDay,
}) {
  const { id, day, description, category, value, type } = transaction;

  const handleClickAction = (action) => {
    if (action === 'edit') {
      onEdit(id);
    } else {
      onDelete(id);
    }
  };

  const getColorType = () => {
    return type === '-' ? EXPENSE_COLOR : EARNING_COLOR;
  };

  const transactionMarginBottom = !isDiferentDay ? '5px' : '20px';
  const dinamicStyles = {
    backgroundColor: getColorType(),
    marginTop: transactionMarginBottom,
  };

  const formattedDay = day.toString().padStart(2, '0');

  return (
    <div style={{ ...dinamicStyles, ...styles.flexRow }}>
      <div>
        <span style={styles.dayFontSyle}>{formattedDay}</span>
      </div>
      <div style={styles.flexInfo}>
        <div style={styles.flexColumn}>
          <span style={styles.fontStyle}>{category}</span>
          <span>{description}</span>
        </div>
        <div>
          <span style={styles.valueStyle}>{formatMoney(value)}</span>
        </div>
      </div>

      <div style={styles.actionsStyle}>
        <Action onClickAction={handleClickAction} type={'edit'} />
        <Action onClickAction={handleClickAction} type={'delete'} />
      </div>
    </div>
  );
}
const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '5px',
    padding: '5px',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  fontStyle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  dayFontSyle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  flexInfo: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 7,
    flexShrink: 1,
    flexBasis: '0%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5px',
    marginRight: '20px',
    marginLeft: '10px',
  },
  valueStyle: {
    fontSize: '1.8rem',
    textAlign: 'right',
  },
  actionsStyle: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};
