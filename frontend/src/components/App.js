// Components
import React, { Component } from 'react';
import Main from '../containers/Main';
import Header from '../containers/Header';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';
import teal from 'material-ui/colors/teal';
import indigo from 'material-ui/colors/indigo';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: indigo, 
    accent: teal,
    error: red,
  },
 
});
const styles = theme => ({
  root: {
      width: '100%',
      backgroundColor: indigo[500],
  },
})

class App extends Component {
  // componentDidMount() {		    
  // }
  render(){
    const {classes} = this.props
    return(
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Reboot />
          <Header />
          <Main />
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(App);