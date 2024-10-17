import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home"
// import { About } from "./pages/About";
import { SignIn } from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Navbar } from "./components/Navbar";
// import { Qr } from "./pages/Qr";
// import { VehicleDetails } from "./pages/VehicleDetails";
// import { Details } from "./pages/Details";
// import Redirect from "./pages/Redirect";
// import ContactOwner from "./pages/ContactOwner";
 

const App = () => {
   
  return(
  <>
    <BrowserRouter >
    
    <Navbar/>
        
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/qr" element={<Qr />} />
        <Route path="/qr/details" element={<Details />} />
        <Route path="/qr/:link" element={<Redirect />} />
        <Route path='/vehicledetails' element={<VehicleDetails />}></Route>
        <Route path="/contactOwner" element={<ContactOwner />} /> */}
      

      </Routes>
    
    </BrowserRouter>
  </>
  )
};

export default App;