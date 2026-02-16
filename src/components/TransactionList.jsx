import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <>
      <h3>မှတ်တမ်းများ</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
            <div className="list-item-info">
              <span>{transaction.text}</span>
              <small className="date-text">{transaction.date}</small>
            </div>
            <span>
              {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}
            </span>
            <button 
              onClick={() => onDelete(transaction.id)} 
              className="delete-btn"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TransactionList;