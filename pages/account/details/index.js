import { useState, useEffect, useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import Input from "components/Elements/Input/index";
import { getAddress, postAddress, putAddress } from "./_api/detailsApi";
// import styles from "./accdetails.modules.css";


const AccDetails = () => {

  const { user } = useContext(UserContext);
  const [isPut, setIsPut] = useState(false);
  const [ isLoadDom, setIsLoadDom ] = useState(false);
  const [ addressForm, setAddressForm ] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    fullName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    loadAddress();
  }, [user])

  async function loadAddress() {
    setIsLoadDom(false);
    if(!user?.userId) return;
    let myAdr = await getAddress(user?.userId);
    if (myAdr.length >= 1) {
      setAddressForm(myAdr[0]);
      setIsPut(true);
    };
    setIsLoadDom(true);
  };

  function handleChange(e) {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e, submittedForm) {
    e.preventDefault();
    if (!submittedForm.fullName || !user?.userId) return
    const toSubmitForm = {
      ...submittedForm,
      users_permissions_user: user.userId
    };
    if(!isPut) {
      const resPost = await postAddress(toSubmitForm);
      // console.log(`resPost: `, resPost);

    } else {
      const resPut = await putAddress(toSubmitForm)
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