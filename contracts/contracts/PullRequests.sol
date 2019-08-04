pragma solidity ^0.5.8;

import './lib/Approvable.sol';
import './DIDToken.sol';
import './Distense.sol';
import './Tasks.sol';

contract PullRequests is Approvable {

    address public DIDTokenAddress;
    address public DistenseAddress;
    address public TasksAddress;

    struct PullRequest {
        address contributor;
        bytes32 taskId;
        uint128 prNum;
        uint256 pctDIDApproved;
        mapping(address => bool) voted;
    }

    bytes32[] public pullRequestIds;

    mapping(bytes32 => PullRequest) pullRequests;

    event LogAddPullRequest(bytes32 _prId, bytes32 taskId, uint128 prNum);
    event LogPullRequestApprovalVote(bytes32 _prId, uint256 pctDIDApproved);
    event LogRewardPullRequest(bytes32 _prId, bytes32 taskId, uint128 prNum);

    constructor () public {}

    function addPullRequest(bytes32 _prId, bytes32 _taskId, uint128 _prNum) external returns (bool) {
        pullRequests[_prId].contributor = msg.sender;
        pullRequests[_prId].taskId = _taskId;
        pullRequests[_prId].prNum = _prNum;
        pullRequestIds.push(_prId);

        emit LogAddPullRequest(_prId, _taskId, _prNum);
        return true;
    }

    function getPullRequestById(bytes32 _prId) external view returns (address, bytes32, uint128, uint256) {
        PullRequest memory pr = pullRequests[_prId];
        return (pr.contributor, pr.taskId, pr.prNum, pr.pctDIDApproved);
    }

    function getNumPullRequests() external view returns (uint256) {
        return pullRequestIds.length;
    }

    function approvePullRequest(bytes32 _prId)
        external
    returns (uint256) {

        require(voterCanApprovePullRequest(_prId) == true);

        uint256 taskReward;
        //  This will fail if task doesn't have determined rewardStatus; serves as a functional modifier
        taskReward = taskHasReachedDeterminedRewardStatus(_prId);

        Distense distense = Distense(DistenseAddress);
        DIDToken didToken = DIDToken(DIDTokenAddress);

        PullRequest storage _pr = pullRequests[_prId];

        //  Record approval vote to prevent multiple voting
        _pr.voted[msg.sender] = true;
        //  This is not very gas efficient at all but the stack was too deep.  Need to refactor/research ways to improve
        //  Increment _pr.pctDIDApproved by the lower of the votingPowerLimitParameter or the voters pctDIDOwned
        uint256 tentativePctDIDApproved;
        tentativePctDIDApproved += didToken.pctDIDOwned(msg.sender) > distense.getParameterValueByTitle(
            distense.votingPowerLimitParameterTitle()
        ) ? distense.getParameterValueByTitle(
            distense.votingPowerLimitParameterTitle()
        ) : didToken.pctDIDOwned(msg.sender);

        if (
            tentativePctDIDApproved > distense.getParameterValueByTitle(
            distense.pctDIDRequiredToMergePullRequestTitle()
        )
        ) {
            Tasks tasks = Tasks(TasksAddress);
            Tasks.RewardStatus updatedRewardStatus = tasks.setTaskRewardPaid(_pr.taskId);

            //  Only issueDID after we confirm taskRewardPaid
            require(updatedRewardStatus == Tasks.RewardStatus.PAID);

            _pr.pctDIDApproved = tentativePctDIDApproved;
            didToken.rewardContributor(_pr.contributor, taskReward);

            emit LogRewardPullRequest(_prId, _pr.taskId, _pr.prNum);
        }

        emit LogPullRequestApprovalVote(_prId, _pr.pctDIDApproved);
        return _pr.pctDIDApproved;
    }

    function voterCanApprovePullRequest(bytes32 _prId) internal view returns (bool) {

        require(pullRequests[_prId].voted[msg.sender] == false, "voter already voted on this PR");
        require(pullRequests[_prId].contributor != msg.sender, "contributor voted on their PR");

        DIDToken didToken = DIDToken(DIDTokenAddress);
        Distense distense = Distense(DistenseAddress);

        uint256 threshold = distense.getParameterValueByTitle(
            distense.numDIDRequiredToApproveVotePullRequestParameterTitle()
        );
        require(didToken.getNumContributionsDID(msg.sender) > threshold, "voter doesn't have enough DID");
        return true;
    }

    //    This function is here because it's only called from PullRequests,
    //    so having it here saves a bit of gas
    function taskHasReachedDeterminedRewardStatus(bytes32 _prId) internal view returns (uint256) {

        PullRequest storage _pr = pullRequests[_prId];
        Tasks tasks = Tasks(TasksAddress);
        uint256 taskReward;
        Tasks.RewardStatus taskRewardStatus;
        (
            taskReward,
            taskRewardStatus
        ) = tasks.getTaskRewardAndStatus(_pr.taskId);

        require(taskRewardStatus == Tasks.RewardStatus.DETERMINED);

        return taskReward;
    }

    function setDIDTokenAddress(address _DIDTokenAddress) public onlyApproved {
        DIDTokenAddress = _DIDTokenAddress;
    }

    function setDistenseAddress(address _DistenseAddress) public onlyApproved {
        DistenseAddress = _DistenseAddress;
    }

    function setTasksAddress(address _TasksAddress) public onlyApproved {
        TasksAddress = _TasksAddress;
    }
}
