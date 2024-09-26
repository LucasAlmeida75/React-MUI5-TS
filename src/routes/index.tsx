import { Button } from '@mui/material';
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';

export const AppRoutes = () => {
    const { toggleDrawerOpen, setDrawerOptions } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                label: "Página Inicial",
                icon: "home",
                path: "/pagina-inicial"
            }
        ]);
    }, [setDrawerOptions])
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button variant='contained' color='primary' onClick={toggleDrawerOpen}>Toggle Drawer</Button>}></Route>

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}