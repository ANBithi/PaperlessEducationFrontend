import "./App.css";
import Layout from "./Components/NavBar/Layout";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Setting from "./Components/Setting";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import ManageProfile from "./Components/Employee/ManageProfile/ManageProfile";
import Administration from "./Components/Administration/Administration";
import Courses from "./Components/Courses/Courses";
import CourseDetails from "./Components/Courses/CourseDetail";
import CourseResult from "./Components/Results/CourseResult";
import ResultView from "./Components/Results/ResultView";
import Enroll from "./Components/Enroll/Enroll";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ProtectedRoutes />}>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="settings" element={<Setting />} />
						<Route path="administration" element={<Administration/>} />
						<Route
							path="manage-profile"
							element={<ManageProfile />}
						/>
					
						<Route exact path="courses" element={<Courses />} />
						<Route exact path="results" element={<Courses />} />
						<Route exact path="courses/:id" element={<CourseDetails />} />	
						<Route exact path="results/:id" element={<CourseResult />} />	
						<Route path="std-results" element={<ResultView />} />	
						<Route path="enroll" element={<Enroll />} />							
	

						{/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
					</Route>
				</Route>
				<Route path="login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
