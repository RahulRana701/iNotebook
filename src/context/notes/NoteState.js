import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  // THIS WAS JUST TO MAKE YOU UNDERSTAND HOW TO USE CONTEXT API 
  // const s1={
  //     "name":"rana",
  //     "class":"12"
  // }

  // // upadting the state
  // const [state,setState]=useState(s1);
  // const update=()=>{
  //     setTimeout(() => {
  //         setState({
  //             "name":"rahul",
  //             "class":"god"
  //         })
  //     }, 4000);
  // }


  // this is the host variable we created 
  const host = "http://localhost:5000"

  const notesinitial = [

    // HUME APNE NOTES AISE NHI LAYEGE BEACUSE ISKI VAJA SE HUM INHI NOTES MEI GHUMTE REH JEGE , HUM FETCH API
    // USE KRKE NOTES LEKR AAYEGE

    // {
    //   "_id": "64747a0e40650db0fd425576f",
    //   "user": "6474582c3def68d58673a4f7",
    //   "title": "ym life",
    //   "description": "fuddu life hai veere",
    //   "__v": 0
    // },
    // {
    //   "_id": "64747a5b40650db0fd425578w",
    //   "user": "6474582c3def68d58673a4f7",
    //   "title": "siddhuuu moosewala",
    //   "description": "sach bolega ta milu 295 je krega",
    //   "__v": 0
    // },
    // {
    //   "_id": "64747a5b40650db0fd425578a",
    //   "user": "6474582c3def68d58673a4f7",
    //   "title": "siddhuuu moosewala",
    //   "description": "sach bolega ta milu 295 je krega",
    //   "__v": 0
    // },
    // {
    //   "_id": "64747a0e40650db0fd425576c",
    //   "user": "6474582c3def68d58673a4f7",
    //   "title": "ym life",
    //   "description": "fuddu life hai veere",
    //   "__v": 0
    // }
  ]

  const [notes, setNotes] = useState(notesinitial)

  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  }

  // ADD A NOTE
  const addnote = async (title, description) => {

    // FETCH API
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      // is request ke liye jo jo header mei chahiye vo yaha daal do.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description }),
    });
    const note = await response.json();

    // CLIENT SIDE
    setNotes(notes.concat(note))
    // .concat returns a new array , hence we will not get any error related to that notes.map is not a function.
  }

  // DELETE A NOTE 
  const deletenote = async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
        // NOW WE ARE NOT USING BELOW ONE BECAUSE WE HAVE STORED OUR AUTH-TOKEN IN LOCAL STORAGE AND WE WILL GET AUTH TOKEN FROM IT , SO THAT
        // USER CAN GET HIS/HER NOTES ONLY
        // "auth-token":"yaha ek particular auth token tha pehle"
      },
    });
    const json = response.json();
    console.log(json);


    // this is done on the CLIENT SIDE ,we have to do in backend as well , for that we have to make api call
    // iska mtlb ye hai ki agr note._id ki id agr id ke barabar hai to hi newnotes mei rahe vrna nhi.
    // note._id is written like this because the id that come from database containes _ as first character.
    console.log("deleting a note " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNotes);
  }

  // EDIT A NOTE 
  const editnote = async (id, title, description) => {

    // CALL TO API OR FETCH API 
    // yaha url ki jaga humne uska url dala jaha se hamara backend chlda ae
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description }),
    });
    const json = await response.json();
    console.log(json);

    // CLIENT SIDE DONE
    // IF WE UPDATE OUR NOTES THEY WILL NOT CHANGE ON THE FRONTEND DIRECTLY WEH HAVE TO RELOAD THE PAGE TO SEE
    // THE CHANGES BEACUSE IN REACT WE CANNOT CHANGE THE STATE DIRECTLY , HENCE TO SOLVE THAT WE WILL DO THIS
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
      }
    }
    setNotes(newNotes);

  }

  return (

    // added state in our context , and this syntax means ki whenever we will try to wrap anything in this 
    // context all it's children will come in automatically

    // this means we can use any function to update our state and can use it anywhere we want 
    // <noteContext.Provider value={{state,update}}>
    //     {props.children}
    // </noteContext.Provider>



    // we are providing notes throught this state now
    // is notestate function ke through hum jo provide krna chahte hai use value mei daal do 
    <noteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;


// HUM YE FETCH API CALL ALAG SE ISLIYE KR RAHE HAI BECAUSE WE WANT THAT IF WE DELETE OR EDIT OR ADD A NOTE
// IT GETS DELETED , UPDATED , OR EDITED IN THE DATABASE AS WELL.