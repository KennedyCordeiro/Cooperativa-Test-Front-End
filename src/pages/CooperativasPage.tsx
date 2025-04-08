import { useState } from "react";
import { Button } from "@mui/material";
import CooperativaList from "../components/CooperativaList";
import CooperativaForm from "../components/CooperativaForm";
import ModalStyled from "../components/ModalStyled";

export default function CooperativasPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 3 }}>
        Nova Cooperativa
      </Button>

      <CooperativaList key={refreshKey} />

      <ModalStyled
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Nova Cooperativa">
        <CooperativaForm
          onSuccess={() => {
            setModalOpen(false);
            setRefreshKey((old) => old + 1);
          }}
        />
      </ModalStyled>
    </>
  );
}
