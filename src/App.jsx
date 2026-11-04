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

  // Button fetch request
  const handleGetCatFact = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Failed to fetch cat fact');
      }
      const data = await response.json();
      // fact data from API
      dispatch({ type: 'FETCH_SUCCESS', payload: data.fact });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  return (
    <div className="container">
      <h1>Cat Fact Generator</h1>
      
      <button onClick={handleGetCatFact} className="fetch-button">
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