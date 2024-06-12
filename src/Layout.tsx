import { ReactNode } from "react";
import { Stack } from "@mui/material";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Stack height="100vh">
        {/*}
        <AppBar position="sticky" color="transparent" elevation={0}>
            <Container>
                <Toolbar>
                </Toolbar>
            </Container>
        </AppBar>
        */}
        {children}
    </Stack>
  );
}