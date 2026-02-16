import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      return setError('စကားဝှက်သည် အနည်းဆုံး ၆ လုံး ရှိရပါမည်။');
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်။ Login ပြန်ဝင်ပေးပါ။");
      navigate('/login'); 
    } catch (err) {
      
      if (err.code === 'auth/email-already-in-use') {
        setError('ဒီအီးမေးလ်နဲ့ အကောင့်ဖွင့်ပြီးသား ဖြစ်နေပါတယ်။');
      } else {
        setError('အကောင့်ဖွင့်ရသည်မှာ အဆင်မပြေပါ။ ပြန်ကြိုးစားကြည့်ပါ။');
      }
      console.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Wallet Flow အကောင့်ဖွင့်ရန်</h2>
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleRegister}>
        <div className="form-control">
      
          <input 
            type="email" 
            placeholder="example@gmail.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="form-control">
          
          <input 
            type="password" 
            placeholder="စကားဝှက် (၆ လုံး)အသစ်ပေးပါ"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button className="btn" style={{ backgroundColor: '#2ecc71' }}>
          အကောင့်သစ်ဖွင့်မည်
        </button>
      </form>

      <p>
        အကောင့်ရှိပြီးသားလား? <Link to="/login">ဒီမှာ ဝင်ပါ</Link>
      </p>
    </div>
  );
};

export default Register;