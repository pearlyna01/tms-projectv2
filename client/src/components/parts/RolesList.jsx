// component that is part of ManageGrp
import React, { useState, useReducer } from "react";

// reducer function
const reducer = (state,action) => {
  switch (action.type) {
  // add a role group 
  case "add": {
    return{
      roles: [ ...state.roles, action.text ]
    };
  }
  
  // remove the role from the list
  case "remove": {
    const target = state.roles.findIndex(t => t === action.text);
    const arr = state.roles;
    arr.splice(target,1);
    
    return{
      roles: arr
    };
  }
  default:
    return state;
  }
};

// input to add a role 
const AddRole = ({add}) => {
    const [text, setText] = useState("");

    // post to add role 
    async function addRole(text) {
      // send http request to server to add role 
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST","../../createRoleGrp",true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          if (this.responseText === "Duplicate role group") {
            alert("role already exists")
          } 
          if (this.responseText === "Done"){
            add(text);
          }
        } 
        else if (this.readyState === 4 && this.status > 401) {
          // failed to create role
          alert('Unable to create role');
        } 
      }
      xhttp.send(JSON.stringify({groupName: text}));
    }

    return (
      <form className="row mt-5">
        {/* input to enter role group name */}
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new role name"
            value={text}
            onChange={ e => setText(e.target.value)}
          />
        </div>
        
        {/* button to add role group */}
        <div className="col-auto">
          <button 
            className="btn btn-primary float-end" 
            type="submit"
            onClick={ e => {
              e.preventDefault();
              addRole(text);
              setText("");
            }}
          >
            Add Role
          </button>
        </div>
      </form>
    );
}

// a row containing the role name and the remove button
const RowItem = ({ group, remove }) => {
  // post to delete a role
  async function deleteRole(text) {
    // send http request to server to add role 
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST","../../removeRoleGrp",true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        remove(text);
      } 
      else if (this.readyState === 4 && this.status > 401) {
        // failed to create role
        alert('Unable to create role');
      } 
    }
    xhttp.send(JSON.stringify({groupName: text}));
  }

  return (
    <li className="list-group-item">
      {group}
      { (group === "Admin") ? 
      <button className="btn btn-danger btn-sm float-end"
              onClick={
                e => {
                e.preventDefault();
                deleteRole(group);
              }}
              disabled
      >
          Remove
      </button> : 
      <button className="btn btn-danger btn-sm float-end"
            onClick={
              e => {
              e.preventDefault();
              deleteRole(group);
            }}
      >
        Remove
      </button> 
      }
      
    </li>
  );
} 


const RolesList = ({roles}) => {
    const [state, dispatch] = useReducer(reducer, roles);
    
    return (
        <>
        <ul className="list-group">
        {
            state.roles.map((role,index) => {
                return (
                  <RowItem
                    key={index}
                    group={role}
                    remove={(text) => dispatch({ type: "remove" , text:text})}
                  />
                );
                
            })
        }
        </ul>
        <AddRole 
        add={text => dispatch({type:"add", text: text})}
        />
        </>
        
    );
}

export default RolesList;