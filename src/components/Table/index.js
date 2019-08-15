import React from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

export default props => {
    const { dataSource, colums, rowClassName, onRow } = props;

    const { onClick, onDoubleClick } = onRow;

    function bindHandler(fn, ...args) {
        if (typeof fn !== 'function') return null;
        return event => fn(event, ...args);
    }

    return (
        <ul className={styles.listWrapper}>
            {dataSource.map((row, rowIndex) => {
                const rowClass =
                    typeof rowClassName === 'function'
                        ? rowClassName(row, rowIndex)
                        : rowClassName;
                const rowClassNames = classNames(styles.item, rowClass, {
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
                        {colums.map((col) => col.render(row, rowIndex))}
                    </li>
                );
            })}
        </ul>
    );
};
