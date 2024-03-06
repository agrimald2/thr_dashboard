import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import RouteContainer from "./RouteContainer";
import {ContextProvider} from "./MainContext";
import ToastContainer from "./ajonjolib/toasts/toast/toast_container";

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Router>
                    <RouteContainer/>
                </Router>
                <ToastContainer/>
            </ContextProvider>
        </div>
    );
}

export default App;
