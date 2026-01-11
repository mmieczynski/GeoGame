import { useState } from "react";
import React from "react";
import { Grid, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import "./App.css";
import LocationCard from "./components/Location";

const App: React.FC = () => {
  const [code, setCode] = useState(localStorage.getItem("accessCode") ?? "");
  const [codeCorrect, setCodeCorrect] = useState(false);
  const [fetchInProgress, setFetchInProgress] = useState(false);

  const [data, setData] = useState<null | { codeCorrect: boolean }>(null);

  React.useEffect(() => {
    if (!fetchInProgress) return;
    let accessCode = code;
    if (code.includes(",")) {
      const values = code.split(",");
      localStorage.setItem("taskNumber", values[1]);
      localStorage.setItem("accessCode", values[0]);
      accessCode = values[0];
    }
    const fetchData = async () => {
      const response = await fetch(
        `https://geogamemac.azurewebsites.net/accessCode?accessCode=${accessCode}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
    setFetchInProgress(false);
  }, [fetchInProgress]);

  React.useEffect(() => {
    if (data?.codeCorrect === true) setCodeCorrect(true);
  }, [data]);

  const validateCode = () => {
    localStorage.setItem("accessCode", code);
    setFetchInProgress(true);
  };

  return (
    <div className="App">
      {!codeCorrect ? (
        <>
          <Grid container flexDirection="column" spacing={5}>
            <Grid size="auto">
              <Typography variant="h3">Hej!</Typography>
            </Grid>
            <Grid size="auto">
              <Typography variant="h6">Wpisz otrzymany kod poniżej:</Typography>
            </Grid>
            <Grid size="auto">
              <TextField
                variant="filled"
                label="Twój kod"
                onChange={(event) => setCode(event.target.value)}
                value={code}
              />
            </Grid>
            <Grid size="auto">
              <Button
                variant="contained"
                endIcon={<PlayCircleOutlineIcon />}
                size="large"
                onClick={validateCode}
              >
                Rozpocznij
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <LocationCard />
      )}
    </div>
  );
};

export default App;
