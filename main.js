const serverUrl = "https://navnhobfzdky.usemoralis.com:2053/server";
const appId = "3yxp9wZBmrsGeBOufBZWhEvX9klYwmHdjx3JMCpn";
Moralis.start({ serverUrl, appId });
let loggedIn = false;

async function login() {
  console.log("Logging in")
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        loggedIn = true;
        displayLogOut();
      })
      .catch(function (error) {
        console(error);
      });
  
  }
  let myNFTs = await Moralis.Web3API.account.getNFTs()
  getNftData()
  console.log(myNFTs)
}

function displayLogOut(){
  console.log("displayLogOutFunction")
if(loggedIn == true){
  document.getElementById("btn-logout").hidden = false;
  document.getElementById("btn-login").hidden = true;
  document.getElementById("form-el").hidden = false;
  document.getElementById("nft-display-el").hidden = false;
}
}


async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  document.getElementById("btn-logout").hidden = true;
  document.getElementById("btn-login").hidden = false;
  document.getElementById("form-el").hidden = true;
  document.getElementById("nft-display-el").hidden = true;
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;

async function getNftData(){
  let getNfts = await Moralis.Web3API.account.getNFTs();
  let res = getNfts.result;
  let nft0 = res[0]
  document.getElementById("nft1").textContent = "#1"
  document.getElementById("nft1TokenAddress").textContent = "Token Address: " + nft0.token_address;

  let imageIndex = nft0.metadata.search("image")
  let ipfsLinkStart = imageIndex + 8;
  let ipfsEnd = nft0.metadata.search("attributes") - 4;
  console.log(nft0.metadata[ipfsLinkStart])
  console.log(nft0.metadata[ipfsEnd])
  let ipfsLink = "";
  for(var i =ipfsLinkStart; i <=ipfsEnd; i++){
      ipfsLink += nft0.metadata[i];
  }
  console.log(ipfsLink)
  document.getElementById("img0").src = ipfsLink;
  document.getElementById("img0").hidden = false;
}

function transfer(){
  let value = document.getElementById("input-num-el").value;
  let add = document.getElementById("input-address-el").value;
  console.log(value)
  console.log(add)
  Moralis.transfer({type:"native",receiver:add,amount:Moralis.Units.ETH(value)})
}
