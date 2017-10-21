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

  //  Titles are what uniquely define parameters, so query by titles when iterating with client
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


  Parameter public proposalPctDIDApprovalParameter;
  bytes32 public proposalPctDIDApprovalTitle = 'proposalPctDIDRequired';


  Parameter public pullRequestPctDIDParameter;
  bytes32 public pullRequestPctDIDRequiredParameterTitle = 'pullRequestPctDIDRequired';
  uint256 public votingInterval;  // Period of time between when voters can update these Distense parameters


  Parameter votingIntervalParameter;
  bytes32 public votingIntervalParameterTitle = 'votingInterval';


  event LogParameterValueUpdate(bytes32 title, uint256 value);


  function Distense(address _DIDTokenAddress) public {

    DIDTokenAddress = _DIDTokenAddress;


    // Launch Distense with some votable parameters that can be later updated by contributors
    proposalPctDIDApprovalParameter = Parameter({
      title: proposalPctDIDApprovalTitle,
      value: 25
    });
    parameters[proposalPctDIDApprovalTitle] = proposalPctDIDApprovalParameter;
    parameterTitles.push(proposalPctDIDApprovalTitle);

    pullRequestPctDIDParameter = Parameter({
      title: pullRequestPctDIDRequiredParameterTitle,
      value: 10
    });
    parameters[pullRequestPctDIDRequiredParameterTitle] = pullRequestPctDIDParameter;
    parameterTitles.push(pullRequestPctDIDRequiredParameterTitle);
    
    votingIntervalParameter = Parameter({
      title: votingIntervalParameterTitle,
      value: 15 days  // 15 * 86400 = 1.296e+6
    });
    parameters[votingIntervalParameterTitle] = votingIntervalParameter;
    parameterTitles.push(votingIntervalParameterTitle);

  }
  
  function getParameterValue(bytes32 _title) public view returns (uint256) {
     return parameters[_title].value; 
  }

  function voteOnParameter(bytes32 _title, uint256 _newValue) public votingIntervalReached(msg.sender, _title) returns
    (uint256) {

    assert(_newValue > 0);
    assert(_newValue > 0);
    DIDToken didToken = DIDToken(DIDTokenAddress);
    uint256 votersDIDPercent = didToken.percentDID(msg.sender);
    require (votersDIDPercent > 0);

    Parameter storage parameter = parameters[_title];
    require (_newValue != parameter.value);

    uint value = (_newValue * votersDIDPercent) / 100;
    
    parameter.value += value;
    parameter.votes[msg.sender].lastVoted = now;
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
    if (lastVotedOnParameter > 0)
      require(now >= lastVotedOnParameter + votingInterval);
    _;
  }

}
