// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Home from '../containers/Home';
import { Switch, Route, Redirect } from 'react-router-dom';


class MainBody extends Component {
    
    render(){
        const {} = this.props
        const NotFound = () => (
            <h1>404.. This page is not found!</h1>
        )
       
        return (
            <main >
                <Switch>
                    <Route exact path='/' component={Home}/>
                        <Route exact path='/home' component={Home}/>
                    <Route path='/' component={Home}/> // everything else goes to homepage for login
                    {/* <Redirect from='*' to='/' /> */}
                    <Route path='*' component={NotFound} />
                </Switch>
            </main>
        )
        
    }
}



MainBody.propTypes = {
}

export default MainBody;