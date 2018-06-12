import React, { Component } from 'react';
import { connect } from 'react-redux';
import Supporter from './Supporter';
import Modal from 'react-modal';
import TextFieldGroup from '../common/TextFieldGroup';
import { addSupporter } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

Modal.setAppElement(document.getElementById('App'));

class SupporterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
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
    this.onChange = this.onChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement(document.getElementById('App'));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
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
    this.props.addSupporter(newSupporter);
    if (!isEmpty(this.state.errors)) {
      this.closeModal();
    }
    e.preventDefault();
  }

  render() {
    const { pledge_supporters } = this.props.profile.profile;

    const supporters = pledge_supporters.map((supporter, index) => (
      <Supporter
        key={index}
        id={supporter._id}
        name={supporter.name}
        amount={supporter.pledge_amount}
        supporter={supporter}
      />
    ));

    let supportData;

    if (pledge_supporters.length > 0) {
      supportData = (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Support Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>{supporters}</tbody>
          </table>
        </div>
      );
    } else {
      supportData = (
        <div>
          <p>You Have No Supporters :(</p>
        </div>
      );
    }

    const { errors } = this.state;
    return (
      <div>
        {supportData}
        <Modal
          isOpen={this.state.modalIsOpen}
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
  { addSupporter }
)(SupporterList);
