import React, { useEffect } from 'react'
// to use context api we imported usecontext
import { useContext } from 'react'

import noteContext from '../context/notes/NoteContext'


// this is how our about page is using context api and we can give it to any context api we want 


const About = () => {
  // const a = useContext(noteContext);

  // we will use a useEffect hook here.this empty array means how many times we want to run this effect , 
  // hence we want to run it once so we leave it empty 

  // useEffect(() => {
  //   a.update()
  // }, [])


  return (
    <div>
      {/* this is about {a.name} and he study in class {a.class} */}

      {/* we are writing state in this because now we put state inside a state */}
      {/* this is about {a.state.name} and he study in class {a.state.class} */}


      <h2>THIS IS ABOUT PAGE</h2>

    </div>
  )
}

export default About
