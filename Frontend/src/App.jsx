import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [note, setNotes] = useState([]);

  function submitHandler(e) {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;

    //Post Api Call
    axios
      .post("http://localhost:3000/api/notes", {
        title,
        description,
      })
      .then((res) => {
        fetchNote();
      });
  }

  //Fetch Api Call
  function fetchNote() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  }

  function deleteHandler(id) {
    //Delete Api Call
    axios.delete("http://localhost:3000/api/notes/" + id).then((res) => {
      fetchNote();
    });
  }

  //Update Api Call
  function updateHandler(id , newDescription ){
 axios.patch("http://localhost:3000/api/notes/" +id , {
    description : newDescription
  }) .then((res)=>{
  fetchNote()
  })
  }
 

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>
      {note.map((note) => (
        <div className="noteBox" key={note._id}>
          <h3> {note.title}</h3>
          <input
            defaultValue={note.description}
            onBlur={(e) => updateHandler(note._id, e.target.value)} // updates when user clicks outside
            style={{ width: "80%" }}
          />
           <button>update</button>
          <button
            onClick={() => {
              deleteHandler(note._id);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* <List></List> */}
    </>
  );
}

export default App;
