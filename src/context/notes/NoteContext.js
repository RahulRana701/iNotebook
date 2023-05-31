import { createContext } from "react"

// created a context , now we will put some state in it , the state we will put is in another folder , we will
// export this state and import that state in that folder 

const noteContext = createContext();

export default noteContext;