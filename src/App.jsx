import Mainroutes from "./routes/Mainroutes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      <Navbar />
      <Mainroutes />
    </div>
  );
};

export default App;
