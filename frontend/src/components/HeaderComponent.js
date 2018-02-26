import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import logoIcon from '../../assets/logo/giphy-icon.png'
import logo from '../../assets/logo/giphy-sm.png'

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Notifications from 'material-ui-icons/Notifications';
import Badge from 'material-ui/Badge';
import TextField from 'material-ui/TextField';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import { MenuItem, MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import grey from 'material-ui/colors/grey';
import indigo from 'material-ui/colors/indigo';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import SearchIcon from 'material-ui-icons/Search';
import Hidden from 'material-ui/Hidden';

import { Manager, Target, Popper } from 'react-popper';


const styles = theme => ({
    root: {
        width: '100%',
        position: 'fixed',
        zIndex: 1000,
        
    },
    mainContainer:{
        width: '100%',
        height: 80,
        backgroundColor: indigo[100],
    },
    mainItem:{
        width: '100%'
    },
    linkDecoration:{
        textDecoration: 'none',
        color: 'black',
    },
    logoContainer: {
        width: '100%',        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        maxWidth: '100%',
        maxHeight: 30,
    },

    searchBox:{
        width: '100%',
    },
  
    textFieldRoot: {
        alignItems: 'center',
        padding: 0,
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
        width: '100%',
    },
    textFieldInput: {
        backgroundColor: indigo[50],
        fontSize: 18,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        height: 30,
        
        
    },
    textFieldFormLabel: {
        fontSize: 18,
    },
    searchButtonContainer:{
        width: '100%',        
    },
    searchButton:{
        width: '100%',        
        color: indigo[50],
        backgroundColor: indigo[900],
        minWidth: 50,
        minHeight: 50,
        
    },
  });

class HeaderComponent extends Component {
    
    componentDidMount = () => {
        const {setAppState} = this.props;
    }
    handleSearch = () => {
        const {searchValue, clearGifs, ApiGiphy, setAppState, dispatch} = this.props
        clearGifs()
        if(searchValue){
            ApiGiphy.search(searchValue, 24, 0, dispatch);
            setAppState({ title: searchValue });
        }else{
            ApiGiphy.getTrendings(24, 0, dispatch);
            setAppState({ title: 'Trending' });
        }
    }
    handleSearchKeyPress = (e) => {
        const {setAppState, searchValue, clearGifs, ApiGiphy, dispatch} = this.props
        if (e.keyCode == 13) {
            clearGifs();
            if(searchValue){
                ApiGiphy.search(searchValue, 24, 0, dispatch);
                setAppState({ title: searchValue });
            }else{
                ApiGiphy.getTrendings(24, 0, dispatch);
                setAppState({ title: 'Trending' });
            }
        }
    }
    startWith = (path) => {
        return location.pathname.startsWith(path)
    }
    handleChange = prop => event => {
        const { setAppState} = this.props
        setAppState({ [prop]: event.target.value });
    };
    
    render(){
        const {classes, searchValue} = this.props;
        if(location.pathname.startsWith('/loggedin/')){
            return(
                <div className={classes.root}>
                </div>
            )
        }
        var springConfig= {stiffness: 170, damping: 26}
        return (
            <div className={classes.root}>
                <Grid container spacing={0} direction={'row'} justify={'center'} alignItems={'center'} className={classes.mainContainer}>
                    <Grid item xs={12} md={8} className={classes.mainItem}>
                        <Grid container spacing={0} direction={'row'} justify={'flex-start'} alignItems={'center'}>
                            <Grid item xs={1} sm={2} className={classes.logoContainer}>
                                <Link to={'/home'}>
                                    <Hidden xsDown>
                                        <img src={logo} alt='GIPHY' className={classes.logo}/>
                                    </Hidden>
                                    <Hidden smUp>
                                        <img src={logoIcon} alt='GIPHY' className={classes.logo}/>
                                    </Hidden>
                                </Link>
                            </Grid>
                            <Grid item xs={9} >
                                <TextField
                                    className={classes.searchBox}
                                    placeholder="Search for GIFs"
                                    autoFocus={true}
                                    value={searchValue}
                                    onChange={this.handleChange('searchValue')}
                                    InputProps={{
                                        disableUnderline: true,
                                        onKeyDown: this.handleSearchKeyPress,
                                        classes: {
                                            root: classes.textFieldRoot,
                                            input: classes.textFieldInput,
                                        },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                        className: classes.textFieldFormLabel,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} sm={1} className={classes.searchButtonContainer}>
                                <Button onClick={this.handleSearch} className={classes.searchButton}>
                                    <SearchIcon />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            </div>
        )
    
    }
}
HeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    searchValue: PropTypes.string.isRequired,
    clearGifs: PropTypes.func.isRequired,  
    setAppState: PropTypes.func.isRequired,  
    ApiGiphy: PropTypes.object.isRequired,  
}
export default withStyles(styles)(HeaderComponent);