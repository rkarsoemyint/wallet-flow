import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Success!");
      navigate('/'); 
    } catch (err) {
      
      setError("အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်။");
      console.error(err.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>ကြိုဆိုပါတယ်</h2>
        {error && <div className="error-msg">{error}</div>}
        
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>အီးမေးလ်</label>
            <input 
              type="email" 
              placeholder="example@gmail.com" 
              value={email} // State နဲ့ ချိတ်ပါ
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>စကားဝှက်</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" className="btn-auth">ဝင်ရောက်မည်</button>
        </form>
        
        <div className="auth-footer">
          အကောင့်မရှိသေးဘူးလား? 
          <Link to="/register" className="auth-link">အသစ်ဖွင့်ရန်</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
