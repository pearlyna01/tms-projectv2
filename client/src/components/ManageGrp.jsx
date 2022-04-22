import React from "react";
import UserNav from "./navbar/UserNav";
import RolesList from "./parts/RolesList";

// component to help render the list of role groups 
class DisplayRoles extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            data: null
        };
    }

    // fetch the list of role groups when the component is mounted 
    componentDidMount() {
        fetch('../../getGrpNames')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    ...this.state,
                    isLoaded: true,
                    data: data[0]
                })   
            })
            .catch(() => alert('failed to fetch list of avaliable roles')); 
    }

    render() {
        const { isLoaded, data } = this.state;
        
        if (isLoaded) {
            return (
                <RolesList roles={data} /> 
            );
        } else {
            return (<h5>Loading</h5>)
        }
    }
}

const ManageGrp = () => {

    return (
        <div>
            <UserNav />
            <div className="container">
            <div className="row mt-3">
            <div className="col-5">
                    
                <h5>List of Roles</h5>
                <DisplayRoles />
        
            </div>

            {/* <div className="col-1"> </div>
            <div className="col-5">

                <h5>List of App Groups</h5>
                <ul className="list-group">
                    <li className="list-group-item">TEST</li>
                </ul>
            </div>*/}
            </div> 
                
            </div>
        </div>
    )
}

export default ManageGrp;