import React, { useState } from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h3>မှတ်တမ်းများ</h3>

      <div className="search-box">
        <input
          type="text"
          placeholder="ရှာဖွေရန်..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <ul className="list">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
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
          ))
        ) : (
          <p className="no-data">ကိုက်ညီသည့် စာရင်းမရှိပါ</p>
        )}
      </ul>
    </>
  );
};

export default TransactionList;
