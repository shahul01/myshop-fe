// import styles from "./accdetails.modules.css";
import { useState } from "react";
import Input from "components/Elements/Input/index";
import { postAddress } from "./_api/detailsApi";

const AccDetails = () => {

  // useEffect(() => {
  //   // load address
  // }, [])

  const [ addressForm, setAddressForm ] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    fullName: '',
    phoneNumber: '',
  });

  function handleChange(e) {
    // if (e?.target?.value) return;

    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value
    });
  };

  function handleSubmit(e, submittedForm) {
    e.preventDefault();
    // if (!submittedForm.street) return

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