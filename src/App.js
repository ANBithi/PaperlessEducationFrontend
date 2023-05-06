import "./App.css";
import Layout from "./Components/NavBar/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import SetUpExam from "./Components/Exam/SetUpExam";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="settings" element={<Setting />} />
						<Route
							path="administration"
							element={<Administration />}
						/>
						<Route
							path="manage-profile"
							element={<ManageProfile />}
						/>

						<Route path="courses">
							<Route index element={<Courses />}/>
							<Route path=":id">
								<Route index element={<CourseDetails />}/>
								<Route
									path="create-exam"
									element={<SetUpExam />}
								/>
							</Route>
						</Route>
						<Route path="results">
							<Route index element={<Courses />}/>
							<Route path=":id" element={<CourseResult />} />
						</Route>
						<Route path="std-results" element={<ResultView />} />
						<Route path="enroll" element={<Enroll />} />
					</Route>
				</Route>
				<Route path="login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
