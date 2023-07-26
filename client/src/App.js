
import './App.css';
import ChatRoom from './Pages/ChatRoom/ChatRoom';
import HomePage from './Pages/Homepage.jsx/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route path = '/' element={<HomePage/>}/>
        <Route path= '/chat-room' element={<ChatRoom/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
