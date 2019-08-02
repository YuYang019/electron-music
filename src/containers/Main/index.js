import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Discover from '../Discover';
import Fragment from '../Fragment';
import CounterPage from '../CounterPage';
import SideBar from '@/components/SideBar';
import routes from '@/constants/routes';
import Like from '@/components/Like';

import styles from './index.module.css';

class HomePage extends Component {
  render() {
    return (
      <div className={styles.home}>
        <SideBar />
        <div className={styles.homeContent}>
          <Fragment>
            <Switch>
              <Route exact path={routes.DISCOVER} component={Discover} />              
              <Route path={routes.LIKE} component={Like} />
              <Route path={routes.COUNTER} component={CounterPage} />
            </Switch>
          </Fragment>
        </div>
      </div>
    );
  }
}

export default HomePage;
