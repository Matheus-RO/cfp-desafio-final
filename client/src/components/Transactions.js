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
      {transactions.map((transaction) => {
        return (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        );
      })}
    </div>
  );
}
