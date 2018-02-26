import { connect } from 'react-redux';
import MainBody from '../components/MainBody';
import { withRouter } from 'react-router';


const mapStateToProps = (state) => {
  return {
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {}
// }

const Main = withRouter(connect(
  mapStateToProps,
  // mapDispatchToProps
)(MainBody))

export default Main;
