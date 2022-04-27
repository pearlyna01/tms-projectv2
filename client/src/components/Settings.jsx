import React, { useEffect, useState } from "react";
import UserNav from "./navbar/UserNav";

// input to update email 
const UpdateEmail = () => {
    const [emailInput, setEmail ] = useState("");
    console.log('update email component')
    
    // function to send http request to update email
    async function handleUpdateEmail(event) {
        event.preventDefault();
        
        // send http request to update email
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // change the current email read only
                document.getElementById('currentE').innerText = emailInput;

                // // reset input
                setEmail("");
                document.getElementById('email').value = "";
                // Login successful
                alert('Email updated.');
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Login unsuccessful. user/password incorrect
                alert('Email failed to update.');
            } 
        }
        xhttp.open("POST","../../updateEmail",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ email: emailInput}));
    }

    return(
        <form onSubmit={handleUpdateEmail}>
            <div className="row mb-3">
                {/* input for new email address */}
                <label htmlFor="email" className="col-4 col-form-label">New Email address:</label>
                <div className="col-5">
                    <input type="email" className="form-control mt-2" id="email" name="email" 
                    onChange={(event) => setEmail(event.target.value)} />
                </div>

                {/* <!--Submit button to update email--> */}
                <div className="col mt-2">
                    <button className="btn btn-primary float-end" type="submit">Save</button>
                </div>
            </div>
        </form>
    )
};

// input to update password
const UpdatePass = () => {
    const [passInput1, setPass1] = useState("");
    const [passInput2, setPass2] = useState("");

    async function handleUpdatePass(event) {
        // show the user should enter the same password to confirm
        if (!(passInput1===passInput2)) {
            const element = document.getElementById("wrongPassText");
            element.classList.remove("d-none");
            event.preventDefault();
            return;
        }

        // send the request to update the password
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Login successful
                alert('Password updated.');
                
                // make the warning text disappear if initially there
                const element = document.getElementById("wrongPassText");
                element.classList.add("d-none");
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Login unsuccessful. user/password incorrect
                alert('Password failed to update.');
            } 
        }
        xhttp.open("POST","../../updatePassword",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ password: passInput1 }));
        
        // reset password inputs
        setPass2("");
        setPass1("");
    }

    console.log('update pass component')

    return(
        <form onSubmit={handleUpdatePass}>
            <div className="row mt-4">
                <label htmlFor="password" className="col-4 col-form-label">New Password:</label>
                <div className="col-5">
                    <input
                        type="password"
                        className="form-control"
                        onChange={(event) => setPass1(event.target.value)}
                        id="password1"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}"
                        title="Must contain 8-10 characters, alphabets, numbers and special characters"
                    />
                </div>
            </div>
          
            {/* <!--confirm password--> */}
            <div className="row mb-4 mt-4">
                <label htmlFor="password" className="col-4 col-form-label">
                    Confirm New Password:
                </label>
                <div className="col-5">
                    <input 
                    type="password" 
                    className="form-control" 
                    id="password2" 
                    onChange={(event) => setPass2(event.target.value)}
                    />
                </div>
            </div>

            {/* <!--Submit button to create user--> */}
            <div className="row">
            <div className="col">
                <p className="text-danger d-none" id="wrongPassText">Please enter the same password to confirm</p>
            </div>
            <div className="col">
                <button className="btn btn-primary float-end" type="submit">Save</button>
            </div>
            </div>
        </form>
    )
};

// display current email
function SetEmailfunc() {
    const [currentEmail, setCurrentEmail ] = useState('');
    
    console.log('current email component')
    
    // retrieve current email
    useEffect(() => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', '../../getEmail', true);
        xhttp.onreadystatechange = function () {
            if ((this.readyState === this.DONE && this.status === 200) || 
            (this.readyState === this.DONE && this.status === 304)) {
                // Able to get email
                console.log("current email: ",this.responseText);
                setCurrentEmail(this.responseText);
                
            }
            else if (this.readyState === 4 && this.status > 400) {
                // Unable to get current email
                alert('Failed to get email.');
            }
        }
        
        xhttp.send();
    }, []);

    return( 
        <div>
           <p className="form-control-plaintext" id="currentE">{currentEmail}</p> 
        </div>
        
    );
}

function Settings(){   
    return (
        <div>
        <UserNav />
        <div className="container">
        <div className="row">
            {/* <!--Title--> */}
            <h3 className="mt-3">Account settings</h3>
            <hr />

            {/* <!--Main--> */}
            <div className="col">
                {/* <!-- group--> */}
                <div className="row">
                <div className="col-sm-7">
                    <h4>Change email</h4>
                    <hr />
                    {/* <!--readonly current email--> */}
                    <div className="row mb-3">
                        <label htmlFor="username" className="col-4 col-form-label">
                            Current email address:
                        </label>
                        <div className="col">
                            <SetEmailfunc />
                        </div>
                    </div>

                    <UpdateEmail />

                    <div className="row block"></div>
                    <h4>Change Password</h4>
                    <hr />
                    
                    <UpdatePass />
                </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Settings;