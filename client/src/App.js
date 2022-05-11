// This file contains the links to the web pages
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider, useAtom  } from "jotai";
import { UserAtom } from "./components/Login";

// webpages here
import Login from "./components/Login";
import Settings from "./components/Settings";
import CreateUser from "./components/CreateUser";
import ManageUser from "./components/ManageUser";
import ManageGrp from "./components/ManageGrp";
import ForbidPage from "./components/ForbidPage";
import ViewTasks from "./components/ViewTasks";
import CreateApp from "./components/CreateApp";
import CreatePlan from "./components/CreatePlan";
import CreateTask from "./components/CreateTask";
import Dashboard from "./components/Dashboard";

import UserNav from "./components/navbar/UserNav";

import RequireAuth from "./RequireAuth";
function App() {
  const [user, setUserAtom ] = useAtom(UserAtom);
  return (
    <BrowserRouter>
    <Provider>
      <Routes>
        <Route path="/login" element={<Login />}/>

        <Route element={<RequireAuth role="user"/>}>
          <Route path="/" element={<UserNav> <Dashboard isAdmin={user.roles.includes("Admin")}/> </UserNav>}/>
          <Route path="/settings" element={<Settings/>}/>

          <Route path="/createPlan/:app" element={<CreatePlan/>}/>
          <Route path='/createTask/:app' element={<CreateTask />}/>

          <Route path='/dashboard/:app' element={<UserNav> <ViewTasks/> </UserNav>} />

          {/* ----ADMIN ONLY routes----- */}
          <Route element={<RequireAuth role="admin"/>}>
            
            {/* app management  */}
            <Route path="/createApp" element={<CreateApp/>}/>

            {/* user management */}
            <Route path="/createUser" element={<CreateUser/>}/>
            <Route path="/manageUser" element={<ManageUser />}/> 
            <Route path="/manageGrp" element={<ManageGrp />}/>

          </Route>
        
        </Route>

        {/* <Route path="*" element={<Navigate to="/login" replace />}/> */}
        <Route path="/forbidPage" element={<UserNav><ForbidPage /></UserNav> }/>
      </Routes>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
