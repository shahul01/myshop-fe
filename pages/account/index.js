import { useRouter } from "next/router";


const Account = () => {

  const router = useRouter();

  return (
    <>
      <button className="button" onClick={() => router.push('/account/validation')}>
        Go to account validation
      </button>
    </>
  )
}
export default Account;