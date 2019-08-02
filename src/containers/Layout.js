import React from 'react';
import PlayBar from '@/components/PlayBar'

export default (props) => (
  <div className="container">
    { props.children }
    <PlayBar />
  </div>
);
