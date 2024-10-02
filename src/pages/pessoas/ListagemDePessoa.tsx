import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo } from "react";
import { PessoasService } from "../../shared/services/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";

interface IListagemDePessoaProps {
    children?: React.ReactNode;
}

export const ListagemDePessoa: React.FC<IListagemDePessoaProps> = ({children}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    useEffect(() => {
        debounce(() => {
            PessoasService.getAll(1, busca)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                    return
                }

                return console.log(result);
            });
        })
    }, [busca]);

    return (
        <LayoutBaseDePagina
            title="Listagem de Pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    mostrarBotaoNovo
                    textoBotaoNovo="Nova"
                    textoDaBusca={busca}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }>
            {children}
        </LayoutBaseDePagina>
    );
};