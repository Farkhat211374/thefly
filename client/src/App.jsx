import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexAdminPage from "./pages/IndexAdminPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import AccountPage from "./pages/Account";
import AirlinePage from "./pages/AirlinePage";
import PlanesPage from "./pages/PlanesPage";
import PlanesFormPage from "./pages/PlanesFormPage";
import AirlinesPage from "./pages/AirlinesPage.jsx";
import AirlinesFormPage from "./pages/AirlinesFormPage.jsx";

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
      <UserContextProvider>
          <Routes>
              <Route path="/" element={<Layout/>}>
                  <Route index element={<IndexAdminPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/account/:subpage?" element={<AccountPage />} />

                  <Route path="/airline" element={<AirlinePage />} />
                  <Route path="/admin/" element={<IndexAdminPage />} />
                  <Route path="/admin/planes" element={<PlanesPage/>} />
                  <Route path="/admin/planes/new" element={<PlanesFormPage/>} />

                  <Route path="/admin/airlines" element={<AirlinesPage/>} />
                  <Route path="/admin/airlines/new" element={<AirlinesFormPage/>} />
              </Route>
          </Routes>
      </UserContextProvider>
  )
}

export default App
