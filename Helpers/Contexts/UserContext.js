import { createContext, useReducer, useEffect  } from 'react';
import userReducer, { SET_USER } from "../Reducers/userReducer";
// import useFetch from "../Hooks/useFetch";

export const UserContext = createContext();

const UserContextProvider = (props) => {

  // let { data: userFetch, error, isPending } = useFetch('http://localhost:1337/')

  const [ user, dispatch ] = useReducer(userReducer, {}, () => {
    // if (typeof window !== undefined) {
    //   const localUserData = localStorage.getItem('__userData');
    //   console.log(`localUserData: `, localUserData);
    //   return localUserData ? JSON.parse(localUserData) : {};
    // } else {
    //   console.log('hello');
    // };
    return {};

  });

  // COMMT: Intialise reducer w/ user data from local storage.
  useEffect(() => {
    if (typeof window === undefined) return;
    // const localUserDataUnparsed = localStorage.getItem('__userData');
    const localUserDataUnparsed = localStorage.getItem('__userAuth');
    if (!localUserDataUnparsed) return;
    const localUserData = JSON.parse(localUserDataUnparsed);
    console.log(`localUserData: `, localUserData);
    if (!localUserData?.user?.id) return;
    dispatch({
      type: SET_USER, user: {
        isUserSignedIn: true,
        userId: localUserData.user.id,
        email: localUserData.user.email,
        username: localUserData.user.username
      }
    });

  }, []);

  // setTimeout(() => {
    // console.log(`user 2: `, user);
  // }, 1000)

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;