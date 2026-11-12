import { useReducer } from 'react';
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

const initialState = {
  loading: false,
  error: null,
  fact: null,
};

function factReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { loading: true, error: null, fact: null };
    case 'FETCH_SUCCESS':
      return { loading: false, error: null, fact: action.payload };
    case 'FETCH_ERROR':
      return { loading: false, error: action.payload, fact: null };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(factReducer, initialState);

  return (
    <div  className="container">
      <h1>Cat Fact Generator</h1>
      
      <button onClick={() =>
      {dispatch({ type: 'FETCH_START' });
        fetch('https://catfact.ninja/fact')
        .then(res => res.json())
        .then(data => dispatch
          ({ type: 'FETCH_SUCCESS', payload: data.fact }))
        .catch(err => dispatch
          ({ type: 'FETCH_ERROR', payload: err.message }));
      }} className="fetch-button"> {/* css button syles */}
        Get Cat Fact
      </button>

      <div className="content-area">
        {state.loading && <p>Loading...</p>}
        {state.error && <p className="error-message">Error: {state.error}</p>}
        {state.fact && (
          <div className="fact-box">
            <strong>Cat Fact:</strong> {state.fact}
          </div>
        )}
      </div>
    
    </div>
  );
}

export default App;