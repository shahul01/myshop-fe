import { useState, useEffect, useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";
import Input from "components/Elements/Input/index";
import { getAddress, postAddress, putAddress } from "./_api/detailsApi";
// import styles from "./accdetails.modules.css";


const AccDetails = () => {

  const { user } = useContext(UserContext);
  const [isPut, setIsPut] = useState(false);
  const [ isLoadDom, setIsLoadDom ] = useState(false);
  const [ addressForm, setAddressForm ] = useState<IAddressForm>({
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    fullName: '',
    phoneNumber: '',
    id: 0
  });

  // COMMT: useful code - updates data / calls fn when 2nd dependency gets data later.
  /* Eg:

    useEffect(() => {
      newData = contextData
    }, [contextData]);

  */
  useEffect(() => {
    loadAddress();
  }, [user])

  async function loadAddress() {
    // COMMT: context was giving val but I passed wrong guard clause, which I knew after console logging
    if(!user?.userId) return;
    setIsLoadDom(false);
    let myAdr = await getAddress(user?.userId);
    if (myAdr.length >= 1) {
      setAddressForm(myAdr[0]);
      setIsPut(true);
    };
    setIsLoadDom(true);
  };

  function handleChange(e: MouseEvent) {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value
    });
  };

  async function handleSubmit(e:MouseEvent, submittedForm: IAddressForm) {
    e.preventDefault();
    if (!submittedForm.fullName || !user?.userId) return
    const toSubmitForm: IAddressForm = {
      ...submittedForm,
      users_permissions_user: user.userId
    };
    if(!isPut) {
      const resPost = await postAddress(toSubmitForm);

    } else {
      const resPut = await putAddress(toSubmitForm)
    }

    loadAddress();
  };

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