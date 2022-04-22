import React, { useState, useEffect } from "react";
import Header from "./navbar/Header";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useNavigate } from "react-router-dom";

// default userAtom details 
export const userDetails = {
    username: "",
    isAuthenticated: false,
    roles: []
};

// setting up the atoms to store session
export const UserAtom = atomWithStorage('userAtom', userDetails);

function Login(){
    // function to redirect to home page
    const navigate = useNavigate();

    // placeholders to get the username and password
    const [username, setUsername ] = useState("");
    const [password, setPass ] = useState("");

    // use the Atoms to set user session
    const [user, setUserAtom ] = useAtom(UserAtom);

    // redirect to the home page if the user is already authenticated 
    useEffect(() => {
        if (user.isAuthenticated){
           return navigate("/settings");
        }
     },[user.isAuthenticated,navigate]);

    // handle login
    async function handleSubmit(event) {
        event.preventDefault();

        // send http request to server to login
        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Login successful
                alert('login successful');

                // set client session
                console.log('login resp',this.responseText);
                setUserAtom({username: username, isAuthenticated: true, roles:this.responseText});

                // redirect to the home page.
                navigate('/settings');
            } 
            else if (this.readyState === 4 && this.status >= 401) {
                // Login unsuccessful. user/password incorrect
                alert('Invalid login');
            } 
        }
        xhttp.open("POST","../../login",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({username:username, password:password}));
    }
    
    console.log("rendering login")

    return (
        <div>

        <Header />

        <div className="container">
        <div className="row">
        <div className={`col-6 align-self-center`}>
            
            <h3 className="mt-3">Login</h3>

            <form onSubmit={handleSubmit}>
            {/* <!--username--> */}
            <div className="row mt-3 mb-3">
                <label htmlFor="username" className="col-2 col-form-label">Username</label>
                <div className="col-sm-7">
                <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    required
                    onChange={(event) => setUsername(event.target.value)}
                />
                </div>
            </div>

            {/* <!--password--> */}
            <div className="row">
                <label htmlFor="password" className="col-2 col-form-label">Password</label>
                <div className="col-sm-7">
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    required
                    onChange={(event) => setPass(event.target.value)}
                />
                </div>

                {/* <!--submit button--> */}
                <div className="row mt-4">
                <div className="col-sm-9">
                    <button className="btn btn-primary float-end" type="submit">Login</button>
                </div>
                </div>
            </div>
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}

export default Login;