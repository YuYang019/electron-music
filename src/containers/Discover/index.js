import React from 'react';
import Banner from './Banner';
import Personalized from './Personalized';
import PersonalizedSong from './PersonalizedSong';
import styles from './index.module.less';

export default (props) => {
  return (
    <div className={styles.discover}>
      <Banner />
      <Personalized />
      <PersonalizedSong />
    </div>
  )
}
