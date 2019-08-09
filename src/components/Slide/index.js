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

    if (listDOM && !listWidth) {
        const width = getEleStyle(listDOM, 'width');
        listWidth = width;

        const items = listDOM.children;
        if (items && items.length && !itemLength && !itemHeight) {
            const item = items[0];
            const width = getEleStyle(item, 'width');
            const height = getEleStyle(item, 'height');

            itemLength = listDOM.children.length;
            itemHeight = height;
            itemWidth = width;
            leftStyle = {
                // left: `${0 - (0.2 * width / 2)}px`,
                // transform: ['scale(0.8)']
                transform: [`translateX(${0 - (0.2 * width / 2)}px) scale(0.8)`]
            };
            middleStyle = {
                // left: `${(listWidth - width) / 2}px`,
                // transform: ['scale(1)'],
                transform: [`translateX(${(listWidth - width) / 2}px) scale(1)`]
            };
            rightStyle = {
                // left: `${(listWidth - width + (0.2 * width / 2))}px`,
                // transform: ['scale(0.8)'],
                transform: [`translateX(${(listWidth - width + (0.2 * width / 2))}px) scale(0.8)`]
            };
        }
    }

    const getItemProps = index => {
        let className = '';
        let style = {
            // left: `${(listWidth - itemWidth * 0.8) / 2}px`,
            // transform: ['scale(0.8)']
            transform: [`translateX(${(listWidth - itemWidth * 0.8) / 2}px) scale(0.8)`]
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

    const getPointer = children => {
        const length = children.length;
        const pointers = []
        for (let i = 0; i < length; i++) {
            let pointer
            let className = ''
            if (i === curIndex) {
                className = styles.pointer + ' ' + styles.active
            } else {
                className = styles.pointer
            }
            pointer = (
                <div key={i} data-index={i} onMouseEnter={handleMouseEnter} className={styles.pointerWrapper}>
                    <div className={className}></div>
                </div>
            )
            pointers.push(pointer)
        }
        return pointers
    }

    function handleMouseEnter (e) {
        const index = +e.currentTarget.getAttribute('data-index');
        if (curIndex !== index) {
            setIndex(index);
        }
    }

    function goNext() {
        let index = curIndex + 1
        index = index > itemLength ? 0 : index;
        setIndex(index)
    }

    function goPre() {
        let index = curIndex - 1
        index = index < 0 ? itemLength - 1 : index;
        setIndex(index)
    }

    return (
        <div className={styles.slide}>
            <div ref={node => setListDOM(node)} className={styles.container}>
                {getSlides(children)}
            </div>
            <div className={styles.pointerContainer}>
                {getPointer(children)}
            </div>
        </div>
    );
};
