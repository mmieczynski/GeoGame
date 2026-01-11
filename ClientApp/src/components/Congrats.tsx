import React from "react";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ConfettiExplosion from "react-confetti-explosion";
import ReactConfetti from "react-confetti";

interface CongratsProps {
  onShowTask: () => void;
}

const Congrats: React.FC<CongratsProps> = ({ onShowTask }) => {
  return (
    <Grid container justifyContent="center" alignContent="center" spacing={5}>
      <Grid size="auto">
        <Typography variant="h4">Gratulacje! Miejsce znalezione!</Typography>{" "}
      </Grid>
      {Number(localStorage.getItem("taskNumber")) % 2 === 0 ? (
        <ConfettiExplosion />
      ) : (
        <ReactConfetti />
      )}

      <Grid size="auto">
        <Typography variant="h6">
          Kliknij na poniższy przycisk aby wyświetlić zadanie:
        </Typography>
      </Grid>
      <Grid size="auto">
        <Button onClick={onShowTask} variant="contained">
          Wyświetl zadanie
        </Button>
      </Grid>
    </Grid>
  );
};

export default Congrats;
