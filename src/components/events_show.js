import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEvent, deleteEvent, putEvent } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxFor, reduxForm} from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'


class EventsShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick =this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getEvent(id)
  }
  renderField(field) {
    const {input, label, type, meta: {touched, error } } = field

    return (
      <TextField hintText={label} floatingLabelText={label} type={type} errorText={touched && error} { ...input} fullWidth={true} />)
  }

  async onSubmit(values) {
    await this.props.putEvent(values)
    this.props.history.push('/')
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = {margin: 12}
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
            <Field label="Title" name="title" type="text" component={this.renderField} />
            <Field label="Body" name="body" type="text" component={this.renderField} />
        </div>

        <div>
          <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
          <RaisedButton label="Delete" style={style} containerElement={<Link to="/" />} onClick={this.onDeleteClick} />
        </div>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, state }
}

const mapDispachToProps = ({ deleteEvent, getEvent, putEvent })

export default connect(mapStateToProps, mapDispachToProps)(
  reduxForm ({ validate, form: 'eventShowForm', enableReinitialize: true})(EventsShow)
)