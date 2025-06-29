import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BirthdayWish from './components/BirthdayWish';
import MembersPage from './components/MembersPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BirthdayWish />} />
        <Route path="/members" element={<MembersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
