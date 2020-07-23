import React, { useState, useEffect } from 'react';

import apiService from './api/apiService';

import AccountingEntry from './components/AccountingEntry';
import PeriodSelector from './components/PeriodSelector';
import Spinner from './components/Spinner';
import Summary from './components/Summary';
import Transactions from './components/Transactions';
import ModalTransaction from './components/ModalTransaction';

function getCurrentPeriod(allPeriods) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
  const currentPeriod = allPeriods.find(({ id }) => id === yearMonth);

  return currentPeriod || Object.assign({}, allPeriods[0]);
}

export default function App() {
  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [transactionsData, setTransactionData] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterText, setFilterText] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const getAllPeriods = async () => {
      const data = await apiService.getAllPeriods();
      setAllPeriods(data);

      setCurrentPeriod(getCurrentPeriod(data));
    };

    getAllPeriods();
  }, []);

  useEffect(() => {
    if (!currentPeriod) return;

    const getTransactionsFromPeriod = async () => {
      setTransactionData([]);
      const data = await apiService.findByPeriod(currentPeriod);
      setTransactionData(data);
    };

    getTransactionsFromPeriod();
  }, [currentPeriod]);

  useEffect(() => {
    const getSumaryData = () => {
      const countTransactions = filteredTransactions.length;

      const totalEarnings = filteredTransactions
        .filter((item) => item.type === '+')
        .reduce((totalEarnings, transaction) => {
          return totalEarnings + transaction.value;
        }, 0);

      const totalExpenses = filteredTransactions
        .filter((item) => item.type === '-')
        .reduce((totalExpenses, transaction) => {
          return totalExpenses + transaction.value;
        }, 0);

      const balance = totalEarnings - totalExpenses;

      setSummary({
        countTransactions,
        totalEarnings,
        totalExpenses,
        balance,
      });
    };

    getSumaryData();
  }, [filteredTransactions]);

  useEffect(() => {
    if (filterText === '' || !filterText) {
      setFilteredTransactions(transactionsData);
    } else {
      const newFilteredData = transactionsData.filter((transaction) =>
        transaction.descriptionLowerCase.includes(filterText)
      );
      setFilteredTransactions(newFilteredData);
    }
  }, [filterText, transactionsData]);

  const handlePeriodChange = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  const handleFilterChange = (newFilter) => {
    setFilterText(newFilter);
  };

  const handleClose = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleInsertButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleEditTransaction = (id) => {
    setIsModalOpen(true);

    const currentTransaction = transactionsData.find(
      (transaction) => transaction.id === id
    );

    setSelectedTransaction(currentTransaction);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await apiService.remove(id);

      const newTransactions = transactionsData.filter(
        (transaction) => transaction.id !== id
      );

      setTransactionData(newTransactions);
      setFilteredTransactions(newTransactions);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSaveTransaction = async (
    transactionToSave,
    operation,
    id = null
  ) => {
    try {
      setIsModalOpen(false);

      if (operation === 'insert') {
        const postedTransaction = await apiService.create(transactionToSave);
        let newTransactions = [...transactionsData, postedTransaction];
        newTransactions = newTransactions.sort((a, b) =>
          a.yearMonthDay.localeCompare(b.yearMonthDay)
        );

        setTransactionData(newTransactions);
      } else {
        const updatedTransaction = await apiService.update(
          id,
          transactionToSave
        );
        const newTransactions = [...transactionsData];

        const index = newTransactions.findIndex(
          (transaction) => transaction.id === id
        );

        newTransactions[index] = updatedTransaction;
        setTransactionData(newTransactions);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <div className="center">
        <h3 style={styles.title}>Bootcamp Full Stack - Desafio Final</h3>
        <h5>Controle Financeiro Pessoal</h5>
      </div>

      {!isModalOpen && (
        <PeriodSelector
          selectedPeriod={currentPeriod}
          allPeriods={allPeriods}
          onChangePeriod={handlePeriodChange}
        />
      )}
      {transactionsData.length === 0 && <Spinner />}

      {transactionsData.length > 0 && (
        <>
          <Summary summary={summary} />

          {!isModalOpen && (
            <AccountingEntry
              onChangeFilter={handleFilterChange}
              onInsertButton={handleInsertButtonClick}
            />
          )}

          <Transactions
            transactions={filteredTransactions}
            onEditTransaction={handleEditTransaction}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </>
      )}

      {
        /* prettier-ignore */ (!!filterText && filterText.trim() !== '' && filteredTransactions.length === 0) && (
        <p>Nenhum lançamento encontrando para o filtro informado</p>
      )
      }

      {isModalOpen && (
        <ModalTransaction
          isOpen={isModalOpen}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
}

const styles = {
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
};
