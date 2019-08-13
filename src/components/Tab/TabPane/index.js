import React from 'react';
import { Context } from '../index';
import styles from './index.module.less';

export default function (props) {
    const { children, tabKey } = props;
    return (
        <Context.Consumer>
            {({ activeKey, setKey }) => (
                <div style={{ display: tabKey === activeKey ? 'block' : 'none' }}>
                    {children}
                </div>
            )}
        </Context.Consumer>
    );
};
