import React from 'react';
// import Private from './Private';
import Personalized from './Personalized';
import PersonalizedSong from './PersonalizedSong';
import styles from './index.module.less';

export default (props) => {
  return (
    <div className={styles.discover}>
      {/* <Private /> */}
      <Personalized />
      <PersonalizedSong />
    </div>
  )
}
