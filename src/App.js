import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from 'react';
import './App.css';
import './WorkItem.css'
import Header from './components/Header';
import Video from "./components/Video";
import HomePage from "./components/HomePage";
import Footer from './components/Footer';
import Contact from "./components/Contact";
import { WorkItemSneaker } from './components/WorkItemSneaker';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Video />
        <Routes>
          <Route path="/Sneaker" element={<WorkItemSneaker />} />
        </Routes>
        <HomePage />
        <Contact />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
