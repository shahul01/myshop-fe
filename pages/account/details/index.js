// import styles from "./accdetails.modules.css";
import { useState, useEffect } from "react";
import Input from "components/Elements/Input/index";
import { getAddress, postAddress } from "./_api/detailsApi";

const AccDetails = () => {

  const [address, setAddress]  = useState({});
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
    // load address
    loadAddress();
  }, [])

  async function loadAddress() {
    let myAdr = await getAddress()
    // setAddress(myAdr.data);


    console.log(`myAdr: `, myAdr);
    console.log(`loadedAdr: `, address);
  }

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
    await postAddress(submittedForm);

    console.log(`submittedForm: `, submittedForm);
    resetForm();
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