import { useRouter } from "next/router";
import Link from "next/link";

const Detail = () => {
  const router = useRouter();
  const pageId = router.query.slug;
  let myData = [
    {
      id: 1,
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/815g8Uo656S._AC_UL200_SR200,200_.jpg",
      title: "iTV Apple",
      price: 200.00
    },
    {
      id: 2,
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/713mzPe9SwS._AC_UL200_SR200,200_.jpg",
      title: "Atomic Habits Book",
      price: 10.00
    },
    {
      id: 3,
      imgSrc:
        "https://images-na.ssl-images-amazon.com/images/I/710o0VupScL._AC_UL320_SR320,320_.jpg",
      title: "TShirt",
      price: 20.00
    }]


  return (
    <div>
      {/* <p className="back-btn" onClick={() => router.push('/products')}>Go Back</p> */}
      <Link href="/products">
        <a className="back-btn">
          Go Back
        </a>
      </Link>
      <h1>Title: {myData[pageId-1]?.title}</h1>
      <img src={myData[pageId-1]?.imgSrc} alt="" className="item-image"/>
      <h3>Price: {myData[pageId-1]?.price}</h3>


    </div>
  )
}

export default Detail;