import React  from 'react';
import { TransactionCard } from "../components/TransactionCard.tsx";
import { UpdateTransaction } from "../components/UpdateTransaction.tsx";
import { AddTransaction } from "../components/AddTransaction.tsx";
import { useState, useEffect } from 'react';
import { findWithFilters } from '../api/transactions/transactionRequest.ts';
import {TransactionDTO} from "../api/transactions/dto/transaction.dto.ts"
import { TransactionFiltersDTO } from '../api/transactions/dto/transactionFilters.dto.ts';
import { Filters } from '../components/Filters.tsx';




export const Transactions = () => {

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showUpdateTransactionForm, setShowUpdateTransactionForm] = useState(false);
    const [ShowAddTransactionForm, setShowAddTransactionForm] = useState(false); 
    const [filters, setFilters] = useState<TransactionFiltersDTO>({});
    const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

    useEffect(() => {
      refreshTransactions({});

    }, []); 

    const refreshTransactions = async (filters: TransactionFiltersDTO = {}) => {
      const response = await findWithFilters(filters || {});
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

        <div className="filter-panel">
          < Filters filters={filters} setFilters={setFilters} />
          <button className="accent-button" onClick={() => refreshTransactions(filters)}>
            Apply Filters
          </button>
        </div>

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
