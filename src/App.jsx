import { Route, Routes } from 'react-router-dom';
import Home from './componenets/Home';
import Room from './componenets/Rooms';

function App() {
    return(
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/room" element={<Room/>} />
        </Routes>
    )
}

export default App
