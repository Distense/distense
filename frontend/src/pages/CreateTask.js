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
      "inputs": [],
      "name": "numIncomplete",
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
      "constant": true,
      "inputs": [],
      "name": "numProps",
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
  "unlinked_binary": "0x6060604052341561000c57fe5b5b6000808055600181905560028190556003555b5b610680806100306000396000f300606060405236156100725763ffffffff60e060020a60003504166340fb402181146100745780637a38792e146100a45780638af1c875146100c65780638dc0c3b71461012d578063bda09cd414610194578063d2fa7170146101b6578063edb7b18c146101e2578063f8c3b1f414610204575bfe5b341561007c57fe5b610090600435602435604435606435610226565b604080519115158252519081900360200190f35b34156100ac57fe5b6100b4610411565b60408051918252519081900360200190f35b34156100ce57fe5b6100d9600435610417565b60408051600160a060020a038816815260208101879052908101859052606081018490526080810183905260a0810182600281111561011457fe5b60ff168152602001965050505050505060405180910390f35b341561013557fe5b6100d9600435610460565b60408051600160a060020a038816815260208101879052908101859052606081018490526080810183905260a0810182600281111561011457fe5b60ff168152602001965050505050505060405180910390f35b341561019c57fe5b6100b461056a565b60408051918252519081900360200190f35b34156101be57fe5b6101c6610570565b60408051600160a060020a039092168252519081900360200190f35b34156101ea57fe5b6100b461057f565b60408051918252519081900360200190f35b341561020c57fe5b6100b4610585565b60408051918252519081900360200190f35b600061023061058b565b6040805160e081018252600160a060020a03331681526020810188905290810186905260608101859052608081018490524260a082015260c0810160005b905260008481526005602081815260409283902084518154600160a060020a031916600160a060020a039091161781559084015160018083019190915592840151600280830191909155606085015160038301556080850151600483015560a08501519282019290925560c0840151600682018054959650869592949193909260ff1916919084908111156102ff57fe5b021790555050600680549091506001810161031a83826105c8565b916000526020600020906007020160005b5082518154600160a060020a031916600160a060020a0390911617815560208301516001808301919091556040840151600280840191909155606085015160038401556080850151600484015560a0850151600584015560c08501516006840180548795949293919260ff199091169184908111156103a657fe5b02179055505060008054600190810190915560038054909101905550506040805186815290518791600160a060020a033316917fa8924143bcf4a5e0a12b38277a275d7d03b961ff035face5561097f9df5a21aa9181900360200190a3600191505b50949350505050565b60035481565b6000818152600560208190526040909120805460018201546002830154600384015494840154600690940154600160a060020a03909316949193909260ff165b91939550919395565b60006000600060006000600060068781548110151561047b57fe5b906000526020600020906007020160005b505460068054600160a060020a0390921691899081106104a857fe5b906000526020600020906007020160005b5060010154600680548a9081106104cc57fe5b906000526020600020906007020160005b5060020154600680548b9081106104f057fe5b906000526020600020906007020160005b5060030154600680548c90811061051457fe5b906000526020600020906007020160005b5060050154600680548d90811061053857fe5b906000526020600020906007020160005b5060060154949a509298509096509450925060ff1690505b91939550919395565b60015481565b600454600160a060020a031681565b60025481565b60005481565b6040805160e081018252600080825260208201819052918101829052606081018290526080810182905260a081018290529060c08201905b905290565b8154818355818115116105f4576007028160070283600052602060002091820191016105f491906105fa565b5b505050565b61065191905b8082111561064d578054600160a060020a0319168155600060018201819055600282018190556003820181905560048201819055600582015560068101805460ff19169055600701610600565b5090565b905600a165627a7a72305820c3fc54836bcf7f48b303d0038f040611b0f555bb928b125296223189cf4593bd0029",
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
      "address": "0xf88352a6df724d73a05e7f1204d5ea8226c47909",
      "updated_at": 1503020535934
    }
  },
  "schema_version": "0.0.5",
  "updated_at": 1503020882691
}

export default class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: web3.eth.accounts[0] || null,
      ipfsHash: '',
      ipfsDetail: '',
      errorMessages: [],
      taskSubmitted: false,
      project: '',
      subProject: '',
      skills: [],
      taskUrl: '',
      title: '',
      titlePrepared: '',
      // TODO skills selection (that cool box thing we shou?
      userNumDID: 0,
      taskCreateSuccess: false
    }

    this.setErrorMessages = this.setErrorMessages.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.writeIPFSDetail = this.writeIPFSDetail.bind(this)
    this.setTaskUrl = this.setTaskUrl.bind(this)
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

  writeIPFSDetail(event) {

    const ipfsDetail = event.target.value
    this.setState({
      ipfsDetail
    })
    this.node.files.add([Buffer.from(ipfsDetail)], (err, res) => {
      if (err) console.error(`${err}`)

      const ipfsHash = res[0].hash
      this.setState({
        ipfsHash
      }, function () {
        //  ensure state updates have been made before updating taskUrl
        this.setTaskUrl()
      })

    })
  }

  setTaskUrl() {
    const baseUrl = 'http://disten.se/tasks/'
    if (this.state.ipfsDetail && this.state.titlePrepared && this.state.project) {
      this.setState({
        taskUrl: baseUrl + this.state.titlePrepared + '-' + this.state.ipfsHash
      })
    } else {
      this.setState({
        taskUrl: ''
      })
    }

  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    if (name === 'title') {
      const titlePrepared = value.replace(/ /g, '-')
      this.setState({
        titlePrepared
      })
    }
    this.setTaskUrl()
    this.setErrorMessages(value)
  }

  setErrorMessages(title) {

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

    if (errorMessages.length) {
      this.setState({
        taskUrl: 'Sorry. You get no URL when you have title errors'
      })
    } else {
      this.setTaskUrl()
    }

    this.setState({
      errorMessages
    })

  }

  async onCreateTask(e) {
    // e.preventDefault()
    console.log(`Submitting proposal`)
    console.log(`ipfsHash: ${this.state.ipfsHash}`)

    this.setState({
      taskSubmitted: true
    })

    const { title, project, taskUrl, ipfsHash } = this.state

    if (title && project && taskUrl && ipfsHash) {
      const Tasks = await selectContractInstance(TasksABI);
      const taskCreated = await Tasks.createTask(
        title,
        project,
        // TODO skills?
        taskUrl,
        ipfsHash, {
          from: this.state.account
        }
      )

      if (taskCreated) {
        this.setState({
          taskTXID: web3.toAscii(taskCreated.tx) || ''
        })
      }
      const task = await Tasks.getTaskFromMapping(ipfsHash)
      if (task) {
        console.log(`Distense Task Created!`)
        this.room.broadcast(this.state.ipfsHash)
      }
    }
  }



  render() {

    const { account, ipfsHash, ipfsDetail, errorMessages, taskSubmitted, taskTXID, project, subProject, titlePrepared, title, taskUrl } = this.state
    return (
      <Layout>
        <Head title="Create Task"/>
        <div className="task-create-view">
          <div className="task-create-inputs">
            {taskTXID ? <div>Tx ID: {taskTXID}</div> :
              taskSubmitted ?
                <div className='proposal-form-success'>
                  Please wait for your transaction to be mined.  Could take 20 seconds.
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
                        onChange={this.handleInputChange}
                      />
                      {errorMessages.length > 0 ? errorMessages.map((errorMsg) => {
                        return <p key={errorMsg} className="error-message">{errorMsg}</p>
                      }) : ''
                      }
                    </div>
                    <div className="task-input-group">
                      <h2>Select Project</h2>
                      <Autocomplete
                        inputProps={{ id: 'project-autocomplete' }}
                        className="input autocomplete-wrapper"
                        getItemValue={(item) => item.label}
                        items={[
                          { label: 'contracts' },
                          { label: 'website' },
                          { label: 'legal' },
                          { label: 'outreach' },
                          { label: 'crowdsale' },
                        ]}
                        renderItem={(item, isHighlighted) =>
                          <div className="autocomplete-box" style={{
                            textAlign: 'center', margin: 'auto 0', background: isHighlighted ? 'lightgray' : 'white'
                          }}>
                            <p className="autocomplete-item">
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
                    <div className="task-input-group">
                      <h2>Select Sub-Project</h2>
                      <Autocomplete
                        inputProps={{
                          id: 'sub-project-autocomplete'
                        }}
                        className="input autocomplete-wrapper"
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
                          <div className="autocomplete-box" style={{
                            textAlign: 'center', margin: 'auto 0', background: isHighlighted ? 'lightgray' : 'white'
                          }}>
                            <p className="autocomplete-item">
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
                    <div className="task-input-group ipfs-detail">
                      <h2>Detailed Spec</h2>
                      <span>
                        Write until the reader will have no questions.
                      </span>
                      <input
                        className="input input-detail"
                        name="detail"
                        ref={i => this.detail = i}
                        type='textarea'
                        placeholder='Lots of detail'
                        value={ipfsDetail}
                        onChange={this.writeIPFSDetail}
                      />
                    </div>
                    <button className="button" type='submit'>
                      Submit
                    </button>
                  </form>
              </div>
            }
          </div>
          <div className="task-create-column task-preview">
            <h2>Task Preview</h2>
            <p>Note that <b>this task insert costs gas</b>, so we show you this preview here.  Make sure it's valid and as you want.</p>
            <div className="task-preview-content">
              <p className="inline">struct</p>
              <span className="word-separator">
                Task</span>
              &#123;
              <div className="struct-line">
                <span className="task-preview-key">
                title:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': titlePrepared })}>
                  {titlePrepared}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  project:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': project })}>
                  {project}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  createdBy:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': account })}>
                  {account}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  ipfsHash:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': ipfsHash })}>
                  {ipfsHash}
                  </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  url:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': taskUrl })}>
                  {taskUrl}
                </span>
              </div>
              }
            </div>
          </div>
        </div>
        <style jsx>{`
          .task-create-view {
            display: -ms-flex;
	          display: -webkit-flex;
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
            height: 220px;
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
