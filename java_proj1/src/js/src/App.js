import {BrowserRouter, Route, Switch} from 'react-router-dom'

import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeFormComponent from './components/EmployeeFormComponent'
import ViewEmployeeComponent from './components/ViewEmployeeComponent'

/* 
    BrowserRouter encloses a section that defines how user should be directed.
    Inside we use Switch and Route to decide which page to display, 
    similar to switch case in Java.
        <Switch>
            <Route path=a>
                <Element1 />
            </Route>
            <Route path=b>
                <Element2 />
            </Route>
            ...
        </Switch>
    equivalent to...
        switch (path) {
            case a:
                render(<Element1 />);
                break;
            case b:
                render(<Element2 />);
                break;
            ...
        }
    Need to add "exact" in parameter or Route will only match first few characters
*/
const App = () => {
    return (
        <div className='container'>
            <BrowserRouter>
                <HeaderComponent />
                <div className='container'>
                    <Switch>
                        <Route path="" exact component={ListEmployeeComponent} />
                        <Route path="/index" exact component={ListEmployeeComponent} />
                        <Route path="/add/:username" exact component={EmployeeFormComponent} />
                        <Route path="/view/:username" exact component={ViewEmployeeComponent} />
                    </Switch>
                </div>
                {/* <FooterComponent /> */}
            </BrowserRouter>
        </div>
    );
}


export default App;
