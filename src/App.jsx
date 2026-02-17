import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Balance from './components/Balance';
import ExpenseChart from './components/ExpenseChart';
import IncomeExpense from './components/IncomeExpense';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import Login from './components/Login';
import Register from './components/Register';

import { auth, db } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { 
  collection, query, where, onSnapshot, addDoc, 
  deleteDoc, doc, serverTimestamp, orderBy 
} from 'firebase/firestore';

import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  // ၁။ Theme ပြောင်းလဲခြင်း
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // ၂။ User Login အခြေအနေစစ်ဆေးခြင်း
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ၃။ Firestore မှ လအလိုက် Data ဖတ်ခြင်း
  useEffect(() => {
    if (user) {
      const startOfMonth = selectedMonth + "-01";
      const endOfMonth = selectedMonth + "-31";

      const q = query(
        collection(db, "transactions"), 
        where("uid", "==", user.uid),
        where("date", ">=", startOfMonth),
        where("date", "<=", endOfMonth),
        orderBy("date", "desc") 
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setTransactions(data);
      }, (error) => console.error("Firestore Error:", error));

      return () => unsubscribe();
    }
  }, [user, selectedMonth]); 

  // ၄။ Data အသစ်ထည့်ခြင်းနှင့် ဖျက်ခြင်း
  const addTransaction = async (t) => {
    try {
      await addDoc(collection(db, "transactions"), {
        ...t, uid: user.uid, createdAt: serverTimestamp() 
      });
    } catch (err) { console.error(err); }
  };

  const deleteTransaction = async (id) => {
    try { await deleteDoc(doc(db, "transactions", id)); } 
    catch (err) { console.error(err); }
  };

  if (loading) return <div className="loading-screen">ခဏစောင့်ပါ...</div>;

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={
            user ? (
              <>
                <div className="user-profile">
                  <div className="profile-left">
                    <span>📧 {user.email}</span>
                    <button onClick={toggleTheme} className="btn-theme">
                      {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                  </div>
                  <button onClick={() => signOut(auth)} className="btn-logout-mini">Logout</button>
                </div>

                <Header />
                
                <div className="filter-container">
                  <label>လအလိုက်ကြည့်ရန်: </label>
                  <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="month-input" />
                </div>

                <ExpenseChart transactions={transactions} isDarkMode={isDarkMode} />
                
                <div className="main-wrapper">
                  <Balance transactions={transactions} />
                  <IncomeExpense transactions={transactions} />
                  <TransactionList transactions={transactions} onDelete={deleteTransaction} />
                  <AddTransaction onAdd={addTransaction} />
                </div>
              </>
            ) : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
