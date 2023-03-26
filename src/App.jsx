import Chat from "./componenets/Chat";
import Navbar from "./componenets/Navbar";
function App() {
  return (
    <div className="max-w-[728px] mx-auto text-center">
    {/* <section className='flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative'> */}
      <Navbar />
      <Chat />
    {/* </section> */}
  </div>
  )
}

export default App
