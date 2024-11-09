import React from 'react';
import Counter from './Counter'; // Adjust the path as necessary
import Maps from './Maps';
import DaqConnection from './DaqConnection'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter/>
        <DaqConnection/>
        <Maps/>
      </header>
    </div>
  );
}

export default App;
