
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, DetalheDePessoas, ListagemDePessoas } from '../pages';

export const AppRoutes = () => {
    const { setDrawerOptions } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOptions([
            {
                icon: "home",
                label: "Pagina Inicial",
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

            <Route path="/pessoas" element={<ListagemDePessoas/>}></Route>

            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>}></Route>

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}