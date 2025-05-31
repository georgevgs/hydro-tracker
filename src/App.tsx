import React from 'react';
import Header from './components/Header';
import WaterTracker from './components/WaterTracker';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto max-w-md px-4 py-6">
        <WaterTracker />
      </main>
    </div>
  );
}

export default App;