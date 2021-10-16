import { useState, useEffect } from "react";
// import { UserContext } from "helpers/Contexts/UserContext";
import getLocalUser from "helpers/Functions/getLocalUser";
import Input from "components/Elements/Input/index";
import { getAddress, postAddress } from "./_api/detailsApi";
// import styles from "./accdetails.modules.css";


const AccDetails = () => {


  // const { user, dispatch } = useContext(UserContext);

  let userAxiosGet = {};
  const [isPut, setIsPut] = useState(false);
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

  useEffect( async () => {
    await setUserAxiosPost(getLocalUser())
    await getUser();
    await loadAddress();
    console.log('use effect runs');
  }, []);

  async function getUser() {
    const tempUser = await getLocalUser();
    if (!tempUser) return;
    userAxiosGet = tempUser
    console.log(`userAxiosGet: `, userAxiosGet);
    return userAxiosGet;
  };

  async function loadAddress() {
    console.log(`userAxiosGet: `, userAxiosGet);
    // console.log(`userAxiosPost: `, userAxiosPost);
    if(!userAxiosGet?.user?.id) return;
    let myAdr = await getAddress(userAxiosGet?.user?.id);
    // let myAdr = await getAddress(userAxiosPost?.user?.id);
    if (myAdr.length >= 1) {
      setAddressForm(myAdr[0]);
      setIsPut(true);
    };

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

    </div>
  )
}

export default AccDetails;