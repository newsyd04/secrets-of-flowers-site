import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Navbar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import PhotographyPage from "./pages/PhotographyPage.jsx";
import LessonsPage from "./pages/LessonsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/photography" element={<PhotographyPage />}/>
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
