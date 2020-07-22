import React from 'react';
import Action from './Action';
import { formatMoney } from '../helpers/formatHelpers';

export default function Transaction({ transaction, onEdit, onDelete }) {
  const { id, day, description, category, value } = transaction;

  const handleClickAction = (action) => {
    if (action === 'edit') {
      onEdit(id);
    } else {
      onDelete(id);
    }
  };

  return (
    <div style={styles.flexRow}>
      <div>
        <span>{day}</span>
      </div>
      <div style={styles.flexColumn}>
        <span>{category}</span>
        <span>{description}</span>
      </div>
      <div>
        <span>{formatMoney(value)}</span>
      </div>
      <div>
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
    border: '1px solid lightGray',
    borderRadius: '5px',
    padding: '5px',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
};
