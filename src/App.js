import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './components/Home';
import UserDetail from './components/UserDetail';


const App = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <Provider store={store}>
      <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Router>
          <Routes>
            <Route path="/" element={<Home isDark={isDark} setIsDark={setIsDark} />} />
            <Route path="/user/:id" element={<UserDetail isDark={isDark} />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
