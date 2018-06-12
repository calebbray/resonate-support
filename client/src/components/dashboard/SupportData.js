import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { addSupport } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
import TextFieldGroup from '../common/TextFieldGroup';

class SupportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      name: '',
      amount: '',
      errors: {}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement(document.getElementById('App'));
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const newSupport = {
      name: this.state.name,
      amount: this.state.amount
    };

    this.props.addSupport(newSupport);
    if (!isEmpty(this.state.errors)) {
      this.closeModal();
    }
    e.preventDefault();
  }

  render() {
    const { errors } = this.state;
    const {
      pledge_supporters,
      support_goal,
      support_occurrences
    } = this.props.profile.profile;
    let supportTotal = 0;

    pledge_supporters.forEach(supporter => {
      supportTotal += Number(supporter.pledge_amount);
    });

    support_occurrences.forEach(support => {
      supportTotal += Number(support.amount);
    });

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const supportPeriod = new Date();
    return (
      <div>
        <h2>
          {months[supportPeriod.getMonth()]}, {supportPeriod.getFullYear()}
        </h2>
        <h3
          className={
            supportTotal >= Number(support_goal)
              ? 'text-center passing'
              : 'text-center failing'
          }
        >
          ${parseFloat(supportTotal).toFixed(2)}
        </h3>
        <p>
          ${supportTotal} out of ${support_goal} raised{' '}
        </p>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
        >
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              name="name"
              placeholder="Supporter Name"
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
            />
            <TextFieldGroup
              type="text"
              name="amount"
              placeholder="Support Amount"
              onChange={this.onChange}
              value={this.state.amount}
              error={errors.amount}
            />
            <input
              type="submit"
              value="Add Support"
              className="btn btn-info btn-block"
            />
            <button
              className="btn btn-danger btn-block"
              onClick={this.closeModal}
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
  { addSupport }
)(SupportData);
