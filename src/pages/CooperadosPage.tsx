import { CooperadoList } from "../components/Cooperado";
import { Container } from "@mui/material";

export default function CooperadosPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <CooperadoList />
    </Container>
  );
}
