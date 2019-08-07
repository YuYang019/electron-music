import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Discover from '../Discover';
import Fragment from '../Fragment';
import CounterPage from '../CounterPage';
import SideBar from '@/components/SideBar';
import routes from '@/constants/routes';
import Like from '@/components/Like';
import ToolBar from '@/components/ToolBar';

import styles from './index.module.less';

class HomePage extends Component {
  render() {
    return (
      <div className={styles.home}>
        <SideBar />
        <div className={styles.homeContent}>
          <ToolBar />
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
