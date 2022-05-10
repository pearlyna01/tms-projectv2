// This file contains the links to the web pages
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "jotai";
import { render } from "react-dom";
// webpages here
import Login from "./components/Login";
import Settings from "./components/Settings";
import CreateUser from "./components/CreateUser";
import ManageUser from "./components/ManageUser";
import ManageGrp from "./components/ManageGrp";
import ForbidPage from "./components/ForbidPage";
import ManageApps from "./components/ManageApps";



import CreateApp from "./components/CreateApp";
import ViewTasks from "./components/ViewTasks";

import CreatePlan from "./components/CreatePlan";
import CreateTask from "./components/CreateTask";
import Dashboard from "./components/Dashboard";

import RequireAuth from "./RequireAuth";
function App() {
  return (
    <BrowserRouter>
    <Provider>
      <Routes>
        <Route path="/login" element={<Login />}/>

        <Route element={<RequireAuth role="user"/>}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/settings" element={<Settings/>}/>

          <Route path="/createPlan/:app" element={<CreatePlan/>}/>
          <Route path='/createTask/:app' element={<CreateTask />}/>

          <Route path='/dashboard/:app' element={<ViewTasks/>} />

          {/* ----ADMIN ONLY routes----- */}
          <Route element={<RequireAuth role="admin"/>}>
            
            {/* app management  */}
            <Route path="/createApp" element={<CreateApp/>}/>
            <Route path="/manageApps" element={<ManageApps />}/> 

            {/* user management */}
            <Route path="/createUser" element={<CreateUser/>}/>
            <Route path="/manageUser" element={<ManageUser />}/> 
            <Route path="/manageGrp" element={<ManageGrp />}/>

          </Route>
        
        </Route>

        {/* <Route path="*" element={<Navigate to="/login" replace />}/> */}
        <Route path="/forbidPage" element={<ForbidPage />}/>
      </Routes>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
