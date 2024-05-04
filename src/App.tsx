import React from 'react';
import './App.css';
import SidebarComponent from './components/global/Sidebar';
import Dashboard from '../src/pages/Dashboard'; // Import the Dashboard component

const App: React.FC = () => {
  const data = [
    { title: 'Card 1', content: 'Content for Card 1' },
    { title: 'Card 2', content: 'Content for Card 2' },
    { title: 'Card 3', content: 'Content for Card 3' },
  ];

  return (
    <div className="app-container"> {/* Apply CSS flexbox/grid styles here */}
      <SidebarComponent />
      <div className="dashboard-container"> {/* Apply CSS flexbox/grid styles here */}
        <Dashboard data={data} /> {/* Render the Dashboard component */}
      </div>
    </div>
  );
};

export default App;
