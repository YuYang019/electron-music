import React from 'react';
import Routes from '../Routes';
import PlayBar from '../components/PlayBar'

export default (props) => (
  <div className="container">
    { props.children }
    <PlayBar />
  </div>
);
