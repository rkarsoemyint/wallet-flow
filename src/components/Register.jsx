import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 

    
    if (password !== confirmPassword) {
      return setError("စကားဝှက်များ တူညီမှုမရှိပါ။");
    }

   
    if (password.length < 6) {
      return setError("စကားဝှက်သည် အနည်းဆုံး ၆ လုံးရှိရပါမည်။");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Register Success!");
      navigate('/');
    } catch (err) {
      
      if (err.code === 'auth/email-already-in-use') {
        setError("ဤအီးမေးလ်ဖြင့် အကောင့်ဖွင့်ပြီးသား ဖြစ်နေပါသည်။");
      } else {
        setError("အကောင့်ဖွင့်ရာတွင် အမှားအယွင်းရှိနေပါသည်။ ပြန်လည်ကြိုးစားပါ။");
      }
      console.error(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>အကောင့်အသစ်ဖွင့်ရန်</h2>
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>အီးမေးလ်</label>
            <input 
              type="email" 
              placeholder="example@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>စကားဝှက် (အနည်းဆုံး ၆ လုံး)</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>စကားဝှက်ကို ထပ်မံရိုက်ထည့်ပါ</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-auth">အကောင့်ဖွင့်မည်</button>
        </form>
        
        <div className="auth-footer">
          အကောင့်ရှိပြီးသားလား? 
          <Link to="/login" className="auth-link">ဝင်ရောက်ရန်</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
