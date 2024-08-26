import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RoutesTester from './RoutesTester';
import PeerJs from './Peer';

const App = () => {
  return (
    <Router>
      <div>
        <h1>App</h1>
        <Routes>
          <Route path="/" element={<h2>Home</h2>} />
          <Route path="/routes-tester" element={<RoutesTester />} />
          <Route path="/peerjs" element={<PeerJs />} />
        </Routes>
        <div>
        <Link to="/">Home</Link><br />
        <Link to="/routes-tester">Tester</Link><br />
        <Link to="/peerjs">Peerjs</Link>
        </div>
      </div>
    </Router>
  );
};

export default App;