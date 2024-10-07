import { useEffect, useMemo, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useNavigate, useSearchParams } from "react-router-dom";

import { PessoasService, IListagemPessoaProps } from "../../shared/services/pessoas/PessoasService";
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useDebounce } from "../../shared/hooks";
import { Environment } from "../../shared/environment";


interface IListagemDePessoasProps {
    children?: React.ReactNode;
}

export const ListagemDePessoas: React.FC<IListagemDePessoasProps> = ({children}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();
    const navigate = useNavigate();

    const [rows, setRows] = useState<IListagemPessoaProps[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get("pagina") || "1");
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, busca)
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return
                }

                setTotalCount(result.totalCount);
                setRows(result.data);
            });
        })
    }, [busca, pagina]);

    const handleDelete = (id: number) => {
        if (window.confirm("Tem certeza que deseja apagar o registro?")) {
            PessoasService.deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return
                    }
                    setRows(oldRows => [
                            ...oldRows.filter(oldRow => oldRow.id !== id)
                        ]);
                    alert("Registro apagado com sucesso!");
                });
        }
    }

    return (
        <LayoutBaseDePagina
            title="Listagem de Pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    mostrarBotaoNovo
                    textoDaBusca={busca}
                    textoBotaoNovo="Nova"
                    aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
                    aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
                />
            }>
                <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: "auto" }}>
                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell>Ações</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell size="small">
                                        <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                            <Icon>delete</Icon>
                                        </IconButton>
                                        <IconButton size="small" onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}>
                                            <Icon>edit</Icon>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{row.nome}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>

                        {rows.length === 0 && !isLoading && (
                            <caption>{Environment.LISTAGEM_VAZIA}</caption>
                        )}

                        <TableFooter>
                            {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <LinearProgress variant="indeterminate"/>
                                    </TableCell>
                                </TableRow>
                            )}

                            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && !isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Pagination
                                            page={pagina}
                                            count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                            onChange={(_, page) => {setSearchParams({ busca, pagina: String(page) }, { replace: true })}}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableFooter>

                    </Table>
                </TableContainer>
            {children}
        </LayoutBaseDePagina>
    );
};