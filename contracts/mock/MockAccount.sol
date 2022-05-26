//SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

/**
 * @notice This is a simple mock exposing the Manager-facing Account API as
 * simple functions that
 * 1. Record their arguments for functions called by Manager.
 * 2. Can have their output mocked for functions read by Manager.
 */
contract MockAccount {
    address[] public lastVotedGroups;
    uint256[] public lastVotes;

    address[] public lastWithdrawnGroups;
    uint256[] public lastWithdrawals;
    address public lastWithdrawalBeneficiary;

    mapping(address => uint256) public getCeloForGroup;
    uint256 public getTotalCelo;

    mapping(address => uint256) public scheduledVotes;

    function scheduleVotes(address[] calldata groups, uint256[] calldata votes) external payable {
        lastVotedGroups = groups;
        lastVotes = votes;
    }

    function getLastScheduledVotes() external view returns (address[] memory, uint256[] memory) {
        return (lastVotedGroups, lastVotes);
    }

    function scheduleWithdrawals(
        address[] calldata groups,
        uint256[] calldata withdrawals,
        address beneficiary
    ) external {
        lastWithdrawnGroups = groups;
        lastWithdrawals = withdrawals;
        lastWithdrawalBeneficiary = beneficiary;
    }

    function getLastScheduledWithdrawals()
        external
        view
        returns (
            address[] memory,
            uint256[] memory,
            address
        )
    {
        return (lastWithdrawnGroups, lastWithdrawals, lastWithdrawalBeneficiary);
    }

    function setCeloForGroup(address group, uint256 amount) external {
        getCeloForGroup[group] = amount;
    }

    function setTotalCelo(uint256 amount) external {
        getTotalCelo = amount;
    }

    function setScheduledVotes(address group, uint256 amount) external {
        scheduledVotes[group] = amount;
    }
}
