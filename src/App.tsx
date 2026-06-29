import { Routes, Route } from "react-router-dom";
import IndexHub from "./pages/IndexHub";
import NumerologyMap from "./pages/Map";
import Compass from "./pages/Compass";
import Frequency from "./pages/Frequency";
import Zug from "./pages/Zug";
import Bsamim from "./pages/Bsamim";
import Messages from "./pages/Messages";
import Privacy from "./pages/Privacy";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexHub />} />
      <Route path="/map" element={<NumerologyMap />} />
      <Route path="/compass" element={<Compass />} />
      <Route path="/frequency" element={<Frequency />} />
      <Route path="/zug" element={<Zug />} />
      <Route path="/bsamim" element={<Bsamim />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
}
