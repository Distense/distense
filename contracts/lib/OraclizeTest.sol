pragma solidity ^0.4.11;
import "./oraclizeAPI_0.4.sol";


contract OraclizeTest is usingOraclize {

//    bytes[] private commitHashes;
        string private githubUserName;

//    struct Commit {
//        bytes32[] commitHash;
//        string githubUserName;
//        bytes32[] timestamp;
//    }

    event LogContribution(string githubUserName);

    function OraclizeTest()  {
        getLatestContributors();
    }

    // Allow owner to call this function to stop querying the Github API for new contributors
    // We may wish to change the interval or use a different contract altogether
    function ceaseQueryingContributors() {

    }

    function __callback(string result) {
        if (msg.sender != oraclize_cbAddress()) {
            throw;
        }

//        uint commitsLength = result.length;
//
//        bytes32[] memory commitHashes = new bytes32[](commitsLength);
//
//        for (uint i = 0; i < commitsLength; i++) {
//            string currentCommit = result[i];
//            commitHashes[i] = currentCommit.sha;
//            githubUserName = result;
            LogContribution(result);
//        }
    }

    function getLatestContributors()  {
        oraclize_query(10, "URL",
        "json(json(https://api.github.com/repos/Distense/contracts/commits).[0].committer.login");
    }
}


