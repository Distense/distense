//pragma experimental ABIEncoderV2;
pragma solidity ^0.4.17;

import './DIDToken.sol';
import './lib/SafeMath.sol';

contract Distense {
  using SafeMath for uint256;

  DIDToken didToken;
  address DIDTokenAddress;

  bytes32[] public parameterTitles;

  struct Parameter {
    bytes32 title;
    uint256[] voteValues;
    mapping (address => Vote) votes;
  }

  struct Vote {
    address voter;
    uint256 lastVoted;
  }

  /*
    Distense' votable parameters
    Parameter is the perfect word for these: "a numerical or other measurable factor forming one of a set
    that defines a system or sets the conditions of its operation".
  */
  mapping (bytes32 => Parameter) public parameters;

  Parameter proposalPctDIDApprovalParameter;
  bytes32 public proposalPctDIDApprovalTitle = "proposalPctDIDApprovalThreshold";

  Parameter pullRequestNumApprovalsParameter;
  bytes32 public pullRequestNumApprovalsParameterTitle = "pullRequestNumApproversThreshold";
  uint256 public votingInterval;  // Period of time between when voters can update these Distense parameters

  event LogParameterValueUpdate(bytes32 title, uint256 value);

  function Distense(address _DIDTokenAddress) public {

    DIDTokenAddress = _DIDTokenAddress;

    // Launch Distense with some pre-configured parameters
    proposalPctDIDApprovalParameter = Parameter({
      title : proposalPctDIDApprovalTitle,
      voteValues: new uint256[](0)
    });

    pullRequestNumApprovalsParameter = Parameter({
      title : pullRequestNumApprovalsParameterTitle,
      voteValues: new uint256[](0)
    });

    votingInterval = 15 days;
  }
  
  function voteOnParameter(bytes32 _title, uint256 _newValue) public hasDid longEnoughSinceVotedOnParameter(msg.sender, _title, _newValue) returns
    (uint256) {
    Parameter storage parameter = parameters[_title];
    parameter.voteValues.push(_newValue);
  }

  function getParameterByTitle(bytes32 _title) public view returns (bytes32, uint256, uint256[]) {
    Parameter memory param = parameters[_title];
    uint256 value = determineParameterValue(_title);
    return (param.title, value, param.voteValues);
  }

  function determineParameterValue(bytes32 _title) public view returns (uint256) {

//    Parameter storage _parameter = parameters[_title];
//    address voter = msg.sender;
//
//    uint256 numVotes = _parameter.voteValues.length;
//
//    if (numVotes == 1) return _parameter.voteValues[0];
//
//    uint256 voteSum = 0;
//    for (uint32 i = 0; i <= numVotes; i++) {
//      voteSum += _parameter.voteValues[i];
//      didToken = DIDToken(DIDTokenAddress);
//      uint256 voterDIDBalance = didToken.balances(voter);
//      uint256 totalSupply = didToken.balances(voter);
//      uint256 voterWeight = voterDIDBalance.div(totalSupply);
//    }
//
//    uint256 newValue = voteSum.div(numVotes);
//    LogParameterValueUpdate(_title, value);
//    return value;
  }

  function getNumParameters() public view returns (uint256) {
    return parameterTitles.length;
  }

  modifier longEnoughSinceVotedOnParameter(address _voter, bytes32 _title, uint256 _newValue) {
    Parameter storage parameter = parameters[_title];
    uint256 lastVotedOnParameter = parameter.votes[_voter].lastVoted;
    require(now >= lastVotedOnParameter + votingInterval);
    _;
  }

//  TODO
  modifier hasDid() {
    require(didToken.balances(msg.sender) > 0);
    _;
  }

}

