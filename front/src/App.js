
import './App.css';

import MainContent from "./components/MainContent";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import RedirectPage from "./components/RedirectPage";
import SiteStatistic from "./components/SiteStatistic";
import Header from "./components/Header";




function App()  {


    return (
        <div>

            <BrowserRouter>
                <Route exact path="/"><Header/></Route>
                <Route path="/stats/"><Header/></Route>
                <Switch>
                    <Route exact path="/"><MainContent/></Route>
                    <Route path="/stats/"><SiteStatistic/></Route>
                    <Route path="/"><RedirectPage/></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )

}
export default App;
