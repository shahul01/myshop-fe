import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "helpers/Contexts/UserContext";


const Account = () => {

  const router = useRouter();
  const { user, dispatch } = useContext(UserContext);

  // COMMT: TODO: make the following push work
  // if (!user.isUserSignedIn) () => return router.push('/account/validation');
  return (
    <div>
      {/* <button
        className="button"
        onClick={() => router.push('/account/validation')}
      >
        Go to Registration / Sign in page
      </button> */}

      <button
        className="button"
        onClick={() => router.push('/account/details')}
      >
        Go to Account details
      </button>
    </div>
  )
}
export default Account;