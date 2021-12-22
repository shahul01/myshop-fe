export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

interface IUserData {
  isUserSignedIn: boolean;
  userId: string;
  email: string;
  username: string;
}

interface IUserDataAction {
  type: string
  user: IUserData;
}

const userReducer = (state: IUserData, action: IUserDataAction) => {
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
        userId: action.user.userId,
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