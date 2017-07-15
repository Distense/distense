pragma solidity ^0.4.11;


contract Contributors {

    Contributor[] public contributors;

    struct Contributor {
//    address contribAddress;
    bytes32 name;
    }

    function addContributor(/*address _ethAddress, */bytes32 _name) returns (bool success) {

        Contributor memory newContributor;
//        newContributor.contribAddress = _ethAddress;
        newContributor.name = _name;

        contributors.push(newContributor);
        return true;
    }

    function getContributors() constant returns (bytes32[]) {

        // set contributors.length var to prevent length of array being looked up each iteration
        uint contributorsLength = contributors.length;

//        address[] memory addresses = new address[](contributorsLength);
        bytes32[] memory names = new bytes32[](contributorsLength);

        for (uint i = 0; i < contributorsLength; i++) {
            Contributor memory currentContrib;
            currentContrib = contributors[i];
            names[i] = currentContrib.name;
//            addresses[i] = currentContrib.contribAddress;
        }

        return (/*addresses,*/ names);
    }

}
