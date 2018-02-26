import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import { setAppState } from '../actions/actions'
import { clearGifs } from '../actions/actions'
import { withRouter } from 'react-router';
import { ApiGiphy } from './ApiGiphy';

const mapStateToProps = (state) => {  
	return {
		searchValue: state.app.searchValue,
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		ApiGiphy: ApiGiphy,
		setAppState: ( (data) => {dispatch(setAppState(data))}),
		clearGifs: ( () => {dispatch(clearGifs())}),
		dispatch: dispatch
	}
}

const Header = withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderComponent))

export default Header;
