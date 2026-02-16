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
    <div className="auth-container">
      <h2>Wallet Flow သို့ ဝင်ရန်</h2>
      
     
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <form onSubmit={handleLogin}>
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
            placeholder="စကားဝှက် ၆ - လုံး ရိုက်ထည့်ပါ"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button className="btn">အကောင့်ဝင်မည်</button>
      </form>

      <p>
        အကောင့်မရှိသေးဘူးလား? <Link to="/register">ဒီမှာ အသစ်ဖွင့်ပါ</Link>
      </p>
    </div>
  );
};

export default Login;