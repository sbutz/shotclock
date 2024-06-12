import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Player, Shotclock } from "./lib/Shotclock";
import { PauseCircleFilledRounded, PlayCircleFilledOutlined, PowerSettingsNewRounded, RestartAltRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";

const iconStyles = {
  fontSize: '5rem',
}

const timerStyles = {
  fontSize: "min(60vw, 60vh)",
  textAlign: "center",
  lineHeight: 1,
}

export default function ShotclockView() {
  const clock = useState(new Shotclock())[0];
  const [remainingTime, setRemainingTime] = useState(clock.getRemainingTime());
  const [isStarted, setIsStarted] = useState(clock.isStarted());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(clock.getRemainingTime());
      setIsStarted(clock.isStarted());
    }, 250);

    return () => clearInterval(intervalId);
  }, [clock]);

  const toggleClock = () => { clock.isStarted() ? clock.pause() : clock.start() };
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => clock.useExtension(Player.Home)}
          variant="contained"
          color="primary"
          disabled={!clock.hasExtension(Player.Home)}
        >
          Extension (Heim)
        </Button>
        <Button
          onClick={() => clock.useExtension(Player.Guest)}
          variant="contained"
          color="error"
          disabled={!clock.hasExtension(Player.Guest)}
        >
          Extension (Gast)
        </Button>
      </Stack>
      <Typography sx={timerStyles}>{remainingTime.toFixed(0)}</Typography>
      <Stack direction="row">
        <IconButton onClick={() => clock.newShot()} size="large">
          <RestartAltRounded sx={iconStyles}/>
        </IconButton>
        <IconButton onClick={toggleClock} size="large">
          {isStarted ? <PauseCircleFilledRounded sx={iconStyles}/> : <PlayCircleFilledOutlined sx={iconStyles} />}
        </IconButton>
        <IconButton onClick={() => clock.newRack()} size="large">
          <PowerSettingsNewRounded sx={iconStyles}/>
        </IconButton>
      </Stack>
    </Stack>
  );
}