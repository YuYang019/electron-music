import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'antd';
import routes from '@/constants/routes';
import Avatar from '../Avatar'
import styles from './index.module.less';

export default props => {
  return (
    <div className={styles.sideBar}>
      <Avatar />
      <ul className={styles.list}>
        <li className={styles.title}>在线音乐</li>
        <li>
          <NavLink exact to={routes.DISCOVER}>
            <Icon type="bulb" />
            发现
          </NavLink>
        </li>
        <li className={styles.title}>我的音乐</li>
        <li>
          <NavLink exact to={routes.COUNTER}>to counter</NavLink>
        </li>
        <li>
          <NavLink exact to={routes.LIKE}>
            <Icon type="heart" />
            我喜欢的
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
