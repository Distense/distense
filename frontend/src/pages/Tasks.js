import React, { Component } from 'react';
import web3, {
  selectContractInstance, mapReponseToJSON
} from '../web3.js';

// const TasksABI = ;

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  async componentWillMount() {
    /*this.Tasks = await selectContractInstance(TasksABI);
     const tasks = await this.Tasks.getTasks.call();
     this.setState({
     tasks
     });*/
  }

  render() {
    const s = this.state;
    return (
      <div className="tasks">
        {s.tasks.length ? s.tasks.map((task) => {
          return <Task task={task}/>
        }) : "No tasks available"
        }
      </div>
    );
  }
}

const Task = (task) => {
  return (
    <div>
      <span>
        Description: {task.desc}
        Project: {task.proj}
      </span>
    </div>
  );
};