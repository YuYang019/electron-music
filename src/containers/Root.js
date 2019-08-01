import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from '../Routes';
import Layout from './Layout';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Layout>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Layout>
      </Provider>
    );
  }
}
