# furni-mobile-app
## Setting up
### Prerequisities
1. [`node` and `npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. `expo` - Run `npm install expo-cli --global` in the terminal to install.
3. [`git`](https://git-scm.com/downloads)

### Setup instructions
1. Fork this repo, and clone the fork to your computer
2. Run `npm install`
3. Run `expo start` to run Expo DevTools on localhost
4. Ways to run the app
   1. On a physical device via Internet connection: 
      1. First install Expo Client on your mobile device
      2. In Expo DevTools, if connection is set to LAN, ensure that both the computer and mobile device are connected to the same wireless network. Otherwise set the connection to Tunnel.
      3. Scan the QR code displayed on Expo DevTools using the Expo Client app. 
   2. On a physical Android device connected via USB port
      1. [From Expo DevTools](https://medium.com/@psyanite/how-to-connect-expo-to-usb-android-device-16b83ff67428)
      2. Alternatively, if the device is installed with at least Android 5.0 and USB debugging is enabled, skip step 3 and run `expo start --localhost --android`
   3. On a mobile simulator:
      1. [Android](https://docs.expo.io/workflow/android-studio-emulator/)
      2. [iOS](https://docs.expo.io/workflow/ios-simulator/)

Note: please do not view the app on browser using Expo webpack because the code is not tested and specifically configured to work on Expo web build.

## Application Design
### Architecture
<img src="https://user-images.githubusercontent.com/58513950/94107593-686d3080-fe70-11ea-9934-45412709ffb3.png" alt="architecture diagram" width="800" />

### Security implementation
Basic implementation of authentication using JSON web token
- On login, the user is issued an access token, which contains all information required to validate his rights to access protected resources.
- All requests to protected resources must contain the access token (in the `Authorization` header) as a means of authentication and user rights validation.
<img src="https://user-images.githubusercontent.com/58513950/94107815-c8fc6d80-fe70-11ea-9431-47044d8e3a42.png" alt="login diagram" width="800" />

Desired outcomes
- A user should be able to maintain a persistent logged-in state as far as possible. In other words, he should be able to successfully make requests to protected resources without having to log in again.
- If the access token is leaked, any potential attacks should be prevented. If this is not possible, the next best alternative would be to minimize the amount of impact that an attacker can make.

Overview of the proposed authentication design
- A user on login is issued a pair of a short-lived access token and a long-lived refresh token. During this process, the server generates a unique identifier, that is both encoded in the refresh token and saved in the database.
- Once the access token expires, the user uses the refresh token to request the server for a new pair of tokens.
- If the id of the refresh token is found in the database and the corresponding access token has not expired, the request to renew tokens is valid. The server then deletes this id from the database and issues a new pair of tokens in response to the client.
- If the request to renew tokens is not valid, the server deletes the token id from the database and does not issue any new tokens.

Analysis of the proposed authentication design
- A user can stay logged-in indefinitely, as long as he does not stay inactive for a duration longer than the lifespan of a refresh token.
- Because a new pair of access token and refresh token is issued every time the user logs in or renews the token, the single token id stored in the database identifies both tokens in a pair, not just the refresh token.
- If an access token is leaked, the attack window is short because of the short lifespan of the access token.
- When a refresh token is leaked:
  - If the attacker makes a request to renew tokens before the expiry of the corresponding access token, this would be deemed an invalid request. The server then deletes the refresh token id from the database, thereby invalidating it. The user would then fail to renew tokens, be forced to log out and required to log in again. No attacks can be made.
  - The refresh token does not contain any information about the expiry of the corresponding access token. It is thus unlikely that an attacker is able to make a valid request to renew tokens.
  - Furthermore, when the user makes a valid request to renew tokens, the leaked refresh token is invalidated and no attacks can be made.
  - Attack case 1: The only instance that an attack can be made is when the user stays inactive for too long, that is the access token has expired. Then the attacker can successfully make a request to renew tokens.
- Attack case 2: If both the access token and refresh tokens are leaked, the attacker can potentially make a valid request to renew tokens before the user.
- In both two attack cases, the attacker can only make a valid renew token request only if he knows (1) the API endpoint to renew tokens, and (2) the requirements for which a request to renew tokens is valid. Since these two pieces of knowledge will not be public, it is unlikely that an attack can be made.
<img src="https://user-images.githubusercontent.com/58513950/94108884-ad926200-fe72-11ea-8cf2-2cc92944e811.png" alt="refresh token diagram" widith="800" />

Implementation details
- Encoded in the payload of the access token are the `userId` and the `role` of the user. These are sufficient information to validate the rights of the user to perform an operation on protected resources.
- The unique identifier for a token pair is a version 4 uuid. This id is encoded as the `jid` field (JWT token identifier) of the payload in the refresh token.
- Besides the `jid`, the `userId` and the `role` of the user are also encoded in the payload of the refresh token. This enables the server to issue a new pair of tokens with the same information to validate rights to perform operations on protected resources.

Token lifecycle

 &#xfeff;| Access Token | Refresh Token 
 --------|--------------|---------------
 Gets created | On login or calling refreshToken API | On login or calling refreshToken API
 Expiry | Short | Long
 Becomes invalid | When expires | When expires, a new pair of tokens is issued, or an illegal attempt to renew tokens is made
 
 ### Database
 <img src="https://user-images.githubusercontent.com/58513950/94110801-c05a6600-fe75-11ea-8046-5d9ddf17e240.png" alt="database schema" width="800" />
 
 ### Machine learning: furniture classifier
 - Multiclass classifier for furniture types, styles, and materials
 - Transfer learning
 - Bonn Furniture Styles dataset
 <img src="https://user-images.githubusercontent.com/58513950/94112533-2d6efb00-fe78-11ea-9322-a17f82c927cc.png" width="800" />
 <img src="https://user-images.githubusercontent.com/58513950/94112623-4b3c6000-fe78-11ea-895b-abee72756bfb.png" width="800" />
