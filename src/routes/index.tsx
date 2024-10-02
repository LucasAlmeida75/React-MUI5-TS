
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDePessoa } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOptions } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: "home",
                label: "Página Inicial",
                path: "/pagina-inicial"
            },
            {
                icon: "people",
                label: "Pessoas",
                path: "/pessoas"
            }
        ]);
    }, [setDrawerOptions])
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>}></Route>

            <Route path="/pessoas" element={<ListagemDePessoa/>}></Route>

            {/* <Route path="/pessoas/detalhes/:id" element={<ListagemDePessoa/>}></Route> */}

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}