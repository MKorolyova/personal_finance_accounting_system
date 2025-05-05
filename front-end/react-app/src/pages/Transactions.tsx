import React  from 'react';
import { TransactionCard } from "../components/TransactionCard.tsx";
import { UpdateTransaction } from "../components/UpdateTransaction.tsx";
import { AddTransaction } from "../components/AddTransaction.tsx";
import { useState, useEffect } from 'react';
import { findWithFilters } from '../api/transactions/transactionRequest.ts';
import {TransactionDTO} from "../api/transactions/dto/transaction.dto.ts"


export const Transactions = () => {

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showUpdateTransactionForm, setShowUpdateTransactionForm] = useState(false);
    const [ShowAddTransactionForm, setShowAddTransactionForm] = useState(false); 

    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);
    useEffect(() => {
      refreshTransactions();

    }, []); 

      const refreshTransactions = async () => {
        const response = await findWithFilters({});
        if (response) {
          setTransactions(response); 
        }
      };

      const handleShowAddTransactionForm = (e) =>{
        setShowAddTransactionForm(true)
      }

  return (
    <main className="main">
        {!ShowAddTransactionForm && (
          <button className="accent-button" onClick={handleShowAddTransactionForm}>
          Add Transaction
          </button>
        )}
        <h1>Transactions</h1>

        {ShowAddTransactionForm &&  (
            <AddTransaction  setShowAddTransactionForm={setShowAddTransactionForm} refreshSummary={null} refreshTransactions={refreshTransactions}/> 
        )}

        {showUpdateTransactionForm && (
            <UpdateTransaction transaction={selectedTransaction} refreshTransactions={refreshTransactions} setShowUpdateTransactionForm={setShowUpdateTransactionForm}/>
        )}

        {transactions.map((transaction) => (
            <TransactionCard   key={transaction.id} transaction={transaction}  refreshTransactions={refreshTransactions} setSelectedTransaction={setSelectedTransaction} setShowUpdateTransactionForm={setShowUpdateTransactionForm}/>
        ))}
    </main>
  );
};
