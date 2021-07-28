import React from 'react'
import { DataProvider } from './context/DataContext'
import Router from './router';
import './App.css'

function App() {
  return (
    <DataProvider>
      <Router />
    </DataProvider>
  );
}

export default App;
