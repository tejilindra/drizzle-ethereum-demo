This project is to demonstrate the DApp which creates a smart contract build, deployed on ethereum blockchain using drizzle, react, solidity and other utility tools.

1. Clone the project
2. Run the following truffle commands in one terminal to compile, migrate smart contract:
   ```
   npm install
   npm i -g truffle
   truffle develop
   truffle compile
   truffle migrate --network development
   ```
3. Run the following commands in second terminal to run the dApp on the browser:
   ```
   cd app/
   npm install
   npm run start:dev
   ```
4. Application should be up and running on port:8080 and install Metamask plugin in the browser