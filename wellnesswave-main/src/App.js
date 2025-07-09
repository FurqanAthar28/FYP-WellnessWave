import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import Home from "./pages/user/home/Home";
import AppointmentBooking from "./pages/user/appointment-booking/AppointmentBooking";
import Indicators from "./pages/user/indicators/Indicators";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./routes/PrivateRoute";
import CounsellorHome from "./pages/counsellor/counsellor-home/CounsellorHome";
import NotFound from "./routes/NotFound";
import Navbar from "./components/common/navbar/Navbar";
import Permissions from "./routes/Permissions";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import UserDetails from "./pages/admin/user-details/UserDetails";
import CounsellorAppointments from "./pages/counsellor/counsellor-appointments/CounsellorAppointments";
import CounsellorPermission from "./routes/CounsellorPermission";
import RoomPage from "./pages/room/RoomPage";
import MeetingLounge from "./pages/room/MeetingLounge";

function App() {
  return (
    <>    
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/room-page/:roomId/:counsellorId/:userId/:name/:contact' element={<RoomPage/>}/>

        <Route element={<PrivateRoute/>}>
          {/* User Paths */}
          <Route path="/home" element={<Home />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/indicators" element={<Indicators />} />
          {/* <Route path="/ChatBox" element={<ChatsPage /> }/> */}

          {/* Counsellor Paths */}
          <Route element={<CounsellorPermission perProp={['counsellor']} />}>
            <Route path="/counsellor-home" element={<CounsellorHome/>} />
            <Route path='/counsellor-appointments' element={<CounsellorAppointments/>}/>
            <Route path='/meeting-lounge/:appointmentId' element={<MeetingLounge/>}/>
          </Route>
            
          {/* Admin Paths */}
          <Route element={<Permissions perProp={['admin']} />}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/user-details' element={<UserDetails/>}/>
          </Route>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
}

export default App;
