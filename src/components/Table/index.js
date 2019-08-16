import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

// 只是简单的合并
function compose(fn1, fn2) {
    return (...args) => {
        if (typeof fn1 === 'function') {
            fn1(...args);
        }
        if (typeof fn2 === 'function') {
            fn2(...args);
        }
    };
}

export default props => {
    const { dataSource, colums, rowClassName, onRow } = props;
    let { onClick, onDoubleClick } = onRow;

    const [curIndex, setIndex] = useState(null);

    function bindHandler(fn, ...args) {
        if (typeof fn !== 'function') return null;
        return event => fn(event, ...args);
    }

    onClick = compose(
        onClick,
        handleRowClick
    );

    function handleRowClick(event, row, rowIndex) {
        setIndex(rowIndex);
    }

    return (
        <ul className={styles.listWrapper}>
            {dataSource.map((row, rowIndex) => {
                const rowClass =
                    typeof rowClassName === 'function'
                        ? rowClassName(row, rowIndex)
                        : rowClassName;
                const rowClassNames = classNames(styles.item, rowClass, {
                    [styles.clicked]: rowIndex === curIndex,
                    [styles.odd]: rowIndex % 2 === 0
                });
                return (
                    <li
                        className={rowClassNames}
                        onClick={bindHandler(onClick, row, rowIndex)}
                        onDoubleClick={bindHandler(
                            onDoubleClick,
                            row,
                            rowIndex
                        )}
                        key={row.id}
                    >
                        {colums.map(col => col.render(row, rowIndex))}
                    </li>
                );
            })}
        </ul>
    );
};
