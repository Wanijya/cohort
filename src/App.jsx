import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
  return (
    <div className="w-screen h-screen bg-gray-800 text-white">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
