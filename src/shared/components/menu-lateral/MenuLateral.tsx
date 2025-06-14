import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useAppDrawerContext, useAppThemeContext, useAuthContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IMenuLateralProps {
    children?: React.ReactNode;
}

interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick?: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({to, icon, label, onClick}) => {
    const reselvedPath = useResolvedPath(to);
    const match = useMatch({ path: reselvedPath.pathname, end: false});

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    )
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useAppDrawerContext();
    const { toggleTheme } = useAppThemeContext();
    const { logout } = useAuthContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
                    <Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
                        <Avatar sx={{height: theme.spacing(12), width: theme.spacing(12)}} src="https://thispersondoesnotexist.com"/>
                    </Box>

                    <Divider/>

                    <Box flex={1}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption => {
                                return <ListItemLink key={drawerOption.path} to={drawerOption.path} icon={drawerOption.icon} label={drawerOption.label} onClick={smDown ? toggleDrawerOpen : undefined}/>
                            })}
                        </List>
                    </Box>

                    <Box>
                        <ListItemLink label="Alterar Tema" icon="dark_mode" to="#" onClick={toggleTheme} />
                        <ListItemLink label="Sair" icon="logout" to="#" onClick={logout} />
                    </Box>
                </Box>
            </Drawer>

            <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    )
}