import React, { useState } from 'react';
import TabPane from './TabPane';
import TabBar from './TabBar';

import styles from './index.module.less';

function getTabBar(children) {
    const bar = [];
    React.Children.forEach(children, child => {
        let { props: { tab, tabKey } } = child
        if (typeof tab === 'function') {
            tab = tab()
        }
        if (tabKey) {
           bar.push({
               key: tabKey,
               tab: tab || ''
           })
        }
    });
    return bar;
}

export const Context = React.createContext({
    activeKey: null,
    setKey: () => {}
});

const Tabs = props => {
    const { children, defaultKey } = props;
    const [ activeKey, setKey ] = useState(null);
    
    const bar = getTabBar(children);
    console.log(bar);

    if (!bar.length) {
        console.error('请设置 TabPane 的 key');
        return;
    }

    return (
        <Context.Provider value={{
            activeKey: activeKey || defaultKey || bar[0].key,
            setKey: (key) => setKey(key)
        }}>
            <div>
                <TabBar bar={bar} />
                { children }
            </div>
        </Context.Provider>
    );
};

export default {
    Tabs,
    TabPane
};
