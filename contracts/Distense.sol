pragma solidity ^0.4.17;

import './DIDToken.sol';
import './lib/SafeMath.sol';

contract Distense {
  using SafeMath for uint256;

  address public DIDTokenAddress;

  /*
    Distense' votable parameters
    Parameter is the perfect word for these: "a numerical or other measurable factor forming one of a set
    that defines a system or sets the conditions of its operation".
  */

  bytes32[] public parameterTitles;
  struct Parameter {
    bytes32 title;
    uint256 value;
    mapping (address => Vote) votes;
  }
  struct Vote {
    address voter;
    uint256 lastVoted;
  }
  mapping (bytes32 => Parameter) public parameters;

  Parameter proposalPctDIDApprovalParameter;
  bytes32 public proposalPctDIDApprovalTitle = 'proposalPctDIDRequired';

  Parameter pullRequestNumApprovalsParameter;
  bytes32 public pullRequestNumApprovalsParameterTitle = 'pullRequestNumApprovalsRequired';
  uint256 public votingInterval;  // Period of time between when voters can update these Distense parameters

  Parameter votingIntervalParameter;
  bytes32 public votingIntervalParameterTitle = 'votingInterval';

  event LogParameterValueUpdate(bytes32 title, uint256 value);

  function Distense(address _DIDTokenAddress) public {

    DIDTokenAddress = _DIDTokenAddress;

    // Launch Distense with some parameters
    proposalPctDIDApprovalParameter = Parameter({
      title: proposalPctDIDApprovalTitle,
      value: 25
    });
    parameters[proposalPctDIDApprovalTitle] = proposalPctDIDApprovalParameter;
    parameterTitles.push(proposalPctDIDApprovalTitle);

    pullRequestNumApprovalsParameter = Parameter({
      title: pullRequestNumApprovalsParameterTitle,
      value: 1
    });
    parameters[pullRequestNumApprovalsParameterTitle] = pullRequestNumApprovalsParameter;
    parameterTitles.push(pullRequestNumApprovalsParameterTitle);
    
    votingIntervalParameter = Parameter({
      title: votingIntervalParameterTitle,
      value: 15 days
    });
    parameters[votingIntervalParameterTitle] = votingIntervalParameter;
    parameterTitles.push(votingIntervalParameterTitle);

  }
  
  function getParameterValue(bytes32 _title) public view returns (uint256) {
     return parameters[_title].value; 
  }
  
  function voteOnParameter(bytes32 _title, uint256 _newValue) public /*longEnoughSinceVoted(msg.sender, _title, _newValue) */returns
    (uint256) {

    Parameter storage parameter = parameters[_title];
    address voter = msg.sender;
    uint256 oldValue = parameter.value;
    require(_newValue != oldValue); // Don't waste gas on mistakes.

    DIDToken didToken = DIDToken(DIDTokenAddress);
    uint256 votersDIDPercent = didToken.percentDID(voter);
    require (votersDIDPercent > 0);
    uint256 valueDelta = _newValue - oldValue;
    uint256 delta = votersDIDPercent * valueDelta;
    parameter.value += delta;
    assert(parameter.value != oldValue);

    LogParameterValueUpdate(_title, parameter.value);
    return parameter.value;
  }

  function getParameterByTitle(bytes32 _title) public view returns (bytes32, uint256) {
    Parameter memory param = parameters[_title];
    return (param.title, param.value);
  }

  function getNumParameters() public view returns (uint256) {
    return parameterTitles.length;
  }

  modifier votingIntervalReached(address _voter, bytes32 _title) {
    Parameter storage parameter = parameters[_title];
    uint256 lastVotedOnParameter = parameter.votes[_voter].lastVoted;
    require(now >= lastVotedOnParameter + votingInterval);
    _;
  }

}
