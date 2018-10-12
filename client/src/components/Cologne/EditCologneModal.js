import React, { Component } from "react";
import PropTypes from "prop-types";

// GraphQL
import { Mutation } from "react-apollo";
import { UPDATE_USER_COLOGNE } from "../../queries";

class EditCologneModal extends Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    cologne: PropTypes.object.isRequired
  };

  render() {
    const { handleChange, closeModal, cologne, handleSubmit } = this.props;

    return (
      <Mutation
        mutation={UPDATE_USER_COLOGNE}
        variables={{
          _id: cologne._id,
          scentName: cologne.scentName,
          scentBrand: cologne.scentBrand,
          scentPrice: cologne.scentPrice,
          description: cologne.description
        }}
      >
        {updateUserCologne => (
          <div className="modal modal-open">
            <div className="modal-inner">
              <div className="modal-content">
                <form
                  className="modal-content-inner"
                  onSubmit={event => handleSubmit(event, updateUserCologne)}
                >
                  <label htmlFor="scentName">
                    <input
                      type="text"
                      name="scentName"
                      onChange={handleChange}
                      value={cologne.scentName}
                    />
                    Scent Name
                  </label>
                  <label htmlFor="scentBrand">
                    <input
                      type="text"
                      name="scentBrand"
                      onChange={handleChange}
                      value={cologne.scentBrand}
                    />
                    Scent Brand
                  </label>
                  <label htmlFor="scentPrice">
                    <input
                      type="text"
                      name="scentPrice"
                      onChange={handleChange}
                      value={cologne.scentPrice}
                    />
                    Scent Price
                  </label>
                  {/* <label htmlFor="description">Add Description</label> */}
                  {/* <textarea */}
                  {/*   name="description" */}
                  {/*   onChange={handleChange} */}
                  {/*   value={cologne.description} */}
                  {/* /> */}
                  <hr />
                  <div className="modal-buttons">
                    <button type="button" className="button-primary">
                      Update
                    </button>
                    <button type="button" onClick={closeModal}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default EditCologneModal;
