// This file contains the links to the web pages
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Provider } from "jotai";

// webpages here
import Login from "./components/Login";
import Settings from "./components/Settings";
import CreateUser from "./components/CreateUser";
import ManageUser from "./components/ManageUser";
import ManageGrp from "./components/ManageGrp";
import ForbidPage from "./components/ForbidPage";

import Main from "./components/Main";

import RequireAuth from "./RequireAuth";
function App() {
  return (
    <BrowserRouter>
    <Provider>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/test" element={<Main />}/>
        
        <Route element={<RequireAuth role="user"/>}>
          
          <Route path="/settings" element={<Settings/>}/>
          
          <Route element={<RequireAuth role="admin"/>}>
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
