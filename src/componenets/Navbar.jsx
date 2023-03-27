import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const joinRoom = () => {
        navigate('/room');
    }
  return (
    <div className="bg-gray-800 h-[10vh] min-h-[50px] fixed w-full max-w-[728px] top-0 flex justify-between items-center p-4 z-[99]">
      <h1 className="text-white text-3xl">Chat App</h1>
      <Link to="room"><button className='text-white font-semibold' onClick={joinRoom}>Join a Room!</button></Link>
    </div>
  );
};

export default Navbar;
