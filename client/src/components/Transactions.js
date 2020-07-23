import React from 'react';
import Transaction from './Transaction';

export default function Transactions({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
}) {
  const handleEditTransaction = (id) => {
    onEditTransaction(id);
  };

  const handleDeleteTransaction = (id) => {
    onDeleteTransaction(id);
  };

  return (
    <div>
      {transactions.map((transaction, index) => {
        const isDiferentDay =
          index > 0 && transactions[index - 1].day !== transaction.day;

        return (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
            isDiferentDay={isDiferentDay}
          />
        );
      })}
    </div>
  );
}
