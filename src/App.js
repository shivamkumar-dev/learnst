import React from 'react';
import Resource from './components/resources';
import './App.css';

function App() {
  return (
    <main className='container-fluid bg-light'>
      <div className='container album py-5'>
        <Resource />
      </div>
    </main>
  );
}

export default App;
