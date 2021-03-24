import React from 'react';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';

const DeleteMovieModal = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const { deleteMovie } = props;

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        deleteMovie(res.data);
        push('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="deleteMovieModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h4 className="modal-title">Delete Movie</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => push(`/movies/${id}`)}
                aria-hidden="true">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete these records?</p>
              <p className="text-warning">
                <small>This action cannot be undone.</small>
              </p>
            </div>
            <div className="modal-footer">
              <input
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                value="Cancel"
                onClick={() => push(`/movies/${id}`)}
              />
              <input
                type="submit"
                className="btn btn-danger"
                value="Delete"
                onClick={handleDelete}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteMovieModal;
