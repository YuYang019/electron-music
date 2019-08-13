import React from 'react';
import classNames from 'classnames';
import { Context } from '../index';
import styles from './index.module.less';

export default props => {
    const { bar } = props;

    return (
        <Context.Consumer>
            {({ activeKey, setKey }) => (
                <div className={styles.barWrapper}>
                    {bar.map(item => {
                        const classnames = classNames(styles.item, {
                            [styles.active]: activeKey === item.key
                        })
                        console.log(classnames)
                        return (
                            <div
                                key={item.key}
                                className={classnames}
                                onClick={() => setKey(item.key)}
                            >
                                {item.tab}
                            </div>
                        );
                    })}
                </div>
            )}
        </Context.Consumer>
    );
};
