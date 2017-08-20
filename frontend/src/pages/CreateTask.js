import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import IPFS from 'ipfs'
import classNames from 'classnames'
import Room from 'ipfs-pubsub-room'

import web3, {
  selectContractInstance
} from '../web3.js'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

const Buffer = require('safe-buffer').Buffer

const TasksABI = {
  "contract_name": "Tasks",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "ipfsHashID",
          "type": "bytes"
        }
      ],
      "name": "getTaskFromMapping",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "ind",
          "type": "uint256"
        }
      ],
      "name": "getTaskFromList",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numTasks",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getTasksLength",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "ipfsHash",
          "type": "bytes"
        }
      ],
      "name": "getTaskByID",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tasksList",
      "outputs": [
        {
          "name": "createdBy",
          "type": "address"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "project",
          "type": "string"
        },
        {
          "name": "subProject",
          "type": "string"
        },
        {
          "name": "ipfsHashID",
          "type": "bytes"
        },
        {
          "name": "createdAt",
          "type": "uint256"
        },
        {
          "name": "status",
          "type": "uint8"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_title",
          "type": "string"
        },
        {
          "name": "_url",
          "type": "string"
        },
        {
          "name": "_project",
          "type": "string"
        },
        {
          "name": "_subProject",
          "type": "string"
        },
        {
          "name": "_ipfsHashID",
          "type": "bytes"
        }
      ],
      "name": "createTask",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "votingAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "numContribs",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "purchaser",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "url",
          "type": "string"
        }
      ],
      "name": "TaskCreated",
      "type": "event"
    }
  ],
  "unlinked_binary": "0x6060604052341561000c57fe5b5b60008080556001555b5b6120c1806100266000396000f3006060604052361561007d5763ffffffff60e060020a6000350416631620e643811461007f5780638dc0c3b7146102e2578063bda09cd414610502578063c1419a0414610524578063c80177d41461007f578063cb02a880146107a9578063ccb2035c14610a66578063d2fa717014610ac5578063edb7b18c14610af1575bfe5b341561008757fe5b6100d5600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650610b1395505050505050565b6040518088600160a060020a0316600160a060020a031681526020018060200180602001806020018060200187815260200186600281111561011357fe5b60ff16815260200185810385528b81815181526020019150805190602001908083836000831461015e575b80518252602083111561015e57601f19909201916020918201910161013e565b505050905090810190601f16801561018a5780820380516001836020036101000a031916815260200191505b5085810384528a5181528a516020918201918c019080838382156101c9575b8051825260208311156101c957601f1990920191602091820191016101a9565b505050905090810190601f1680156101f55780820380516001836020036101000a031916815260200191505b5085810383528951815289516020918201918b01908083838215610234575b80518252602083111561023457601f199092019160209182019101610214565b505050905090810190601f1680156102605780820380516001836020036101000a031916815260200191505b5085810382528851815288516020918201918a0190808383821561029f575b80518252602083111561029f57601f19909201916020918201910161027f565b505050905090810190601f1680156102cb5780820380516001836020036101000a031916815260200191505b509b50505050505050505050505060405180910390f35b34156102ea57fe5b6100d560043561106a565b6040518088600160a060020a0316600160a060020a031681526020018060200180602001806020018060200187815260200186600281111561011357fe5b60ff16815260200185810385528b81815181526020019150805190602001908083836000831461015e575b80518252602083111561015e57601f19909201916020918201910161013e565b505050905090810190601f16801561018a5780820380516001836020036101000a031916815260200191505b5085810384528a5181528a516020918201918c019080838382156101c9575b8051825260208311156101c957601f1990920191602091820191016101a9565b505050905090810190601f1680156101f55780820380516001836020036101000a031916815260200191505b5085810383528951815289516020918201918b01908083838215610234575b80518252602083111561023457601f199092019160209182019101610214565b505050905090810190601f1680156102605780820380516001836020036101000a031916815260200191505b5085810382528851815288516020918201918a0190808383821561029f575b80518252602083111561029f57601f19909201916020918201910161027f565b505050905090810190601f1680156102cb5780820380516001836020036101000a031916815260200191505b509b50505050505050505050505060405180910390f35b341561050a57fe5b6105126113ed565b60408051918252519081900360200190f35b341561052c57fe5b6105126113f3565b60408051918252519081900360200190f35b341561008757fe5b6100d5600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843750949650610b1395505050505050565b6040518088600160a060020a0316600160a060020a031681526020018060200180602001806020018060200187815260200186600281111561011357fe5b60ff16815260200185810385528b81815181526020019150805190602001908083836000831461015e575b80518252602083111561015e57601f19909201916020918201910161013e565b505050905090810190601f16801561018a5780820380516001836020036101000a031916815260200191505b5085810384528a5181528a516020918201918c019080838382156101c9575b8051825260208311156101c957601f1990920191602091820191016101a9565b505050905090810190601f1680156101f55780820380516001836020036101000a031916815260200191505b5085810383528951815289516020918201918b01908083838215610234575b80518252602083111561023457601f199092019160209182019101610214565b505050905090810190601f1680156102605780820380516001836020036101000a031916815260200191505b5085810382528851815288516020918201918a0190808383821561029f575b80518252602083111561029f57601f19909201916020918201910161027f565b505050905090810190601f1680156102cb5780820380516001836020036101000a031916815260200191505b509b50505050505050505050505060405180910390f35b34156107b157fe5b6107bc600435611951565b6040518089600160a060020a0316600160a060020a0316815260200180602001806020018060200180602001806020018881526020018760028111156107fe57fe5b60ff1681526020878203810187528e54600260018216156101000260001901909116049082018190526040909101908e90801561087c5780601f106108515761010080835404028352916020019161087c565b820191906000526020600020905b81548152906001019060200180831161085f57829003601f168201915b505086810385528c54600260001961010060018416150201909116048082526020909101908d9080156108f05780601f106108c5576101008083540402835291602001916108f0565b820191906000526020600020905b8154815290600101906020018083116108d357829003601f168201915b505086810384528b54600260001961010060018416150201909116048082526020909101908c9080156109645780601f1061093957610100808354040283529160200191610964565b820191906000526020600020905b81548152906001019060200180831161094757829003601f168201915b505086810383528a54600260001961010060018416150201909116048082526020909101908b9080156109d85780601f106109ad576101008083540402835291602001916109d8565b820191906000526020600020905b8154815290600101906020018083116109bb57829003601f168201915b505086810382528954600260001961010060018416150201909116048082526020909101908a908015610a4c5780601f10610a2157610100808354040283529160200191610a4c565b820191906000526020600020905b815481529060010190602001808311610a2f57829003601f168201915b50509d505050505050505050505050505060405180910390f35b3415610a6e57fe5b610ab160246004803582810192908201359181358083019290820135916044358083019290820135916064358083019290820135916084359182019101356119a8565b604080519115158252519081900360200190f35b3415610acd57fe5b610ad5611d75565b60408051600160a060020a039092168252519081900360200190f35b3415610af957fe5b610512611d84565b60408051918252519081900360200190f35b6000610b1d611d8a565b610b25611d8a565b610b2d611d8a565b610b35611d8a565b600060006003886040518082805190602001908083835b60208310610b6b5780518252601f199092019160209182019101610b4c565b51815160209384036101000a60001901801990921691161790529201948552506040519384900381018420548c51600160a060020a0390911694600394508d9350918291908401908083835b60208310610bd65780518252601f199092019160209182019101610bb7565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060010160038a6040518082805190602001908083835b60208310610c3e5780518252601f199092019160209182019101610c1f565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060020160038b6040518082805190602001908083835b60208310610ca65780518252601f199092019160209182019101610c87565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060030160038c6040518082805190602001908083835b60208310610d0e5780518252601f199092019160209182019101610cef565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060040160038d6040518082805190602001908083835b60208310610d765780518252601f199092019160209182019101610d57565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206006015460038e6040518082805190602001908083835b60208310610ddf5780518252601f199092019160209182019101610dc0565b518151600019602094850361010090810a82019283169219939093169190911790925294909201968752604080519788900382018820600701548d54601f600260018316159098029095011695909504928301829004820288018201905281875260ff9093169594508a9350918401905082828015610e9f5780601f10610e7457610100808354040283529160200191610e9f565b820191906000526020600020905b815481529060010190602001808311610e8257829003601f168201915b5050885460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959b508a945092508401905082828015610f2d5780601f10610f0257610100808354040283529160200191610f2d565b820191906000526020600020905b815481529060010190602001808311610f1057829003601f168201915b5050875460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959a5089945092508401905082828015610fbb5780601f10610f9057610100808354040283529160200191610fbb565b820191906000526020600020905b815481529060010190602001808311610f9e57829003601f168201915b5050865460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959950889450925084019050828280156110495780601f1061101e57610100808354040283529160200191611049565b820191906000526020600020905b81548152906001019060200180831161102c57829003601f168201915b5050505050925096509650965096509650965096505b919395979092949650565b6000611074611d8a565b61107c611d8a565b611084611d8a565b61108c611d8a565b6000600060048881548110151561109f57fe5b906000526020600020906008020160005b505460048054600160a060020a03909216918a9081106110cc57fe5b906000526020600020906008020160005b5060010160048a8154811015156110f057fe5b906000526020600020906008020160005b5060020160048b81548110151561111457fe5b906000526020600020906008020160005b5060030160048c81548110151561113857fe5b906000526020600020906008020160005b5060040160048d81548110151561115c57fe5b906000526020600020906008020160005b5060060154600480548f90811061118057fe5b906000526020600020906008020160005b50600701548554604080516020601f6002600019600187161561010002019095169490940493840181900481028201810190925282815260ff90931692918891830182828015610e9f5780601f10610e7457610100808354040283529160200191610e9f565b820191906000526020600020905b815481529060010190602001808311610e8257829003601f168201915b5050885460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959b508a945092508401905082828015610f2d5780601f10610f0257610100808354040283529160200191610f2d565b820191906000526020600020905b815481529060010190602001808311610f1057829003601f168201915b5050875460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959a5089945092508401905082828015610fbb5780601f10610f9057610100808354040283529160200191610fbb565b820191906000526020600020905b815481529060010190602001808311610f9e57829003601f168201915b5050865460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959950889450925084019050828280156110495780601f1061101e57610100808354040283529160200191611049565b820191906000526020600020905b81548152906001019060200180831161102c57829003601f168201915b5050505050925096509650965096509650965096505b919395979092949650565b60005481565b6004545b90565b6000610b1d611d8a565b610b25611d8a565b610b2d611d8a565b610b35611d8a565b600060006003886040518082805190602001908083835b60208310610b6b5780518252601f199092019160209182019101610b4c565b51815160209384036101000a60001901801990921691161790529201948552506040519384900381018420548c51600160a060020a0390911694600394508d9350918291908401908083835b60208310610bd65780518252601f199092019160209182019101610bb7565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060010160038a6040518082805190602001908083835b60208310610c3e5780518252601f199092019160209182019101610c1f565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060020160038b6040518082805190602001908083835b60208310610ca65780518252601f199092019160209182019101610c87565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060030160038c6040518082805190602001908083835b60208310610d0e5780518252601f199092019160209182019101610cef565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060040160038d6040518082805190602001908083835b60208310610d765780518252601f199092019160209182019101610d57565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206006015460038e6040518082805190602001908083835b60208310610ddf5780518252601f199092019160209182019101610dc0565b518151600019602094850361010090810a82019283169219939093169190911790925294909201968752604080519788900382018820600701548d54601f600260018316159098029095011695909504928301829004820288018201905281875260ff9093169594508a9350918401905082828015610e9f5780601f10610e7457610100808354040283529160200191610e9f565b820191906000526020600020905b815481529060010190602001808311610e8257829003601f168201915b5050885460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959b508a945092508401905082828015610f2d5780601f10610f0257610100808354040283529160200191610f2d565b820191906000526020600020905b815481529060010190602001808311610f1057829003601f168201915b5050875460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959a5089945092508401905082828015610fbb5780601f10610f9057610100808354040283529160200191610fbb565b820191906000526020600020905b815481529060010190602001808311610f9e57829003601f168201915b5050865460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959950889450925084019050828280156110495780601f1061101e57610100808354040283529160200191611049565b820191906000526020600020905b81548152906001019060200180831161102c57829003601f168201915b5050505050925096509650965096509650965096505b919395979092949650565b600480548290811061195f57fe5b906000526020600020906008020160005b50805460068201546007830154600160a060020a03909216935060018301926002810192600382019260048301926005019160ff1688565b60006119b2611d9c565b6101006040519081016040528033600160a060020a031681526020018d8d8080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505081526020018b8b8080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050815260200189898080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050815260200187878080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050815260200185858080601f01602080910402602001604051908101604052809392919081815260200183838082843750505092845250504260208301525060400160005b81525090508060038585604051808383808284379190910194855250506040516020938190038401902084518154600160a060020a031916600160a060020a039091161781558484015180519194611b4d94506001860193500190611e0a565b5060408201518051611b69916002840191602090910190611e0a565b5060608201518051611b85916003840191602090910190611e0a565b5060808201518051611ba1916004840191602090910190611e0a565b5060a08201518051611bbd916005840191602090910190611e0a565b5060c0820151600682015560e082015160078201805460ff19166001836002811115611be557fe5b0217905550506004805490915060018101611c008382611f08565b916000526020600020906008020160005b5082518154600160a060020a031916600160a060020a039091161781556020808401518051859392611c4a926001850192910190611e0a565b5060408201518051611c66916002840191602090910190611e0a565b5060608201518051611c82916003840191602090910190611e0a565b5060808201518051611c9e916004840191602090910190611e0a565b5060a08201518051611cba916005840191602090910190611e0a565b5060c0820151600682015560e082015160078201805460ff19166001836002811115611ce257fe5b02179055505050508b8b60405180838380828437820191505092505050604051809103902033600160a060020a03167f77095e0022f23445ec617c0051fe671a43fd56c57a3b10fdda30a7b2b3ac8c518c8c6040518080602001828103825284848281815260200192508082843760405192018290039550909350505050a3600191505b509a9950505050505050505050565b600254600160a060020a031681565b60015481565b60408051602081019091526000815290565b6040805161010081019091526000815260208101611db8611d8a565b8152602001611dc5611d8a565b8152602001611dd2611d8a565b8152602001611ddf611d8a565b8152602001611dec611d8a565b81526020016000815260200160006002811115611e0557fe5b905290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611e4b57805160ff1916838001178555611e78565b82800160010185558215611e78579182015b82811115611e78578251825591602001919060010190611e5d565b5b50611e85929150611f5e565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611e4b57805160ff1916838001178555611e78565b82800160010185558215611e78579182015b82811115611e78578251825591602001919060010190611e5d565b5b50611e85929150611f5e565b5090565b815481835581811511611f3457600802816008028360005260206000209182019101611f349190611f7f565b5b505050565b60408051602081019091526000815290565b60408051602081019091526000815290565b6113f791905b80821115611e855760008155600101611f64565b5090565b90565b6113f791905b80821115611e85578054600160a060020a03191681556000611faa6001830182612005565b611fb8600283016000612005565b611fc6600383016000612005565b611fd4600483016000612005565b611fe2600583016000612005565b506000600682015560078101805460ff19169055600801611f85565b5090565b90565b50805460018160011615610100020316600290046000825580601f1061202b5750612049565b601f0160209004906000526020600020908101906120499190611f5e565b5b50565b50805460018160011615610100020316600290046000825580601f1061202b5750612049565b601f0160209004906000526020600020908101906120499190611f5e565b5b505600a165627a7a72305820beaa1af69e5929bc85ee7c220cc7b8393290d357c5e64244f55fb0b6c29b950e0029",
  "networks": {
    "15": {
      "events": {
        "0x77095e0022f23445ec617c0051fe671a43fd56c57a3b10fdda30a7b2b3ac8c51": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "purchaser",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "title",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "url",
              "type": "string"
            }
          ],
          "name": "TaskCreated",
          "type": "event"
        },
        "0xa8924143bcf4a5e0a12b38277a275d7d03b961ff035face5561097f9df5a21aa": {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "purchaser",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "title",
              "type": "bytes32"
            },
            {
              "indexed": false,
              "name": "url",
              "type": "bytes32"
            }
          ],
          "name": "TaskCreated",
          "type": "event"
        }
      },
      "links": {},
      "address": "0xba1ee947d1f0434491b4f7a62aef239cc833b217",
      "updated_at": 1503120156670
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1503120156670
}

export default class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: web3.eth.accounts[0] || null,
      errorMessages: [],
      ipfsHash: '',
      ipfsDetail: '',
      project: '',
      subProject: '',
      taskSubmitted: false,
      taskCreateSuccess: false,
      title: '',
      titleSlug: ''
    }

    this.onSetErrorMessages = this.onSetErrorMessages.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onWriteIPFSDetail = this.onWriteIPFSDetail.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
  }

  async componentWillMount() {

    this.node = await new IPFS({
      EXPERIMENTAL: {
        pubsub: true
      },
      repo: String(Math.random() + Date.now())
      })

    this.node.on('ready', () => {
      console.log('IPFS ready')
    })

    this.room = Room(this.node, 'distense-task-detail')
  }

  onWriteIPFSDetail(event) {

    const ipfsDetail = event.target.value
    this.setState({ ipfsDetail })

    this.node.files.add([Buffer.from(ipfsDetail)], (err, res) => {
      if (err) console.error(err)
      else if (res && res[0].hash) {
        const ipfsHash = res[0].hash
        this.setState({ ipfsHash })
      }
    })
  }

  onTitleChange(event) {
    const title = event.target.value
    const titleSlug = title.replace(/ /g, '-')
    this.setState({
      title,
      titleSlug
    })
    this.onSetErrorMessages(title)
  }

  onSetErrorMessages(title) {

    const errorMessages = this.state.errorMessages
    const specialCharMsg = 'Title cannot contain non-alphanumeric characters'
    const lengthErrorMsg = 'Title Too Long'

    const titleMsgErrorIndex = errorMessages.indexOf(lengthErrorMsg)
    const specialCharMsgIndex = errorMessages.indexOf(specialCharMsg)

    const titleTooLong = title.length > 40
    if (titleTooLong && titleMsgErrorIndex < 0) {
      errorMessages.push(lengthErrorMsg)
    } else if (!titleTooLong && titleMsgErrorIndex > -1) {
      errorMessages.splice(titleMsgErrorIndex, 1)
    }

    const titleHasSpecialChars = /[.~`!#$%^&*+=[\]\\';,/{}|\\":<>?]/g.test(title)
    if (titleHasSpecialChars && specialCharMsgIndex < 0) {
      errorMessages.push(specialCharMsg)
    } else if (!titleHasSpecialChars && specialCharMsgIndex > -1) {
      errorMessages.splice(specialCharMsgIndex, 1)
    }

    this.setState({
      errorMessages
    })

  }

  async onCreateTask(e) {
    console.log(`ipfsHash: ${this.state.ipfsHash}`)

    this.setState({
      taskSubmitted: true
    })

    const { titleSlug, project, subProject, ipfsHash } = this.state

    if (titleSlug && project && subProject && ipfsHash) {
      const url = window.location.origin + '/tasks/' + titleSlug + '-' + ipfsHash
      const TasksContract = await selectContractInstance(TasksABI);
      const taskCreated = await TasksContract.createTask(
        titleSlug,
        url,
        project,
        subProject,
        ipfsHash, {
          from: this.state.account
        }
      )

      if (taskCreated) {
        this.setState({
          taskTXID: taskCreated.tx || ''
        })
      }
      const task = await TasksContract.getTaskFromMapping(ipfsHash)
      if (task) {
        console.log(`Distense task created!`)
        this.room.broadcast(this.state.ipfsHash)
      }
    }
  }



  render() {

    const {
      account,
      ipfsDetail,
      ipfsHash,
      errorMessages,
      project,
      subProject,
      taskSubmitted,
      taskTXID,
      titleSlug,
      title
    } = this.state

    let url
    if (titleSlug && ipfsHash) {
      url = window.location.origin + '/tasks/' + titleSlug + '-' + ipfsHash
    }

    return (
      <Layout>
        <Head title='Create Task'/>
        <div className='task-create-view'>
          <div className='task-create-inputs'>
            {taskTXID ? <span className='tx-hash'>Tx ID: {taskTXID}</span> :
              taskSubmitted ?
                <div className='proposal-form-success'>
                  Please wait for your transaction to be mined.  This could take 20 seconds.
                </div>
                : <div>
                    <h1>Create Task</h1>
                    <form className='proposal-form' onSubmit={this.onCreateTask}>
                    <div className="task-input-group">
                      <h2>Task Title</h2>
                      <input
                        className='input input-title'
                        name='title'
                        ref={i => this.title = i}
                        type='text'
                        placeholder='<40 char title (short descriptive words)'
                        value={title}
                        onChange={this.onTitleChange}
                      />
                      {errorMessages.length > 0 ? errorMessages.map((errorMsg) => {
                        return <p key={errorMsg} className='error-message'>{errorMsg}</p>
                      }) : ''
                      }
                    </div>
                    <div className='task-input-group'>
                      <h2>Select Project</h2>
                      <Autocomplete
                        inputProps={{ id: 'project-autocomplete' }}
                        className='input autocomplete-wrapper'
                        getItemValue={(item) => item.label}
                        items={[
                          { label: 'contracts' },
                          { label: 'site' },
                          { label: 'legal' },
                          { label: 'outreach' },
                          { label: 'crowdsale' },
                        ]}
                        renderItem={(item, isHighlighted) =>
                          <div className='autocomplete-box' style={{
                            textAlign: 'center', margin: 'auto 0', background: isHighlighted ? 'lightgray' : 'white'
                          }}>
                            <p className='autocomplete-item'>
                              {item.label}
                            </p>
                          </div>
                        }
                        value={project}
                        onChange={(e) => this.setState({
                          project: e.target.value
                          })
                        }
                        onSelect={(val) => this.setState({
                          project: val
                          })
                        }
                      />
                    </div>
                    <div className='task-input-group'>
                      <h2>Select Sub-Project</h2>
                      <Autocomplete
                        inputProps={{
                          id: 'sub-project-autocomplete'
                        }}
                        className='input autocomplete-wrapper'
                        getItemValue={(item) => item.label}
                        items={[
                          { label: 'Twitter' },
                          { label: 'Technical Task Spec' },
                          { label: 'Distense Education' },
                          { label: 'HAVToken.sol' },
                          { label: 'DIDToken.sol' },
                          { label: 'Contributor Outreach' },
                          { label: 'Planning' },
                          { label: 'Tasks.sol' },
                          { label: 'Legal' },
                          { label: 'Crowdsale' },
                        ]}
                        renderItem={(item, isHighlighted) =>
                          <div className='autocomplete-box' style={{
                            textAlign: 'center', margin: 'auto 0', background: isHighlighted ? 'lightgray' : 'white'
                          }}>
                            <p className='autocomplete-item'>
                              {item.label}
                            </p>
                          </div>
                        }
                        value={subProject}
                        onChange={(e) => this.setState({
                          subProject: e.target.value
                        })
                        }
                        onSelect={(val) => this.setState({
                          subProject: val
                        })}
                      />
                    </div>
                    <div className='task-input-group ipfs-detail'>
                      <h2>Detailed Spec</h2>
                      <span>
                        Write until the reader will have no questions.
                      </span>
                      <input
                        className='input input-detail'
                        name='detail'
                        ref={i => this.detail = i}
                        type='textarea'
                        placeholder='Lots of detail'
                        value={ipfsDetail}
                        onChange={this.onWriteIPFSDetail}
                      />
                    </div>
                    <button className='button' type='submit'>
                      Submit
                    </button>
                  </form>
              </div>
            }
          </div>
          <div className='task-create-column task-preview'>
            <h2>Task Preview</h2>
            <p>Note that <b>this task insert costs gas</b>, so we show you this preview here.  Make sure it's valid and as you want.</p>
            <div className='task-preview-content'>
              <p className='inline'>struct</p>
              <span className='word-separator'>
                Task</span>
              &#123;
              <div className='struct-line'>
                <span className='task-preview-key'>
                title:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': titleSlug })}>
                  {titleSlug}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  project:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': project })}>
                  {project}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  subProject:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': subProject })}>
                  {subProject}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  createdBy:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': account })}>
                  {account}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  ipfsHash:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': ipfsHash })}>
                  {ipfsHash}
                  </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  url:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': url })}>
                  {url}
                </span>
              </div>
              }
            </div>
          </div>
        </div>
        <style jsx>{`
          .task-create-view {
	          display: flex;
          }

          .task-input-group {
            margin-top: 15px;
          }

          .task-preview-content {
            font-size: 18px;
            font-weight: semi-bold;
            padding: 10px;
            width: 100%;
            height: 270px;
            background: #FAEBD7;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
          }

          .task-create-inputs {
            width: 38%;
          }

          .task-preview {
            margin: auto;
          }

          .struct-line {
            margin: 12px 0;
          }

          .bg-light-gray {
            background-color: lightgray;
          }

          span.task-preview-value {
            color: red;
            padding: 4px;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
            font-size: 13.5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .task-preview-key {
            font-size: 16px;
            margin: 3px 5px 3px 1rem;
          }

          p.error-message {
            margin: .5em 0;
            color: #fff;
            padding: 4px;
            width: 330px;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
            background-color: red;
          }

          p.autocomplete-item {
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif';
            padding: '.3rem';
            fontSize: '18px';
            borderBottom: '1px solid gray';
          }

          .word-separator {
            margin: 0 6px;
          }

          .task-create-column {
            width: 50%;
	          padding: 10px;
	        }

	        .task-create-view > div:first-child {
	          // margin-right: 5px;
	        }

          .input {
            margin: 10px 0 20px 0;
            border: 1px solid gray;
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
            width: 330px;
          }

          .inline {
            display: inline;
          }

          input {
            border: 1px solid gray !important;
          }

          .input-detail {
            height: 100px;
          }

          .tx-hash {
            overflow-wrap: break-word;
          }

          .button {
            margin-top: 10px;
            background: #4ad934;
            background-image: -webkit-linear-gradient(top, #4ad934, #4eb82b);
            background-image: -moz-linear-gradient(top, #4ad934, #4eb82b);
            background-image: -ms-linear-gradient(top, #4ad934, #4eb82b);
            background-image: -o-linear-gradient(top, #4ad934, #4eb82b);
            background-image: linear-gradient(to bottom, #4ad934, #4eb82b);
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
            text-shadow: 2px 1px 3px #666666;
            color: #ffffff;
            font-size: 18px;
            padding: 10px 20px;
            text-decoration: none;
          }

          .button:hover {
            background: #6cfc3c;
            text-decoration: none;
          }

          input#project-autocomplete, input#sub-project-autocomplete {
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
            width: 330px !important;
          }

       `}</style>
      </Layout>
    );
  }
}
