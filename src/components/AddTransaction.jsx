import React, { useState } from 'react';

const AddTransaction = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === '' || amount === 0) {
      alert('စာသားနှင့် ပမာဏကို မှန်ကန်စွာ ဖြည့်စွက်ပါ');
      return;
    }

    onAdd({
      text,
      amount: +amount,
      date
    });

    setText('');
    setAmount(0);
  };

  return (
    <>
      <h3>စာရင်းအသစ်ထည့်ရန်</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">အကြောင်းအရာ</label>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="ဥပမာ - ထမင်းဖိုး..." 
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">ပမာဏ <br /> (ဝင်ငွေဖြစ်ပါက အပေါင်း၊ ထွက်ငွေဖြစ်ပါက အနှုတ်)</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0" 
          />
        </div>
        <div className="form-control">
          <label htmlFor="date">နေ့စွဲ</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <button className="btn">စာရင်းသွင်းမည်</button>
      </form>
    </>
  );
};

export default AddTransaction;