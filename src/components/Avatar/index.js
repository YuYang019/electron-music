import React, { useEffect } from 'react';
import styles from './index.module.less';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserAction from '@/actions/user';
import avatar from '@/assets/avatar.png'

// 想用什么map什么

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(UserAction, dispatch);
}

const Avatar = props => {
    const { user, userLogin } = props;
    console.log(props);

    useEffect(() => {
        userLogin();
    }, []);

    return (
        <div className={styles.avatar}>
            <img className={styles.avatarImg} alt='avatar' src={avatar} />
            <div className={styles.bottom}>
                <p className={styles.name}>{ user ? user.name : '未登录' }</p>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Avatar);
