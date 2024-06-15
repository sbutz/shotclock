import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorView() {
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center" spacing={2}>
      <Typography>This page does not exist</Typography>
      <Button component={Link} to="/" variant="contained">Go back</Button>
    </Stack>
  );
}