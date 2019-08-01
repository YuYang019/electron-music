import React from 'react';
import styles from './index.module.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import routes from '../../constants/routes';
import Avatar from '../Avatar'

export default props => {
  return (
    <div className={styles.sideBar}>
      <Avatar />
      <ul className={styles.list}>
        <li className={styles.title}>我的音乐</li>
        <li>
          <NavLink to={routes.COUNTER}>to counter</NavLink>
        </li>
        <li>
          <NavLink to={routes.LIKE}>to like</NavLink>
        </li>
      </ul>
    </div>
  );
};
