interface IModel {
  id: number;
  created_at: string;
  updated_at: string;
}

interface IModelImageMetaData {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string|null
  size: number;
  width: number;
  height: number;
}

interface IModelImage extends IModel, IModelImageMetaData {
  name: string;
  alternativeText: string;
  caption: string;
  formats: {
    thumbnail?: IModelImageMetaData;
    small?: IModelImageMetaData;
    medium?: IModelImageMetaData;
    large?: IModelImageMetaData;
  }
  previewUrl: string|null;
  provider: string;
  provider_metadata: null|any;
}

interface IUserData {
  isUserSignedIn: boolean;
  userId: string;
  email: string;
  username: string;
}

interface IUserDataAction {
  type: string
  user: IUserData;
}

interface IModelUser extends IModel, IUserData {
  provider: string;
  confirmed: boolean|null;
  blocked: boolean|null;
  role: number;
  addressess: IAddressForm|null;
}

interface IAddressForm {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  fullName: string;
  phoneNumber: string;
  id: number;
  users_permissions_user?: IModelUser|null;
}

interface ICart {
  id: number;
  imgSrc: string;
  key: string;
  price: number;
  productId: number;
  title: string
}

interface ICartAction {
  type: string;
  cart: ICart;
}

interface IModelReview {
  reviewId: string;
  asin: string;
  username: string;
  title: string;
  avatar: string;
  rating: number;
  review: string;
}

interface IModelProduct extends IModel {
  asin: string;
  title: string;
  price: number;
  productId: string;
  ratings: number;
  featureBullets: string;
  description: string;
  ratingVotes: number;
  reviews: IModelReview[];
  images: string[];
}

interface IProductAction {
  type: string;
  productList: IModelProduct;
}

interface IHistProduct {
  clickedDetails?: number;
}
