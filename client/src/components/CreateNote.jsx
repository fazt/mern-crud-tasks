import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateNote() {
  const [content, setContent] = useState({
    title: "",
    content: "",
    date: new Date(),
    userSelected: "",
    users: [],
    _id: "",
  });
  const [editing, setEditing] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // const res = await axios.get("http://localhost:4000/api/users");
    // if (res.data.length > 0) {
    //   setContent({
    //     ...content,
    //     users: res.data.map((user) => user.username),
    //     userSelected: res.data[0].username,
    //   });
    // }
    if (params.id) {
      //     const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id);
      //     console.log(res.data)
      //     this.setState({
      //         title: res.data.title,
      //         content: res.data.content,
      //         date: new Date(res.data.date),
      //         userSelected: res.data.author,
      //         _id: res.data._id,
      //         editing: true
      //     });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.userSelected,
        date: this.state.date,
      };
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id,
        updatedNote
      );
    } else {
      const newNote = {
        title: content.title,
        content: content.content,
        // author: content.userSelected,
        author: 'fazt',
        date: content.date,
      };
      const res = await axios.post("http://localhost:4000/api/notes", newNote);
      console.log(res)
    }
    // navigate("/");
  };

  const onInputChange = ({ target: { name, value } }) =>
    setContent({
      ...content,
      [name]: value,
    });

  const onChangeDate = (date) => setContent({ ...content, date });

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h4>Create a Note</h4>
        <form onSubmit={onSubmit}>
          {/* SELECT THE USER */}
          {/* <div className="form-group">
            <select
              className="form-control"
              value={content.userSelected}
              onChange={onInputChange}
              name="userSelected"
              required
            >
              {content.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div> */}
          {/* Note Title */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              onChange={onInputChange}
              name="title"
              value={content.title}
              required
              autoFocus
            />
          </div>

          {/* Note Content */}
          <div className="mb-3">
            <textarea
              type="text"
              className="form-control"
              placeholder="Content"
              name="content"
              onChange={onInputChange}
              value={content.content}
              required
            ></textarea>
          </div>
          {/* Note Date */}
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={content.date}
              onChange={onChangeDate}
            />
          </div>
          <button className="btn btn-primary">
            Save <i className="material-icons">assignment</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;
