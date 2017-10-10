//pragma experimental ABIEncoderV2;
pragma solidity ^0.4.17;

import './lib/StringArrayUtils.sol';
import './lib/StringArrayUtils.sol';
import './DIDToken.sol';


contract Distense {
  using StringArrayUtils for string[];

  DIDToken didToken;
  address DIDTokenAddress;
//
  bytes32[] public parameterTitles;

  struct Parameter {
    bytes32 title;
    uint256 value;
    Vote[] voteValues;
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


  function Distense(address _DIDTokenAddress) internal {
    DIDTokenAddress = _DIDTokenAddress;

    // Launch Distense with some pre-configured parameters
    proposalPctDIDApprovalParameter = Parameter({
      title : proposalPctDIDApprovalTitle,
      value: 25,
      voteValues: new Vote[](0)
    });
    pullRequestNumApprovalsParameter = Parameter({
      title : pullRequestNumApprovalsParameterTitle,
      value: 3,
      voteValues: new Vote[](0)
    });
    votingInterval = 15 days;
  }
  
  function voteParameter(bytes32 _title, uint256 _newValue) public longEnoughSinceVotedOnParameter(msg.sender, _title, _newValue) returns
    (uint256) {
    Parameter storage parameter = parameters[_title];
  }

  function getParameterByTitle(bytes32 _title) public view returns (bytes32, uint256, Vote[]) {
    Parameter memory param = parameters[_title];
    return (param.title, param.value, param.voteValues);
  }

  function getParameterValue(bytes32 _title) public view returns (uint256) {
    Parameter memory param = parameters[_title];
    return param.value;
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

}

