import React from 'react';
import logo from "./styles/images/logo.svg"
import app from "./App.module.css"
import {ShipsList} from "./components/StarShipsList";


function App() {
     return (
        <div className={app.wrapper}>
            <div>
                <img className={app.photo} src={logo} alt=""/>
                <p className={app.p}>May the force be with you</p>
            </div>
            <ShipsList/>
        </div>
    );
}

export default App;
