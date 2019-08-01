import React, { Component } from 'react';
import SideBar from '../../components/SideBar';
import { Switch, Route } from 'react-router-dom';
import CounterPage from '../CounterPage';
import routes from '../../constants/routes';
import Like from '../../components/Like';
import styles from './index.module.css';

export default class HomePage extends Component {
  render() {
    return (
      <div className={styles.home}>
        <SideBar />
        <div className={styles.homeContent}>
          <Switch>
            <Route path={routes.COUNTER} component={CounterPage} />
            <Route path={routes.LIKE} component={Like} />
          </Switch>
        </div>
      </div>
    );
  }
}
