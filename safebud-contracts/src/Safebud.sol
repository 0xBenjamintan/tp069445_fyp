// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Safebud {
    address public admin1;
    address public admin2;
    uint256 public transactionCounter;

    event TransactionInitiated(address _recipient, address _initiator, uint256 _value);
    event TransactionCompleted(address _recipient, uint256 _value);
    
    struct TransferRequest {
        address payable recipient;
        uint256 value;
        bool approvedByAdminOne;
        bool approvedByAdminTwo;
        bool finalized;
    }
    
    TransferRequest[] public transferRequests;

    constructor() {
        admin1 = address(0xaCBE1de971FA3dE3E65b1475FEF89Fe9B248103f);
        admin2 = address(0x475d495E6122DE4DD63461aCCcF8f7512C70367D);
    }

    modifier onlyAdmins() {
        require(msg.sender == admin1 || msg.sender == admin2, "Not authorized");
        _;
    }

    function createTransferRequest(address payable _recipient, uint256 _value)
        public
        onlyAdmins
        returns (uint256)
    {
        TransferRequest memory newRequest;
        newRequest.recipient = _recipient;
        newRequest.value = _value;
        newRequest.finalized = false;
        
        if (msg.sender == admin1) {
            newRequest.approvedByAdminOne = true;
        } else {
            newRequest.approvedByAdminTwo = true;
        }
        
        transferRequests.push(newRequest);
        emit TransactionInitiated(_recipient, msg.sender, _value);
        return transactionCounter++;
    }

    function approveTransferRequest(uint256 _requestId) public onlyAdmins {
        require(_requestId < transferRequests.length, "Invalid request ID");
        
        if (msg.sender == admin1) {
            transferRequests[_requestId].approvedByAdminOne = true;
        } else {
            transferRequests[_requestId].approvedByAdminTwo = true;
        }
        
        processTransaction(_requestId);
    }

    function processTransaction(uint256 _requestId) private {
        require(address(this).balance >= transferRequests[_requestId].value, "Insufficient balance");
        require(
            transferRequests[_requestId].approvedByAdminOne &&
            transferRequests[_requestId].approvedByAdminTwo,
            "Both admins must approve"
        );
        require(!transferRequests[_requestId].finalized, "Already finalized");
        
        transferRequests[_requestId].recipient.transfer(transferRequests[_requestId].value);
        transferRequests[_requestId].finalized = true;
        emit TransactionCompleted(transferRequests[_requestId].recipient, transferRequests[_requestId].value);
    }

    receive() external payable {}

    function checkBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function fetchTransferRequests() public view returns (TransferRequest[] memory) {
        return transferRequests;
    }
}
