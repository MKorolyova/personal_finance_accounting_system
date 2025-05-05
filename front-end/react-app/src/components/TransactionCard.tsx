import React  from 'react';
import { deleteTransaction } from '../api/transactions/transactionRequest.ts';
  export const TransactionCard = ({transaction, refreshTransactions, setSelectedTransaction, setShowUpdateTransactionForm}) => {

    console.log("transaction to print",transaction )
    const handleEdit = () => {
        setShowUpdateTransactionForm(true)
        setSelectedTransaction(transaction);
        console.log('Edit:', transaction);
    };

    const handleDelete = async () => {

          const response = await deleteTransaction(transaction.id);
          if (response) {
            await refreshTransactions();
          }
       
    };

    function capitalizeFirstLetter(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
      }

      
    return(
        <div className="card">
            <div className="info">
                <div className="general-info">
                <h2 className="title">
                    {capitalizeFirstLetter(transaction.category)} {transaction.type === "income" ? `+${transaction.amount}` : `-${transaction.amount}`}$
                </h2>
                <p className="subtitle">
                    {transaction.transactionDate.split('T')[0]}
                </p>

                </div>

                <div className="card-actions">
                <button className="card-actions-button" onClick={handleEdit}>Edit</button>
                <button className="card-actions-button" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className="text">
                {transaction.description}
            </div>
        </div>

    )
}