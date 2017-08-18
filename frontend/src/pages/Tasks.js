import React, { Component } from 'react'
import IPFS from 'ipfs'

import web3, {
  selectContractInstance
} from '../web3.js';

import Head from '../components/common/Head'
import Layout from '../components/Layout'


const TasksABI = {
  "contract_name": "Tasks",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_title",
          "type": "bytes32"
        },
        {
          "name": "_url",
          "type": "bytes32"
        },
        {
          "name": "_project",
          "type": "bytes32"
        },
        {
          "name": "_ipfsHashID",
          "type": "bytes32"
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
      "inputs": [
        {
          "name": "ipfsHashID",
          "type": "bytes32"
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
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
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
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
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
          "type": "bytes32"
        },
        {
          "name": "url",
          "type": "bytes32"
        },
        {
          "name": "project",
          "type": "bytes32"
        },
        {
          "name": "ipfsHashID",
          "type": "bytes32"
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
  ],
  "unlinked_binary": "0x6060604052341561000c57fe5b5b60008080556001555b5b610712806100266000396000f300606060405236156100725763ffffffff60e060020a60003504166340fb402181146100745780638af1c875146100a45780638dc0c3b71461010b578063bda09cd414610172578063c1419a0414610194578063cb02a880146101b6578063d2fa717014610225578063edb7b18c14610251575bfe5b341561007c57fe5b610090600435602435604435606435610273565b604080519115158252519081900360200190f35b34156100ac57fe5b6100b7600435610449565b60408051600160a060020a038816815260208101879052908101859052606081018490526080810183905260a081018260028111156100f257fe5b60ff168152602001965050505050505060405180910390f35b341561011357fe5b6100b7600435610495565b60408051600160a060020a038816815260208101879052908101859052606081018490526080810183905260a081018260028111156100f257fe5b60ff168152602001965050505050505060405180910390f35b341561017a57fe5b61018261059f565b60408051918252519081900360200190f35b341561019c57fe5b6101826105a5565b60408051918252519081900360200190f35b34156101be57fe5b6101c96004356105ac565b60408051600160a060020a038916815260208101889052908101869052606081018590526080810184905260a0810183905260c0810182600281111561020b57fe5b60ff16815260200197505050505050505060405180910390f35b341561022d57fe5b610235610608565b60408051600160a060020a039092168252519081900360200190f35b341561025957fe5b610182610617565b60408051918252519081900360200190f35b600061027d61061d565b6040805160e081018252600160a060020a03331681526020810188905290810186905260608101859052608081018490524260a082015260c0810160005b905260008481526003602081815260409283902084518154600160a060020a031916600160a060020a0390911617815590840151600180830191909155928401516002808301919091556060850151928201929092556080840151600482015560a0840151600582015560c0840151600682018054959650869592949193909260ff19169190849081111561034c57fe5b0217905550506004805490915060018101610367838261065a565b916000526020600020906007020160005b5082518154600160a060020a031916600160a060020a0390911617815560208301516001808301919091556040840151600280840191909155606085015160038401556080850151600484015560a0850151600584015560c08501516006840180548795949293919260ff199091169184908111156103f357fe5b021790555050604080518881529051899350600160a060020a03331692507fa8924143bcf4a5e0a12b38277a275d7d03b961ff035face5561097f9df5a21aa9181900360200190a3600191505b50949350505050565b6000818152600360208190526040909120805460018201546002830154938301546005840154600690940154600160a060020a03909316949193919290919060ff165b91939550919395565b6000600060006000600060006004878154811015156104b057fe5b906000526020600020906007020160005b505460048054600160a060020a0390921691899081106104dd57fe5b906000526020600020906007020160005b5060010154600480548a90811061050157fe5b906000526020600020906007020160005b5060020154600480548b90811061052557fe5b906000526020600020906007020160005b5060030154600480548c90811061054957fe5b906000526020600020906007020160005b5060050154600480548d90811061056d57fe5b906000526020600020906007020160005b5060060154949a509298509096509450925060ff1690505b91939550919395565b60005481565b6004545b90565b60048054829081106105ba57fe5b906000526020600020906007020160005b50805460018201546002830154600384015460048501546005860154600690960154600160a060020a039095169650929491939092919060ff1687565b600254600160a060020a031681565b60015481565b6040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a081018290529060c08201905b905290565b81548183558181151161068657600702816007028360005260206000209182019101610686919061068c565b5b505050565b6105a991905b808211156106df578054600160a060020a0319168155600060018201819055600282018190556003820181905560048201819055600582015560068101805460ff19169055600701610692565b5090565b905600a165627a7a72305820bd111d0a2cd71a30cfd940378c989a8ce1542ac64ae0e324e25edefbbe0276710029",
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
      "address": "0x7a7a93aa880820684556b82a2d629ff8c3b1678a",
      "updated_at": 1503078359937
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1503078359937
}


export default class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: web3.eth.accounts[0] || null,
      tasks: [],
      errorMessages: []
    }
  }

  async componentWillMount() {

    this.node = await new IPFS({
      EXPERIMENTAL: {
        pubsub: true
      },
      repo: String(Math.random() + Date.now())
    })
    this.node.on('ready', () => {
      console.log('IPFS')
    })

    this.Tasks = await selectContractInstance(TasksABI)
    const tasks = await this.getTasks()
    this.setState({ tasks })

  }

  async getTasks() {

    const numTasks = await this.Tasks.getTasksLength()
    console.log(`Found ${numTasks} available tasks`);

    const tasks = []
    for (let i = 0; i < numTasks; i++) {
      const taskArray = await this.Tasks.getTaskFromList(i)
      // const task = convertSolListToTask(taskArray)
      // console.log(`${task.title}`);
      const task = {}
      task.createdBy = web3.toHex(taskArray[0])
      task.title = web3.toAscii(taskArray[1])
      console.log(`${task.createdBy}`)
      // task.url = web3.toAscii(taskArray[2])
      // task.project = web3.toAscii(taskArray[2])
      // task.ipfsHash = web3.toAscii(taskArray[3])
      // task.created = web3.toAscii(taskArray[4])
      // task.status = web3.toAscii(taskArray[5])
      // task.subProject = task[6]
      tasks.push(task)
    }

    // task.sort(function(a, b) {
    // })
    return tasks
  }

  getIPFSDetail(ipfsHash) {

    this.node.files.get(ipfsHash, (err, res) => {
      if (err) console.error(`${err}`)
      const ipfsDetail = res[0]
      this.setState({
        ipfsDetail
      })
    })
  }


  render() {

    const { tasks } = this.state
    return (
      <Layout>
        <Head title="Available Tasks"/>
        <div className="tasks-list">
          <h2>Available Tasks</h2>
          {tasks.length ? tasks.map(function (task) {
            return <Task key={Math.random().toString()} task={task} />
          }) : 'No Tasks Available'
          }
        </div>
      </Layout>
    );
  }
}

const Task = ({ task }) => {
  return (<span>{task.createdBy}</span>);
};