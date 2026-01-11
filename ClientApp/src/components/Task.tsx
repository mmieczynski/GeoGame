import React from "react";
import { Box, Grid, IconButton, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

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

interface CongratsProps {
  onTaskFinished: () => void;
  taskText: string;
}

const Task: React.FC<CongratsProps> = ({ onTaskFinished, taskText }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container justifyContent="center" alignContent="center" spacing={5}>
        <Grid size="auto" marginBottom={10}>
          <Typography
            align="left"
            sx={{ lineHeight: 1.6, letterSpacing: 2, fontSize: "28px" }}
          >
            {taskText}
          </Typography>
        </Grid>
        <Grid size="auto">
          <Typography variant="h6">
            Kliknij kiedy zadanie zostało wykonane:
          </Typography>
        </Grid>
        <Grid size="auto">
          <Button onClick={handleOpen} variant="contained">
            Zrobione!
          </Button>
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
              <Typography
                variant="h5"
                sx={{ lineHeight: 1.6, letterSpacing: 2 }}
                marginBottom={4}
              >
                Czy na pewno?
              </Typography>
              <Button
                onClick={onTaskFinished}
                variant="contained"
                sx={{ marginRight: 8 }}
              >
                Tak!
              </Button>
              <Button onClick={handleClose} variant="outlined">
                Nie :d
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
