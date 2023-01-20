import React, {useState} from "react"
import MainPageWT from "./pages/MainPageWT";
import SignupPM from "./pages/SignupPM";
import MemberArea from "./pages/MemberArea";
import UserProfile from "./pages/UserProfile"
import PetProfile from "./pages/PetProfile";
import EditPetProfile from "./pages/EditPetProfile";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";
import ShowPetProfile from "./pages/ShowPetProfile";
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom';
function App() {
  const [User , setLoginUser] = useState({});
  const [ProfileId , setProfileId] = useState("");
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<MainPageWT/>}/>
        <Route path = '/SignupPM' element = {<SignupPM setLoginUser = {setLoginUser}/>}/>
        <Route path = '/MemberArea' element = {<MemberArea User = {User} setLoginUser = {setLoginUser}/>}/>
        <Route path = '/UserProfile' element = {<UserProfile User = {User} setLoginUser = {setLoginUser}/>}/>
        <Route path = '/PetProfile' element = {<PetProfile User = {User} setLoginUser = {setLoginUser}/>}/>
        <Route path = '/EditPetProfile' element = {<EditPetProfile User = {User} setLoginUser = {setLoginUser}/>}/>
        <Route path = '/Notifications' element = {<Notifications User = {User} setLoginUser = {setLoginUser}/>}/>
        <Route path = '/Chat' element = {<Chat setProfileId = {setProfileId} />}/>
        <Route path = "/ShowPetProfile" element = {<ShowPetProfile UserId = {ProfileId} />}></Route>
      </Routes>
    </Router>
    
  );
}

export default App;
