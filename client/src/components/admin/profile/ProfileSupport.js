import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSupportById } from '../../../actions/profileActions';
import isEmpty from '../../../validation/is-empty';
import Modal from 'react-modal';
import TextFieldGroup from '../../common/TextFieldGroup';

class ProfileSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: '',
      amount: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement(document.getElementById('app'));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { user } = this.props.profile.profile;
    const newSupport = {
      name: this.state.name,
      amount: this.state.amount
    };

    this.props.addSupportById(newSupport, user._id);
    if (!isEmpty(this.state.errors)) {
      this.closeModal();
    }
    e.preventDefault();
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { support_occurrences } = this.props.profile.profile;
    const { errors } = this.state;

    let support;

    if (support_occurrences.length > 0) {
      support = support_occurrences.map(occur => (
        <tr key={occur._id}>
          <td>{occur.name}</td>
          <td>{occur.amount}</td>
          <td>{occur.date}</td>
        </tr>
      ));
    }

    return (
      <div>
        <h2>Support Payments</h2>
        <table>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{support}</tbody>
        </table>
        <button className="btn btn-info" onClick={this.openModal.bind(this)}>
          Add Support
        </button>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal.bind(this)}
          ariaHideApp={false}
        >
          <h1 className="text-center">Add Supporter</h1>

          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              name="name"
              type="text"
              placeholder="Supporter Name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              name="amount"
              type="text"
              placeholder="Support Amount"
              value={this.state.amount}
              onChange={this.onChange}
              error={errors.amount}
            />
            <input
              type="submit"
              value="Add Supporter"
              className="btn btn-info btn-block"
            />
            <button
              className="btn btn-danger btn-block"
              onClick={this.closeModal.bind(this)}
            >
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addSupportById }
)(ProfileSupport);
