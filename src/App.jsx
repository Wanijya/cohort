import Mainroutes from "./routes/Mainroutes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="bg-gray-800 text-white w-screen h-screen font-thin py-10 px-50">
      <Navbar />
      <Mainroutes />
    </div>
  );
};

export default App;
