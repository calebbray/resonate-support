import React, { Component } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import TextFieldGroup from '../../common/TextFieldGroup';
import { connect } from 'react-redux';
import { addSupporterById } from '../../../actions/profileActions';
import isEmpty from '../../../validation/is-empty';

class ProfileSupporters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: '',
      phone: '',
      email: '',
      location: {
        address: '',
        city: '',
        state: ''
      },
      pledge_amount: '',
      errors: {}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    const newSupporter = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      pledge_amount: this.state.pledge_amount,
      location: {
        address: this.state.location.address,
        city: this.state.location.city,
        state: this.state.location.state
      }
    };
    this.props.addSupporterById(newSupporter, user._id);
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
    const { pledge_supporters } = this.props.profile.profile;
    const { errors } = this.state;
    let supporters;

    if (pledge_supporters.length > 0) {
      supporters = pledge_supporters.map(supporter => (
        <tr key={supporter._id}>
          <td>{supporter.name}</td>
          <td>{supporter.pledge_amount}</td>
          <td>{supporter.phone && supporter.phone}</td>
          <td>{supporter.email && supporter.email}</td>
          <td>
            <button>View</button>
          </td>
        </tr>
      ));
    }

    return (
      <div>
        <h2>Support Team</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Support Amount</th>
              <th>Phone</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>
          <tbody>{supporters}</tbody>
        </table>
        <button onClick={this.openModal} className="btn btn-info">
          Add Supporter
        </button>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
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
              name="pledge_amount"
              type="text"
              placeholder="Supporter Pledge Amount"
              value={this.state.pledge_amount}
              onChange={this.onChange}
              error={errors.pledge_amount}
            />
            <TextFieldGroup
              name="email"
              type="email"
              placeholder="Email Address"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              name="phone"
              type="text"
              placeholder="Phone Number"
              value={this.state.phone}
              onChange={this.onChange}
              error={errors.phone}
            />
            <TextFieldGroup
              name="address"
              type="text"
              placeholder="Address"
              value={this.state.address}
              onChange={this.onChange}
              error={errors.address}
            />
            <TextFieldGroup
              name="city"
              type="text"
              placeholder="City"
              value={this.state.city}
              onChange={this.onChange}
              error={errors.city}
            />
            <TextFieldGroup
              name="state"
              type="text"
              placeholder="State"
              value={this.state.state}
              onChange={this.onChange}
              error={errors.state}
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
  { addSupporterById }
)(ProfileSupporters);
