import React, { Component } from 'react';
import { connect } from 'react-redux';
import Supporter from './Supporter';
import Link from 'react-router-dom/Link';
import Modal from 'react-modal';
import TextFieldGroup from '../common/TextFieldGroup';

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

  render() {
    const { pledge_supporters } = this.props.profile.profile;

    const supporters = pledge_supporters.map((supporter, index) => (
      <Supporter
        key={index}
        id={supporter._id}
        name={supporter.name}
        amount={supporter.pledge_amount}
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
            <tr />
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
        <Modal isOpen={this.state.modalIsOpen}>
          <h1>This is the modal</h1>
          <button onClick={this.closeModal.bind(this)}>Close Modal</button>
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
          </form>
        </Modal>
        <button onClick={this.openModal.bind(this)} className="btn btn-info">
          Open Modal
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(SupporterList);
