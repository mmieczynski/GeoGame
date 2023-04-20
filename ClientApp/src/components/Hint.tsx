import React from "react";
import {
  Box,
  Dialog,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

interface HintProps {
  hint: string;
  name: string;
}

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

const Hint: React.FC<HintProps> = ({ hint, name }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" fullWidth size="large" onClick={handleOpen}>
        {name}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid
            container
            justifyContent="flex-start"
            flexDirection="column"
            spacing={1}
          >
            <Grid item alignSelf="end" sx={{ margin: 1 }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid
              item
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
              >
                {hint}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default Hint;
