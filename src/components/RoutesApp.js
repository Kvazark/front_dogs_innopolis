import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import BreedDefinition from "../pages/BreedDefinition";

function RoutesApp() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/breedDefinition" element={<BreedDefinition></BreedDefinition>}></Route>
            </Routes>
        </div>
    )
}
export default RoutesApp;