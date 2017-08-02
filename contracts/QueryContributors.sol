pragma solidity ^0.4.11;
import "./oraclizeAPI_0.4.sol";


contract QueryContributors is usingOraclize {

    event LogContribution(string indexed githubUserName);

    function QueryContributors()  {
        getLatestContributors();
    }

    function __callback(string result) {
        if (msg.sender != oraclize_cbAddress()) {
            revert;
        }

            LogContribution(result);
    }

    function getLatestContributors()  {
        oraclize_query(35, "URL",
        "json(https://api.github.com/repos/Distense/contracts/commits).[0].committer.login");
    }
}


