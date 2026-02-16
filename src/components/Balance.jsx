import React from 'react';

const Balance = ({ transactions }) => {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div className="balance-container">
      <h4>လက်ကျန်ငွေ (Balance)</h4>
      <h1>${total}</h1>
    </div>
  );
};

export default Balance;