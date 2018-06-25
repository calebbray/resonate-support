import React, { Component } from 'react';
import Modal from 'react-modal';

class Supporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement(document.getElementById('app'));
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { supporter } = this.props;
    let secondaryContent;

    if (supporter.phone || supporter.email || supporter.location) {
      secondaryContent = (
        <div>
          <h3>Additional Information:</h3>
          {supporter.phone && <h4>Phone: {supporter.phone}</h4>}
          {supporter.email && <h4>Email: {supporter.email}</h4>}
          {supporter.location && (
            <h4>
              Address:<br />
              {supporter.location.address}
              <br />
              {supporter.location.city}, {supporter.location.state}
            </h4>
          )}
        </div>
      );
    }
    return (
      <tr>
        <td>{supporter.name}</td>
        <td>{supporter.pledge_amount}</td>
        <td>
          <button onClick={this.openModal} className="btn btn-info btn-table">
            View
          </button>
          <Modal
            isOpen={this.state.isOpen}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <h1>Supporter info</h1>
            <hr />
            <h2>Name: {supporter.name}</h2>
            <h2>
              Pledged Support: ${Number(supporter.pledge_amount).toFixed(2)}
            </h2>
            <hr />
            {secondaryContent}
            <button
              onClick={this.closeModal}
              className="btn btn-block btn-info"
            >
              Close
            </button>
          </Modal>
        </td>
      </tr>
    );
  }
}

export default Supporter;
