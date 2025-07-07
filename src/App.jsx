import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BirthdayWish from './components/BirthdayWish';
import MembersPage from './components/MembersPage';
import BirthdayCake from './components/BirthdayCake';
import JagadishPage from './components/JagadishPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BirthdayCake />} />
        <Route path="/next-page" element={<BirthdayWish />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/jagadish" element={<JagadishPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
