// Helps to create a external window for forms 
// Component "mounts" when it is opened. 

// refer to the windowOpen.js in server/references
import React from 'react';
import { createPortal } from "react-dom";

class FormWindow extends React.PureComponent {
    constructor(props) {
        super(props);
        this.containElement = document.createElement('div');
        this.containButton = document.createElement('button')
        this.extWindow = null;
        this.status = {close: this.props.close};
    }

    render() {
        // place the element in the div
        return createPortal(this.props.children, this.containElement);
    }

    componentDidMount() {
        // when the window is opened, it is being refered
        this.extWindow = window.open('', '', 'width=800,height=600');
        
        // append the div and the children elements into the external window
        this.extWindow.document.body.appendChild(this.containElement);

        // adding bootstrap to the external window 
        let link = document.createElement( "link" );
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
        link.integrity = "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3";
        link.rel = "stylesheet";
        link.crossOrigin = "anonymous";
        this.extWindow.document.getElementsByTagName( "head" )[0].appendChild( link );
    }

    componentWillUnmount() {
        // close the component once unmounted/not rendered
        this.extWindow.close();
    }
}

export default FormWindow;