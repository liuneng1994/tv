import React from 'react';
import {connect } from 'react-redux';
import styles from './App.css';
import classnames from 'classnames';
import ChangeLog from 'components/Changelog';
import Nav from 'components/Nav'
import Chat from 'components/Chat';
import Side from 'components/Side';
import Alert from 'components/Alert';
import ReactTooltip from 'react-tooltip'
import { Scrollbars } from 'react-custom-scrollbars';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';


const muiTheme = {
  palette: {
    primary1Color: '#6441a4',
    primary2Color: '#6441a4',
  }
};

const getData = (props) => {
  if(props.params.category == 'category') {
    props.getCategorys(props.params.name || 'all');
  }else {
    props.getCategorys('all');
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let ChatOpen = this.props.chat ? 'chatOpen' : '';

    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, muiTheme)}>
          <div className={styles.container} >
            <Side />
            <div className={classnames(styles.scrollContainer, styles[ChatOpen])}>
                <Nav />
                <Scrollbars>
                <div className={styles.wrapperContainer}>
                    
                    <div className={styles.mainContainer}>
                        {this.props.children}
                    </div>
                </div>
                </Scrollbars>
            </div>
            <Chat />
            <ChangeLog />
            <Alert />
          </div>
      </MuiThemeProvider>
      <ReactTooltip place="top" effect="solid"/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  chat: state.layouts.chat,
})


export default connect(mapStateToProps)(App);