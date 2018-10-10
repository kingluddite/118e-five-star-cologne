import React, { Component } from 'react';

// GraphQL
import { Mutation } from 'react-apollo';
import { UPDATE_USER_COLOGNE } from '../../queries';

export class EditCologneModal extends Component {
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
          description: cologne.description,
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
                  <label htmlFor="scentName">Scent Name</label>
                  <input
                    type="text"
                    name="scentName"
                    onChange={handleChange}
                    value={cologne.scentName}
                  />
                  <label htmlFor="scentBrand">Scent Brand</label>
                  <input
                    type="text"
                    name="scentBrand"
                    onChange={handleChange}
                    value={cologne.scentBrand}
                  />
                  <label htmlFor="scentPrice">Scent Price</label>
                  <input
                    type="text"
                    name="scentPrice"
                    onChange={handleChange}
                    value={cologne.scentPrice}
                  />
                  {/* <label htmlFor="description">Add Description</label> */}
                  {/* <textarea */}
                  {/*   name="description" */}
                  {/*   onChange={handleChange} */}
                  {/*   value={cologne.description} */}
                  {/* /> */}
                  <hr />
                  <div className="modal-buttons">
                    <button className="button-primary">Update</button>
                    <button onClick={closeModal}>Cancel</button>
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
