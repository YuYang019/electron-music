import React, { useState } from 'react';
import { Icon, Popover, Drawer } from 'antd';
import styles from './index.module.less';

export default props => {
    const { tipVisible } = props;
    const [visible, setVisible] = useState(false)

    function handleClick() {
        setVisible(true)
    }

    function onClose() {
        setVisible(false)
    }

    return (
        <span>
            <Popover
                overlayClassName={styles.popover}
                visible={tipVisible}
                content={'已开始播放'}
            >
                <Icon onClick={handleClick} type='menu-fold' />
            </Popover>
            <Drawer
                title='Basic Drawer'
                placement='right'
                closable={false}
                onClose={onClose}
                visible={visible}
                maskStyle={{ background: 'transparent' }}
                className={styles.drawer}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </span>
    );
};
