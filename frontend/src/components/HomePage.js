// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Grid from 'material-ui/Grid';
import Grow from 'material-ui/transitions/Grow';
import { MenuItem, MenuList } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';

import grey from 'material-ui/colors/grey';
import indigo from 'material-ui/colors/indigo';
import deepPurple from 'material-ui/colors/deepPurple';
import red from 'material-ui/colors/red';
import green from 'material-ui/colors/green';
import blue from 'material-ui/colors/blue';
import yellow from 'material-ui/colors/yellow';


const styles = theme => ({
    root: {
        width: '100%',
    },
    mainColumn: {
        width: '100%',
    },
    
    linkDecoration:{
        textDecoration: 'none',
        color: 'black',
    }, 
    row1: {
        width: '100%',
        paddingTop: 90,
        paddingLeft: 8,
    },
    title:{
        width: '100%',
        color: indigo[50],
        fontSize: 30,
        fontWeight: 1000,
    },
    counter:{
        color: indigo[200],
        fontSize: 12,
        fontWeight: 600,
    },
    row2: {
        width: '100%',
    },
    container:{
        width: '100%',
        maxHeight: 1500,
        paddingRight: 16,
    },
    r2c:{
        width: '100%',
        maxHeight: '100%',
        backgroundColor: indigo[500],
        marginRight: 8,
        
    },
    frame:{
        width: '100%', 
        margin:8,
        position: 'relative',
        width: '100%',
        
    },
    gif:{
        width: '100%',
        '&:hover':{
            cursor: 'pointer',
        }
    },
    gifInfo:{
        backgroundColor: indigo[100],
        marginTop: -8,
        marginLeft: 8,
        marginRight: -8,
    },
    gifUser:{
        width: '100%',
        backgroundColor: 'rgba(30,30,30,0.5)',
        top: 0,
        position: 'absolute'
    },
})

class HomePage extends Component {
    componentDidMount() {		    
        const { ApiGiphy, setAppState, dispatch } = this.props;		 
        window.addEventListener('scroll', this.handleScroll);
        setAppState({pageYOffset: window.pageYOffset})
        this.props.history.push('/home'); 
        ApiGiphy.getTrendings(24, 0, dispatch);
    }
    handleChange = prop => event => {
        const {setAppState} = this.props
        setAppState({ [prop]: event.target.value });
    };
    handleScroll = () => {
        const {setAppState, searchValue, pageYOffset,ApiGiphy, dispatch} = this.props;
        if(window.pageYOffset>pageYOffset+500){
            setAppState({pageYOffset: window.pageYOffset})
                if(!searchValue){
                    ApiGiphy.getTrendings(24, Math.round(window.pageYOffset/500)*24, dispatch);
                }else{
                    ApiGiphy.search(searchValue, 24, Math.round(window.pageYOffset/500)*24, dispatch);
                }
        }
    }
    randomColor = () => {
        var colors = ['#2ecc71','#e74c3c','#f1c40f','#3498db']
        return colors[Math.floor(Math.random()*colors.length)];
    }
    render(){
        const { classes, gifs, pageYOffset, searchValue, expandedId, overlayExpandedId, title, setAppState} = this.props        
        var col1 = gifs.col1
        var col2 = gifs.col2
        var col3 = gifs.col3
        var col4 = gifs.col4
        return (
            <div className={classes.root}>
                <Grid container spacing={0} direction={'column'} justify={'flex-start'} alignItems={'center'} className={classes.mainColumn}>
                    <Grid item xs={12} md={8} className={classes.row1}>
                        <Typography className={classes.title}>
                            {title ? title + ' ' : 'Trendings '}
                            <span className={classes.counter}>
                                {gifs.pagination.total_count && gifs.pagination.total_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' GIFs'}
                            </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} className={classes.row2}>
                        <Grid container style={{maxHeight: pageYOffset+1500}} wrap={'wrap'} spacing={0} direction={'column'} justify={'flex-start'} alignItems={'flex-start'} className={classes.container}>
                            <Grid id='r2c' item xs={3} sm={3} md={3} lg={3} className={classes.r2c}>
                                {col1.length>0 && col1.map((g,index) => {
                                    return (
                                        <div key={index}>
                                            <div className={classes.frame} style={{height: g.images.downsized.height*(document.getElementById('r2c').offsetWidth/g.images.downsized.width)+'px', backgroundColor: this.randomColor()}}>
                                                <img src={g.images.downsized.url} alt='GIPHY' className={classes.gif} onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} onClick={() => setAppState({ 'expandedId': expandedId==g.id ? '' : g.id })}/>
                                                <Collapse className={classes.gifUser} in={overlayExpandedId == g.id ? true : false}  onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} timeout="auto" unmountOnExit>
                                                    <CardContent style={{padding: '3px 5px'}}>
                                                        <Typography style={{color: indigo[50]}} paragraph variant="body2">
                                                            <span style={{fontWeight: 900}}>{g.title.split("GIF by")[0]}</span>  GIF by <span style={{fontWeight: 900}}>{g.title.split("GIF by")[1]}</span>
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </div>
                                           
                                            <Collapse className={classes.gifInfo} in={expandedId==g.id ? true : false}  timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography paragraph variant="body2">
                                                        User: {g.user ? g.user.username : 'UNKNOWN'}
                                                        <br/>
                                                        Twitter: {g.user ? <a href={'https://twitter.com/'+g.user.twitter.substr(1)}> {g.user.twitter} </a> : 'UNKNOWN'}
                                                    </Typography>
                                                </CardContent>
                                            </Collapse>
                                        </div>
                                    )
                                })}
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3} className={classes.r2c}>
                                {col2.length>0 && col2.map((g,index) => {
                                    return (
                                        <div key={index}>
                                        
                                            <div  className={classes.frame} style={{height: g.images.downsized.height*(document.getElementById('r2c').offsetWidth/g.images.downsized.width)+'px', backgroundColor: this.randomColor()}}>
                                                <img src={g.images.downsized.url} alt='GIPHY' className={classes.gif} onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} onClick={() => setAppState({ 'expandedId': expandedId==g.id ? '' : g.id })}/>
                                                <Collapse className={classes.gifUser} in={overlayExpandedId == g.id ? true : false}  onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} timeout="auto" unmountOnExit>
                                                    <CardContent style={{padding: '3px 5px'}}>
                                                        <Typography style={{color: indigo[50]}} paragraph variant="body2">
                                                            <span style={{fontWeight: 900}}>{g.title.split("GIF by")[0]}</span>  GIF by <span style={{fontWeight: 900}}>{g.title.split("GIF by")[1]}</span>
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </div>
                                            <Collapse className={classes.gifInfo} in={expandedId==g.id ? true : false}  timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography paragraph variant="body2">
                                                        User: {g.user ? g.user.username : 'UNKNOWN'}
                                                        <br/>
                                                        Twitter: {g.user ? <a href={'https://twitter.com/'+g.user.twitter.substr(1)}> {g.user.twitter} </a> : 'UNKNOWN'}
                                                    </Typography>
                                                </CardContent>
                                            </Collapse>
                                        </div>
                                    )
                                })}
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3} className={classes.r2c}>
                                {col3.length>0 && col3.map((g,index) => {
                                    return (
                                        <div key={index}>
                                            <div className={classes.frame} style={{height: g.images.downsized.height*(document.getElementById('r2c').offsetWidth/g.images.downsized.width)+'px', backgroundColor: this.randomColor()}}>
                                                <img src={g.images.downsized.url} alt='GIPHY' className={classes.gif} onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} onClick={() => setAppState({ 'expandedId': expandedId==g.id ? '' : g.id })}/>
                                                <Collapse className={classes.gifUser} in={overlayExpandedId == g.id ? true : false}  onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} timeout="auto" unmountOnExit>
                                                    <CardContent style={{padding: '3px 5px'}}>
                                                        <Typography style={{color: indigo[50]}} paragraph variant="body2">
                                                            <span style={{fontWeight: 900}}>{g.title.split("GIF by")[0]}</span>  GIF by <span style={{fontWeight: 900}}>{g.title.split("GIF by")[1]}</span>
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </div>
                                            <Collapse className={classes.gifInfo} in={expandedId==g.id ? true : false}  timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography paragraph variant="body2">
                                                        User: {g.user ? g.user.username : 'UNKNOWN'}
                                                        <br/>
                                                        Twitter: {g.user ? <a href={'https://twitter.com/'+g.user.twitter.substr(1)}> {g.user.twitter} </a> : 'UNKNOWN'}
                                                    </Typography>
                                                </CardContent>
                                            </Collapse>
                                        </div>

                                    )   
                                })}
                            </Grid>
                            <Grid item xs={3} sm={3} md={3} lg={3} className={classes.r2c}>
                                {col4.length>0 && col4.map((g,index) => {
                                    return (
                                        <div key={index}>
                                            <div className={classes.frame} style={{height: g.images.downsized.height*(document.getElementById('r2c').offsetWidth/g.images.downsized.width)+'px', backgroundColor: this.randomColor()}}>
                                                <img src={g.images.downsized.url} alt='GIPHY' className={classes.gif} onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} onClick={() => setAppState({ 'expandedId': expandedId==g.id ? '' : g.id })}/>
                                                <Collapse className={classes.gifUser} in={overlayExpandedId == g.id ? true : false}  onMouseOver={() => setAppState({ 'overlayExpandedId': g.id })} onMouseOut={() => setAppState({ 'overlayExpandedId': '' })} timeout="auto" unmountOnExit>
                                                    <CardContent style={{padding: '3px 5px'}}>
                                                        <Typography style={{color: indigo[50]}} paragraph variant="body2">
                                                            <span style={{fontWeight: 900}}>{g.title.split("GIF by")[0]}</span>  GIF by <span style={{fontWeight: 900}}>{g.title.split("GIF by")[1]}</span>
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </div>
                                            <Collapse className={classes.gifInfo} style={{marginRight:-8}}in={expandedId==g.id ? true : false}  timeout="auto" unmountOnExit>
                                                <CardContent>
                                                    <Typography paragraph variant="body2">
                                                        User: {g.user ? g.user.username : 'UNKNOWN'}
                                                        <br/>
                                                        Twitter: {g.user ? <a href={'https://twitter.com/'+g.user.twitter.substr(1)}> {g.user.twitter} </a> : 'UNKNOWN'}
                                                    </Typography>
                                                </CardContent>
                                            </Collapse>
                                        </div>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                    
            </div>
        )
    }
}
HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    setAppState: PropTypes.func.isRequired,  
    searchValue: PropTypes.string.isRequired,
    expandedId: PropTypes.string.isRequired,
    overlayExpandedId: PropTypes.string.isRequired,
    gifs: PropTypes.object.isRequired,  
    title: PropTypes.string.isRequired,  
    pageYOffset: PropTypes.number.isRequired,
    ApiGiphy: PropTypes.object.isRequired,  
    dispatch: PropTypes.func.isRequired,
}

export default withStyles(styles)(HomePage);