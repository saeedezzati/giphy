import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { setAppState } from '../actions/actions'
import { ApiGiphy } from './ApiGiphy';


const mapStateToProps = (state) => {
  return {
		pageYOffset: state.app.pageYOffset || 0,
		searchValue: state.app.searchValue,
		title: state.app.title,
		expandedId: state.app.expandedId,
		overlayExpandedId: state.app.overlayExpandedId,
    gifs: state.gifs,
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
	  	ApiGiphy: ApiGiphy,
      setAppState: ( (data) => {dispatch(setAppState(data))}),
      dispatch: dispatch, 
  }
}

const Home = (connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage))


export default Home;
