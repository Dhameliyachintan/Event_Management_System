import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/form/Login";
import Registration from "./component/form/Registration";
import Home from "./pages/Home/Home";
import Navbar from "./component/Navbar";
import EventForm from "./component/EventForm";
import About from "./pages/About";
import EditEventForm from "./component/EditEventForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/eventForm" element={<EventForm />} />
        <Route path="/about" element={<About/>} />
        <Route path="/editEventForm" element={<EditEventForm/>} />
      </Routes>
    </div>
  );
}

export default App;
