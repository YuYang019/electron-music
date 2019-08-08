import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

let itemLength = 0;
let itemWidth = 0;
let itemHeight = 0;
let listWidth = 0;
let leftStyle = {};
let middleStyle = {};
let rightStyle = {};

function getEleStyle(el, prop) {
    let val = getComputedStyle(el).getPropertyValue(prop);
    return parseInt(val.replace(/px/, ''))
}

export default props => {
    const [listDOM, setListDOM] = useState(null);
    const [curIndex, setIndex] = useState(0);
    const { children } = props;

    if (listDOM) {
        const { width } = listDOM.getBoundingClientRect();
        listWidth = width;

        const items = listDOM.children;
        if (items && items.length && !itemLength && !itemHeight) {
            const item = items[0];
            const width = getEleStyle(item, 'width');
            const height = getEleStyle(item, 'height');
            console.log(width)
            itemLength = listDOM.children.length;
            itemHeight = height;
            itemWidth = width;
            leftStyle = {
                left: `${0 - width * 0.15}px`,
                transform: ['scale(0.75)']
            };
            middleStyle = {
                left: `${(listWidth - width) / 2}px`,
                transform: ['scale(1)']
            };
            rightStyle = {
                left: `${(listWidth - width + ( 0.25 * width / 2))}px`,
                transform: ['scale(0.75)']
            };
        }
    }

    const getItemProps = index => {
        let className = '';
        let style = {
            left: `${(listWidth - itemWidth * 0.75) / 2}px`,
            transform: ['scale(0.75)']
        };

        if (index === curIndex) {
            className = styles.middle;
            style = middleStyle;
        }
        if (index === curIndex - 1) {
            className = styles.left;
            style = leftStyle;
        }
        if (index === curIndex + 1) {
            className = styles.right;
            style = rightStyle;
        }
        if (curIndex === 0 && index === itemLength - 1) {
            className = styles.left;
            style = leftStyle;
        }
        if (curIndex === itemLength - 1 && index === 0) {
            className = styles.right;
            style = rightStyle;
        }

        return {
            className,
            style
        };
    };

    const getSlides = children => {
        return children.map((item, index) => {
            const { className, style } = getItemProps(index);
            console.log(style);
            return (
                <div
                    key={item.key}
                    className={styles.item + ' ' + className}
                    style={style}
                >
                    <div>{item}</div>
                    <div className={styles.mask} />
                </div>
            );
        });
    };

    const handleClick = () => {
        let index = curIndex + 1;
        index = index > itemLength - 1 ? 0 : index;
        setIndex(index);
    };

    const handleClick2 = () => {
        let index = curIndex - 1;
        index = index < 0 ? itemLength - 1 : index
        setIndex(index);
    };

    return (
        <div className={styles.slide}>
            <div ref={node => setListDOM(node)} className={styles.container}>
                {getSlides(children)}
            </div>
            <div>
                <button onClick={handleClick}>sadadasd</button>
                <button onClick={handleClick2}>sadadasd</button>
            </div>
        </div>
    );
};
