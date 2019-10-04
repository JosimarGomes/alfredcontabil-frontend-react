import  { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'app-ui';
import { getErrorMessage, setErrorMessage } from 'redux/reducers/AppReducers';

class AppAlertError extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.error !== null) {
            message.error(nextProps.error);
            this.props.setErrorMessage();
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        error: getErrorMessage(state),
    };
};

export default connect(mapStateToProps, { setErrorMessage })(AppAlertError);
