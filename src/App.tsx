import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import CooperativasPage from "./pages/CooperativasPage";
import CooperadosPage from "./pages/CooperadosPage";
import ContatosPage from "./pages/ContatosPage";
import Navbar from "./components/Shared/Navbar";
import PageTitle from "./components/Shared/PageTitle";

function App() {
  return (
    <Router>
      <PageTitle />
      <Navbar />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<CooperativasPage />} />
          <Route path="/cooperados" element={<CooperadosPage />} />
          <Route path="/contatos" element={<ContatosPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
