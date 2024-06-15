import { useEffect } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Pause, PlayArrow, Share} from "@mui/icons-material";
import Grid from '@mui/material/Unstable_Grid2';
import { IShotclock, Player } from "./lib/Shotclock";
import Layout from "./Layout";
import useSharedShotclock from "./useSharedShotclock";
import { useNavigate, useParams } from "react-router-dom";

const timerStyles = {
  fontSize: "min(60vw, 60vh)",
  textAlign: "center",
  lineHeight: 1,
}

const audio = new Audio(process.env.PUBLIC_URL + "/shotclock.mp3");
const playAudio = async () => {
  try {
    await audio.play();
  } catch (e) {console.log(e)}
};

function ShareButton() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <IconButton size="large" onClick={() => { navigate(`/s/${id}`); }}>
      <Share />
    </IconButton>
  );
}

export default function ShotclockView() {
  const { id } = useParams();
  const clock : IShotclock|undefined = useSharedShotclock(id!);
  const startStopIcon = clock?.isStarted() ? <Pause /> : <PlayArrow />;

  useEffect(() => {
    if (clock?.isStarted() && clock?.getRemainingTime() < 5) {
      playAudio();
    }
  }, [clock]);

  const toggleClock = () => { clock?.isStarted() ? clock?.pause() : clock?.start() };
  return (
    <Layout toolbarItems={<ShareButton />}>
      <Stack height="100%" alignItems="center" justifyContent="center" spacing={2}>
        <Typography sx={timerStyles}>{clock?.getRemainingTime()}</Typography>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Button variant="contained" startIcon={startStopIcon} onClick={toggleClock} fullWidth>
              {clock?.isStarted() ? "Pause" : "Start"}
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button variant="contained" onClick={() => clock?.newShot()} fullWidth>Neuer Stoß</Button>
          </Grid>
          <Grid xs={6}>
            <Button variant="contained" onClick={() => clock?.newRack()} fullWidth>Neues Rack</Button>
          </Grid>
          <Grid xs={6}>
            <Button
              onClick={() => clock?.useExtension(Player.Home)}
              variant="contained"
              disabled={!clock?.hasExtension(Player.Home)}
              fullWidth
            >
              Extension Heim
            </Button>
          </Grid>
          <Grid xs={6}>
            <Button
              onClick={() => clock?.useExtension(Player.Guest)}
              variant="contained"
              disabled={!clock?.hasExtension(Player.Guest)}
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