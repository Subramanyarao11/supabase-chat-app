import { Route, Routes } from 'react-router-dom';
import Home from './componenets/Home'
import Room from './componenets/Room';


function App() {
    return (
     <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/room" element={<Room/>} />

          {/* Uncomment this Later */}
          {/* <Route
          path="/products"
          element={<AuthenticationGuard component={Products} />}
        /> */}
      </Routes>
    )
  }

  export default App
