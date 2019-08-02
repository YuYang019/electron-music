
export const USER_LOGIN = 'USER_LOGIN';

function getAction(type, payload) {
    return {
        type,
        payload,
    }
}

export function userLogin() {
  return (dispatch, getState) => {
    const { user } = getState();

    console.log(user)

    setTimeout(() => {
        const data = { name: 'maoyuyang', age: 21 }
        dispatch(getAction(USER_LOGIN, data));
    }, 1000)

  };
}
