import React from 'react';
import styles from './index.module.less';
import { NavLink } from 'react-router-dom';
import routes from '@/constants/routes';
import Avatar from '../Avatar'

export default props => {
  return (
    <div className={styles.sideBar}>
      <Avatar />
      <ul className={styles.list}>
        <li className={styles.title}>在线音乐</li>
        <li>
          <NavLink exact to={routes.DISCOVER}>
            <i className="iconfont icon-bulb"></i>
            发现
          </NavLink>
        </li>
        <li className={styles.title}>我的音乐</li>
        <li>
          <NavLink exact to={routes.COUNTER}>to counter</NavLink>
        </li>
        <li>
          <NavLink exact to={routes.LIKE}>
            <i className="iconfont icon-heart"></i>
            我喜欢的
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
