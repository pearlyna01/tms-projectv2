const Authenticate = {
    isAuthenticated: false,
    logIN: async function(Username, Password) {
        // send http request to server to login
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Login successful
               alert('login successful');
               Authenticate.isAuthenticated = true;
            } 
            else if (this.readyState === 4 && this.status === 401) {
                // Login unsuccessful. user/password incorrect
               alert('login unsuccessful');
            } 
        }
        xhttp.open("POST","../../login",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({username:Username, password:Password}));
    },
    logOut: async function() {
        Authenticate.isAuthenticated = false;
    }
};