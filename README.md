# furni-mobile-app

### Prerequisities
1. [`node` and `npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. `expo` - Run `npm install expo-cli --global` in the terminal to install.
3. [`git`](https://git-scm.com/downloads)

### Setup instructions
1. Download project `git clone https://github.com/TanHaus/furni-mobile-app.git` in terminal
2. Run `cd furni-mobile-app` to go into the `furni-mobile-app` directory 
3. Run `npm install`
3. Run `expo start`
4. Scan the QR code with Expo mobile app to view the app.

### Technologies
- npm
- react-native
- expo
- react-navigation 
- AWS

### Client's local store
```javascript
auth: {
  token: {
    access_token: String,
    refresh_token: String,
    token_type: String
  },
  user: {
    userId: Integer,
    role: String
  },
  loginLoading: Boolean,
  authLoading: Boolean,
  isAuthenticated: Boolean,
  logoutLoading: Boolean,
  renewTokenLoading: Boolean
},
users: {
  users: Array,
  user: {
    userId: Integer,
    name: String,
    email: String,
    profilePicUrl: String
  },
  userListings: Array,
  createUserLoading: Boolean,
  getUserLoading: Boolean,
  editUserLoading: Boolean,
  deleteUserLoading: Boolean,
  getUserListingsLoading: Boolean
},
listings: {
  listings: Array,
  listing: {
    listingId: Integer,
    sellerId: Integer,
    title: String,
    timeCreated: Datetime,
    timeSold: Datetime,
    price: Decimal,
    itemCondition: String, ('new', 'used')
    description: String,
    category: String,
    deliveryOption: String,
    status: String ('open', 'closed')
  },
  createListingLoading: Boolean,
  getListingsLoading: Boolean,
  getListingLoading: Boolean,
  editListingLoading: Boolean,
  deleteListingLoading: Boolean
}
```