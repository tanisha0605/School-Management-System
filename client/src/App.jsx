import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import Student from "./pages/Student"
import Teacher from "./pages/Teacher"
import Class from "./pages/Class"
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/class" element={<Class/>}/>
      <Route path="/teacher" element={<Teacher/>}/>
      <Route path="/student" element={<Student/>}/>
      <Route  element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

