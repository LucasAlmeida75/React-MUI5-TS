
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, DetalheDePessoas, ListagemDePessoas, DetalheDeCidades, ListagemDeCidades } from '../pages';

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
            },
            {
                icon: "location_city",
                label: "Cidades",
                path: "/cidades"
            }
        ]);
    }, [setDrawerOptions])
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard/>}></Route>

            <Route path="/pessoas" element={<ListagemDePessoas/>}></Route>
            <Route path="/pessoas/detalhe/:id" element={<DetalheDePessoas/>}></Route>

            <Route path="/cidades" element={<ListagemDeCidades/>}></Route>
            <Route path="/cidades/detalhe/:id" element={<DetalheDeCidades/>}></Route>

            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
}