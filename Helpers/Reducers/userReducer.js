export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

const userReducer = (state, action) => {
  let userData = {
    isUserSignedIn: false,
    userId: '',
    email: '',
    username: ''
  };
  switch(action.type) {
    case SET_USER:
      userData = {
        isUserSignedIn: true,
        userId: action.user.id,
        email: action.user.email,
        username: action.user.username
      };
      return userData;

    case UNSET_USER:
      userData = {
        isUserSignedIn: false,
        userId: '',
        email: '',
        username: ''
      };
      return userData;


    default:
      return state;
  }

}

export default userReducer;