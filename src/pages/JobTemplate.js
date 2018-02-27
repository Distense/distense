import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Menu, Grid, Header, Container, Button} from 'semantic-ui-react'

import PageTitling from '../components/common/PageTitling'
// import companyDescr_i_ption from './CompanyDesciption'

class JobTemplate extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return this.props.ABCD !== nextProps.ABCD
  // }

  // componentWillMount() {
  // }

  render() {
    // const {  } = this.props

    return (
       <div>
       <PageTitling title="Associates(Specialized Developers)" subTitle="Blockchain Zoo"/>
       <Header 
          as="h3"
          classname="inconsolata"
          content="Company Desciption"
          style={{
                marginBottom: 0,
              }}
          >Company Desciption
          </Header>
          <p>
            Lorem ipsum ullamco laboris dolor enim tempor ut nostrud ex ullamco anim ad id duis ut.
            Lorem ipsum ullamco laboris dolor enim tempor ut nostrud ex ullamco anim ad id duis ut.
            Aute qui nostrud tempor tempor in aliquip magna sunt cupidatat adipisicing pariatur ea ut consectetur dolore exercitation culpa minim voluptate anim occaecat exercitation.
          </p>

       <Header 
          as="h3"
          classname="inconsolata"
          content="Ideal Candidate"
          style={{
                marginBottom: 0,
              }}
          >Ideal Candidate
          </Header>
          <p>
            Lorem ipsum ullamco laboris dolor enim tempor ut nostrud ex ullamco anim ad id duis ut.
            Lorem ipsum ullamco laboris dolor enim tempor ut nostrud ex ullamco anim ad id duis ut.
            Aute qui nostrud tempor tempor in aliquip magna sunt cupidatat adipisicing pariatur ea ut consectetur dolore exercitation culpa minim voluptate anim occaecat exercitation.
          </p>

       <Header 
          as="h3"
          classname="inconsolata"
          content="Desired Skills"
          style={{
                marginBottom: 0,
              }}
          >Desired Skills
          </Header>
          <ul>
          <li>UI/UX</li>
          <li>java</li>
          <li>javascript</li>
          <li>Nodejs</li>
          </ul>
      
       <Header 
          as="h3"
          classname="inconsolata"
          content="Salary Compensation"
          style={{
                marginBottom: 0,
              }}
        >Salary Compensation
        </Header>
        <p>10-100k</p>

       <Button primary>Email</Button>
      
       </div>

  )
 }
}

const mapStateToProps = state => ({
  // ABCD: getTotalSupplyDID(state)
})

const mapDispatchToProps = dispatch => ({
  // XYZ: () => dispatch(XYZ())
})

export default connect(mapStateToProps, mapDispatchToProps)(JobTemplate)
