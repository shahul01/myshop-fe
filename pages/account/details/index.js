import { useState, useEffect, useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import getLocalUser from "helpers/Functions/getLocalUser";
import Input from "components/Elements/Input/index";
import { getAddress, postAddress } from "./_api/detailsApi";
// import styles from "./accdetails.modules.css";


const AccDetails = () => {


  const { user, dispatch } = useContext(UserContext);

  let userAxiosGet = {};
  const [isPut, setIsPut] = useState(false);
  const [ userState, setUserState ] = useState({});
  const [ isLoadDom, setIsLoadDom ] = useState(false);
  const [ userAxiosPost, setUserAxiosPost ] = useState({});
  const [ addressForm, setAddressForm ] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    fullName: '',
    phoneNumber: '',
  });
  let alertSetUserAxiosPost = {};
  // let tempGetUser = '';
  // let tempLoadAddress = '';

  useEffect( async () => {
    let tempUserFetch = getLocalUser();
    if (tempUserFetch) {
      await setUserAxiosPost(tempUserFetch)
    }
    // const tempUser = await getLocalUser();
    // if (tempUser) {
    //   alertSetUserAxiosPost = tempUser
    // };
    await getUser();
    await loadAddress();
    // console.log(`alertSetUserAxiosPost 0: `, alertSetUserAxiosPost);
    // console.log(`userAxiosGet: `, userAxiosGet);
    // console.log(`userAxiosPost: `, userAxiosPost);
  }, []);

  // useEffect(() => {
  //   // setUserAxiosPost(alertSetUserAxiosPost);
  //   // console.log(`alertSetUserAxiosPost: `, alertSetUserAxiosPost);
  // }, [alertSetUserAxiosPost])
  async function getUser() {
    userAxiosGet = await getLocalUser();
    // console.log(`userAxiosGet: `, userAxiosGet);
    return userAxiosGet;
  };

  useEffect(() => {
    // if (typeof window !== undefined) {
      // setUserState(user);
      // console.log(`userState: `, userState);
      // console.log(`userState: `, userState);

      console.log(`user: `, user);
      setTimeout(() => {
        loadAddress();

      }, 4000)
      // if(user.username !== '') {
      //   setIsLoadDom(true);
      // }
      console.log(`isLoadDom: `, isLoadDom);
    // };
  }, [user])


  async function loadAddress() {
    // console.log(`userAxiosGet: `, userAxiosGet);
    // console.log(`userAxiosPost: `, userAxiosPost);
    console.log(`user: `, user);


    // if(user.username !== '') {
    //   setIsLoadDom(true);
    // };
    // if(!userAxiosGet?.user?.id) return;
    if(!user?.userId) return;
    let myAdr = await getAddress(user?.userId);
    // let myAdr = await getAddress(userAxiosPost?.user?.id);
    if (myAdr.length >= 1) {
      setAddressForm(myAdr[0]);
      setIsPut(true);
    };
    setIsLoadDom(true);
    console.log(`addressForm: `, addressForm);
    console.log('loadAddress runs');
  };

  function handleChange(e) {
    // if (e?.target?.value) return;

    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e, submittedForm) {
    e.preventDefault();
    // if (!submittedForm.fullName) return
    const toSubmitForm = {
      ...submittedForm,
      users_permissions_user: userAxiosPost?.user?.id
    };
    // console.log(`userAxiosPost: `, userAxiosPost);
    // const resPost = await postAddress(submittedForm);
    if(!isPut) {
      const resPost = await postAddress(toSubmitForm);
      console.log(`resPost: `, resPost);

    } else {
      // put
    }

    loadAddress();
    // resetForm();
  };

  function resetForm() {
    setAddressForm({
      street: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      fullName: '',
      phoneNumber: '',
    });
  }

  return (
    <div>

      <h2>Address Form</h2>
      {/* className="address-form-container" */}
      {/* {console.log(`isLoadDom dom: `, isLoadDom)} */}
      {!isLoadDom ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <form onSubmit={(e) => handleSubmit(e, addressForm)} >
          <Input
            className = 'acc-val-ipt'
            name = 'street'
            title = 'Street'
            value = {addressForm.street}
            onChange = {handleChange}
          />

          <Input
            className = 'acc-val-ipt'
            name = 'city'
            title = 'City'
            value = {addressForm.city}
            onChange = {handleChange}
          />

          <Input
            className = 'acc-val-ipt'
            name = 'state'
            title = 'State'
            value = {addressForm.state}
            onChange = {handleChange}
          />

          <Input
            className = 'acc-val-ipt'
            name = 'country'
            title = 'Country'
            value = {addressForm.country}
            onChange = {handleChange}
          />

          <Input
            className = 'acc-val-ipt'
            name = 'zip'
            title = 'ZIP Code'
            value = {addressForm.zip}
            onChange = {handleChange}
          />

          <Input
            className = 'acc-val-ipt'
            name = 'fullName'
            title = 'First and last name'
            value = {addressForm.fullName}
            onChange = {handleChange}
          />

          <Input
            className = 'acc-val-ipt'
            name = 'phoneNumber'
            title = 'Phone number'
            type='number'
            value = {addressForm.phoneNumber}
            onChange = {handleChange}
          />
          <button type="submit" className="button">Submit</button>


        </form>

      )}

    </div>
  )
}

export default AccDetails;