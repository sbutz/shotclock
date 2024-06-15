import { ReactNode } from "react";
import { AppBar, Stack, Toolbar, Typography } from "@mui/material";

interface LayoutProps {
    children?: ReactNode;
    toolbarItems?: ReactNode
}

export default function Layout({ children, toolbarItems }: LayoutProps) {
  return (
    <Stack height="100vh">
        <AppBar position="sticky" color="transparent" elevation={0}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              </Typography>
              {toolbarItems}
            </Toolbar>
        </AppBar>
        {children}
    </Stack>
  );
}