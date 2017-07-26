# CONTRIBUTING

Contributing to Distense is different than contributing to many open source software projects.  When contributing to Distense, you can optionally 
receive a reward in the form of a 
DID token. 

### Setting Your Recipient Address

The way Distense issues DID reward to contributors is by issuing DID to an Ethereum address.  If you don't have an Ethereum address you may get one
 for free.  
__Please note that DID are non-transferable, at least for the being, so ensure you have continued access to the Ethereum address to which you receive
DID.__  Because the easiest way to get an Ethereum address is likely to change in the future, please research how to get an Ethereum address
  on your own, probably by using Google.  If you lose access to the Ethereum address you use to receive DID, you will lose the ability to access your 
  DID and we will not be able to help you recover your DID.  
  Therefore it is 
important that you backup in a secure manner your `keystore` file AND your passphrase you use when creating your Ethereum address.

### Automatically Adding Your Ethereum Address to Commits

So that Distense may properly issue DID to the correct contributors in the future, we provide a one-time setup in each of our repositories that 
allows contributors to add their Ethereum address to their local `git config` file.  To auto-append your Ether address to each commit follow these 
steps:

1. Run `npm install` in the repository once you have cloned the repository
2. Run `git config user.distense 0xYourEtherAddressHere`
3. Celebrate being part of the future

Step 2 above will add your Ethereum address to the local `.git/config` file.  

If you re-clone our repositories later, you will need to run the above steps again, unless you make a copy of your local git config file

### Using an ENS Domain as Your Recipient Address

If you own an ENS domain and would like to use an ENS domain to receive DID, feel free to specify your ENS domain name in `git config user.distense
 myName.eth`.  You must ensure your ENS domain resolves to your Ethereum address.  Please google the best way to 
 setup the resolver address as the best way to do so is likely to change over the future and Google will be more helpful than us.  

  
