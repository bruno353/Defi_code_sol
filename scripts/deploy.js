const { ethers } = require("hardhat");



async function main() {
    



  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account: ' + deployer.address);

  // Deploy First
    const First = await ethers.getContractFactory('DappToken');
    const first = await First.deploy();

  // Deploy Second
    const Second = await ethers.getContractFactory('TokenFarm');
    const second = await Second.deploy(first.address);

   console.log( "First: " + first.address );
   console.log( "Second: " + second.address ); 

   //adding allowed tokens in the contract:
   //dai_price_feed and eth_usd_price_feed
   const dapp_token = first.address;
   const fau_token = '0xfab46e002bbf0b4509813474841e0716e6730136';
   const weth_token =  '0xc778417E063141139Fce010982780140Aa0cD5Ab';

   add_tx = await second.addAllowedTokens(dapp_token, {"from": deployer.address});
   set_tx = await second.setPriceFeedContract(
    dapp_token, '0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF', {"from": deployer.address}
   );

   add_tx = await second.addAllowedTokens(fau_token, {"from": deployer.address});
   set_tx = await second.setPriceFeedContract(
    fau_token, '0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF', {"from": deployer.address}
   );

   add_tx =  await second.addAllowedTokens(weth_token, {"from": deployer.address});
   set_tx =  await second.setPriceFeedContract(
    weth_token, '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e', {"from": deployer.address}
   ) ;

   //transfering dapp_tokens to TokenFarm

   tx = await first.transfer(first.address, first.totalSupply(), {"from": deployer.address});
   console.log("Finalizado");




}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
})