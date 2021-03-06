import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { readEvents } from '../actions'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import FloatingActionButon from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <TableRowColumn>
            <Link to={`events/${event.id}`}>
            {event.title}
            </Link>
        </TableRowColumn>
        <TableRowColumn>{event.body}</TableRowColumn>
      </TableRow>
    ))
  }
  render() {
      const style = {
          position: "fixed",
          right: 12,
          bottom: 12
      }
    return (
        <React.Fragment>
            <FloatingActionButon style={style} containerElement={<Link to="/events/new" />}>
                <ContentAdd />
            </FloatingActionButon>
          <Table>
            <TableHeader displaySelectAll={false} adjustforcheckbox="false">
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Title</TableHeaderColumn>
                <TableHeaderColumn>Body</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} adjustforcheckbox="false">
              {this.renderEvents()}
            </TableBody>
          </Table>
        </React.Fragment>
      )
  }
}

const mapStateToProps = state => ({ events: state.events})
const mapDispachToProps = ({ readEvents })


export default connect(mapStateToProps, mapDispachToProps)(EventsIndex)
