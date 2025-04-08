import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import CooperativasPage from "./pages/CooperativasPage";
import CooperadosPage from "./pages/CooperadosPage";
import ContatosPage from "./pages/ContatosPage";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cooperativa
          </Typography>
          <Link to="/" style={{ color: "white", marginRight: 20 }}>
            Cooperativas
          </Link>
          <Link to="/cooperados" style={{ color: "white", marginRight: 20 }}>
            Cooperados
          </Link>
          <Link to="/contatos" style={{ color: "white" }}>
            Contatos
          </Link>
        </Toolbar>
      </AppBar>

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
