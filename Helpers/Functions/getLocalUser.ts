export default function getLocalUser() {

  if(typeof window === undefined) return;

  let localUser = localStorage.getItem('__userAuth');
  if (!localUser) return;
  localUser = JSON.parse(localUser);
  // console.log(`localUser 00: `, localUser);

  return localUser;
}