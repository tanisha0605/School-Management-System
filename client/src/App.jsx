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
import ClassAnalytics from "./pages/ClassAnalytics"
import AddStudent from "./pages/AddStudent"
import AddClass from "./pages/AddClass"
import AddTeacher from "./pages/AddTeacher"
import ProfitAnalysis from "./pages/ProfitAnalysis"
import UpdateFormPage from "./pages/UpdateFormPage"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route  element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/class" element={<Class/>}/>
          <Route path="/class/add-class" element={<AddClass/>}/>
          <Route path="/teacher" element={<Teacher/>}/>
          <Route path="/teacher/add-teacher" element={<AddTeacher/>}/>
          <Route path="/student" element={<Student/>}/>
          <Route path="/student/add-student" element={<AddStudent/>}/>
          <Route path="/class-analytics/:name" element={<ClassAnalytics/>}/>
          <Route path="/profit-analysis" element={<ProfitAnalysis/>}/>
          <Route path="/:model/:model/update/:id" element={<UpdateFormPage/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

