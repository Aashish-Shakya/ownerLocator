import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Navbar } from "./components/Navbar";
import { Qr } from "./Pages/Qr";
import { VehicleDetails } from "./Pages/VehicleDetails";
import { Details } from "./Pages/Details";
import Redirect from "./Pages/Redirect";
import ContactOwner from "./Pages/ContactOwner";
 

const App = () => {
   
  return(
  <>
    <BrowserRouter >
    
    <Navbar/>
        
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/qr/details" element={<Details />} />
        <Route path="/qr/:link" element={<Redirect />} />
        <Route path='/vehicledetails' element={<VehicleDetails />}></Route>
        <Route path="/contactOwner" element={<ContactOwner />} />
      

      </Routes>
    
    </BrowserRouter>
  </>
  )
};

export default App;