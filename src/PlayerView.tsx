import { Button, Stack, Typography } from "@mui/material";
import Layout from "./Layout";
import Grid from '@mui/material/Unstable_Grid2';
import { Navigate, useParams } from "react-router-dom";
import useReadonlyShotclock from "./useReadonlyShotclock";
import { IReadonlyShotclock, Player } from "./lib/Shotclock";
import { useEffect } from "react";
import { playSound } from "./Sounds";

const timerStyles = {
  fontSize: "min(60vw, 60vh)",
  textAlign: "center",
  lineHeight: 1,
}

export default function PlayerView() {
    const { id } = useParams();
    const [clock, loading, error] = useReadonlyShotclock(id!) as [IReadonlyShotclock|undefined, boolean, Error];

    useEffect(() => {
        if (clock?.isStarted()) {
            playSound(clock.getRemainingTime());
        }
    }, [clock]);

    if (!loading && error) {
        return <Navigate to="/404" />;
    } else {
        return (
            <Layout>
                <Stack height="100%" justifyContent="center" spacing={2}>
                    <Typography sx={timerStyles}>{clock?.getRemainingTime()}</Typography>
                    <Grid container spacing={2}>
                        <Grid xs={6}>
                            <Button
                                color="primary"
                                variant="contained"
                                disabled={!clock?.hasExtension(Player.Home)}
                                fullWidth
                            >
                                Extension Heim  
                            </Button>
                        </Grid>
                        <Grid xs={6}>
                            <Button
                                color="error"
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
        )
    }
}