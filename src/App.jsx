import Chat from "./componenets/Chat";
import Navbar from "./componenets/Navbar";
function App() {
  return (
    <div className="max-w-[728px] mx-auto my-0 text-center">
    <Navbar />
    <section className='flex flex-col min-h-screen justify-center bg-gray-100 shadow-xl border'>
    <Chat />
    </section>
  </div>
  )
}

export default App
