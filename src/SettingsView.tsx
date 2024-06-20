import { IconButton, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Layout from "./Layout";
import { Close } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import useSharedShotclock from "./useSharedShotclock";
import { IShotclock } from "./lib/Shotclock";
import { dbuConfig, matchroomConfig } from "./lib/ShotclockConfig";

function CloseButton() {
    const navigate = useNavigate();

    return (
        <IconButton size="large" onClick={() => { navigate(-1); }}>
            <Close />
        </IconButton>
    );
};

export default function SettingsView() {
    const { id } = useParams();
    const clock : IShotclock|undefined = useSharedShotclock(id!);

    const config = clock?.getConfig().equals(matchroomConfig) ? "matchroom" : "dbu";

    const onChange = (event: React.MouseEvent<HTMLElement>, c: string) => {
        if (c === "matchroom") {
            clock?.setConfig(matchroomConfig);
        } else {
            clock?.setConfig(dbuConfig);
        }
    };

    return (
        <Layout toolbarItems={<CloseButton />}>
            <Stack height="100%" alignItems="center" justifyContent="center" spacing={2}>
                <ToggleButtonGroup
                    value={config}
                    exclusive
                    onChange={onChange}
                >
                    <ToggleButton value="matchroom">Matchroom (30 s)</ToggleButton>
                    <ToggleButton value="dbu">DBU (35 s)</ToggleButton>
                </ToggleButtonGroup>
            </Stack>
        </Layout>
    )
}