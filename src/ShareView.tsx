import { IconButton, Link, Stack } from "@mui/material";
import Layout from "./Layout";
import { Close } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

function CloseButton() {
    const navigate = useNavigate();

    return (
        <IconButton size="large" onClick={() => { navigate(-1); }}>
            <Close />
        </IconButton>
    );
};

export default function ShareView() {
    const { id } = useParams();
    const url = `${window.location.origin}${process.env.PUBLIC_URL}/v/${id}`;

    return (
        <Layout toolbarItems={<CloseButton />}>
            <Stack height="100%" alignItems="center" justifyContent="center" spacing={2}>
                <QRCodeSVG width="100%" size={256} value={url} />
                <Link variant="h6" href={url}>
                    {url}
                </Link>
            </Stack>
        </Layout>
    )
}