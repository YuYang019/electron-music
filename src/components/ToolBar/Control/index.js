import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import classNames from 'classnames';
import styles from './index.module.less';

const remote = window.require('electron').remote;

const Control = (props) => {
  const { history } = props;

  const canBack = remote.getCurrentWebContents().canGoBack();
  const canForward = remote.getCurrentWebContents().canGoForward()

  function goBack () {
    if (canBack) {
      history.goBack()
    }
  }

  function goNext () {
    if (canForward) {
      history.goForward()
    }
  }

  const backClassNames = classNames(styles.back, {
    [styles.disabled]: !canBack
  })

  const forwardClassNames = classNames(styles.push, {
    [styles.disabled]: !canForward
  })


  return (
    <div className={styles.control}>
        <div className={backClassNames} onClick={goBack}>
            <Icon type="left" />
        </div>
        <div className={forwardClassNames} onClick={goNext}>
            <Icon type="right" />
        </div>
    </div>
  )
}

export default withRouter(Control)
