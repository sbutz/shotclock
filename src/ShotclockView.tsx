import { Button, Stack, Typography } from "@mui/material";
import { Player, Shotclock } from "./lib/Shotclock";
import { Pause, PlayArrow} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';

import Layout from "./Layout";

const timerStyles = {
  fontSize: "min(60vw, 60vh)",
  textAlign: "center",
  lineHeight: 1,
}

const audio = new Audio(process.env.PUBLIC_URL + "/shotclock.mp3");

export default function ShotclockView() {
  const clock = useState(new Shotclock())[0];
  const [remainingTime, setRemainingTime] = useState(Math.round(clock.getRemainingTime()));
  const startStopIcon = clock.isStarted() ? <Pause /> : <PlayArrow />;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(Math.round(clock.getRemainingTime()));
    }, 250);

    return () => clearInterval(intervalId);
  }, [clock]);

  useEffect(() => {
    if (clock.isStarted() && remainingTime < 5) {
      audio.play();
    }
  }, [remainingTime, clock]);

  const toggleClock = () => { clock.isStarted() ? clock.pause() : clock.start() };
  return (
    <Layout>
      <Stack height="100%" alignItems="center" justifyContent="center" spacing={2}>
        <Typography sx={timerStyles}>{remainingTime}</Typography>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Button variant="contained" startIcon={startStopIcon} onClick={toggleClock} fullWidth>
              {clock.isStarted() ? "Pause" : "Start"}
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button variant="contained" onClick={() => clock.newShot()} fullWidth>Neuer Stoß</Button>
          </Grid>
          <Grid xs={6}>
            <Button variant="contained" onClick={() => clock.newRack()} fullWidth>Neues Rack</Button>
          </Grid>
          <Grid xs={6}>
            <Button
              onClick={() => clock.useExtension(Player.Home)}
              variant="contained"
              disabled={!clock.hasExtension(Player.Home)}
              fullWidth
            >
              Extension Heim
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button
              onClick={() => clock.useExtension(Player.Guest)}
              variant="contained"
              disabled={!clock.hasExtension(Player.Guest)}
              fullWidth
            >
              Extension Gast
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Layout>
  );
}