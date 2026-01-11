import React from "react";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Hint from "./Hint";
import DirectionHint from "./DirectionText";
import CloseIcon from "@mui/icons-material/Close";
import { GpsPosition, TaskData } from "../types";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85vw",
  //   height: "60vh",
  bgcolor: "#242424",
  boxShadow: 24,
  borderRadius: 2,
};

interface LocationSearchProps {
  onArrived: () => void;
  taskData: TaskData;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onArrived,
  taskData,
}) => {
  const [locationMessage, setLocationMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const position: GpsPosition = {
          latitude: p.coords.latitude,
          longitude: p.coords.longitude,
        };

        if (
          Math.abs(position.latitude - taskData.location.latitude) < 0.002 &&
          Math.abs(position.longitude - taskData.location.longitude) < 0.002
        ) {
          onArrived();
        } else {
          setLocationMessage("Niestety jeszcze nie to miejsce");
        }
      },
      (err) => {
        alert(err);
      },
      { enableHighAccuracy: true, timeout: 3000, maximumAge: 0 }
    );
    setOpen(true);
  };
  const handleClose = () => {
    setLocationMessage("");
    setOpen(false);
  };

  return (
    <>
      <Grid size="auto">
        <Typography
          // variant="h4"
          align="left"
          sx={{ lineHeight: 1.6, letterSpacing: 2, fontSize: "28px" }}
        >
          {taskData.mainHint}
        </Typography>
      </Grid>
      <Grid size="auto" alignSelf="flex-start">
        <Button
          variant="text"
          color="primary"
          sx={{ fontSize: "16px" }}
          onClick={handleOpen}
        >
          Dotknij aby sprawdzić czy jesteś na miejscu.
        </Button>
      </Grid>
      <Grid size="auto">
        <Typography
          variant="h6"
          align="left"
          alignSelf="flex-start"
          marginBottom={3}
        >
          Podpowiedzi:
        </Typography>
        <Grid container spacing={3} flexDirection="row">
          <Grid size="grow" flexBasis={0} flexGrow={1} flexShrink={1}>
            <Hint
              hint={taskData.smallHint}
              name="Mała"
              type="text"
              location={taskData.location}
            />
          </Grid>
          <Grid size="grow" flexBasis={0} flexGrow={1} flexShrink={1}>
            <Hint
              hint={taskData.bigHint}
              name="Duża"
              type="text"
              location={taskData.location}
            />
          </Grid>
          <Grid size="grow" flexBasis={0} flexGrow={1} flexShrink={1}>
            <Hint
              hint="Ten budynek jest cały czarny oraz jest pokryty prawie w całości z okien."
              name="Kierunek"
              type="direction"
              location={taskData.location}
            />
          </Grid>
          <Grid size="grow" flexBasis={0} flexGrow={1} flexShrink={1}>
            <Hint
              hint="Ten budynek jest cały czarny oraz jest pokryty prawie w całości z okien."
              name="Dystans"
              type="distance"
              location={taskData.location}
            />
          </Grid>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid
            container
            justifyContent="flex-start"
            flexDirection="column"
            spacing={1}
          >
            <Grid size="auto" alignSelf="end" sx={{ margin: 1 }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid
              size="auto"
              sx={{
                marginLeft: 4,
                marginRight: 4,
                marginTop: 2,
                marginBottom: 8,
              }}
            >
              {
                <Typography
                  variant="h5"
                  sx={{ lineHeight: 1.6, letterSpacing: 2 }}
                >
                  {locationMessage === ""
                    ? "Spradzam lokalizacje..."
                    : locationMessage}
                </Typography>
              }
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default LocationSearch;
