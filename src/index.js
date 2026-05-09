import React, { useReducer } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

// My Contexts
import DispatchContext from "./components/DispatchContext"

// My Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import CreatePost from "./components/createPost"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
//import ViewSinglePost from "./components/ViewSinglePost"
import ProfileUpload from "./components/ProfileUpload"
import ProfileDisplay from "./components/ProfileDisplay"
import FlashMsgs from "./FlashMsgs"

// 1. SET DEFAULT URL FOR BACKEND
Axios.defaults.baseURL = "/api"

// 2. GLOBAL STATE (The "Warehouse" for data)
const initialState = {
  loggedIn: Boolean(localStorage.getItem("complexAppToken")),
  flashMessages: [],
  user: {
    token: localStorage.getItem("complexAppToken"),
    username: localStorage.getItem("complexAppUsername")
  }
}

// 3. THE REDUCER (The "Instruction Manual" for state changes)
function ourReducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, loggedIn: true, user: action.data }
    case "logout":
      return { ...state, loggedIn: false }
    case "flashMessage":
      return { ...state, flashMessages: state.flashMessages.concat(action.value) }
    default:
      return state
  }
}

function Main() {
  // 4. INITIALIZE REDUCER
  const [state, dispatch] = useReducer(ourReducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <BrowserRouter>
        {/* We use state.flashMessages from our global state */}
        <FlashMsgs messages={state.flashMessages} />

        {/* The Header can now see state.loggedIn via props or context */}
        <Header loggedIn={state.loggedIn} />
        
        <Routes>
          {/* Use global state to decide which home to show */}
          <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
          
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile/:id" element={<ProfileUpload />} />
          <Route path="/profile-display/:id" element={<ProfileDisplay />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </DispatchContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

// Hot Module Replacement for faster development
if (module.hot) {
  module.hot.accept()
}