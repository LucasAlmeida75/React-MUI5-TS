import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";
import { PessoasService } from "../../shared/services/pessoas/PessoasService";
import { LinearProgress } from "@mui/material";

export const DetalheDePessoas: React.FC = () => {
    const { id = "nova" } = useParams<"id">();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState("");

    useEffect(() => {
        if (id !== "nova") {
            setIsLoading(true);
            PessoasService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate("/pessoas");
                        return
                    }

                    setNome(result.nome);
                    console.log(result);
                });
        }
    }, [id])

    const handleSave = () => {

    };

    const handleDelete = (id: number) => {
        if (window.confirm("Tem certeza que deseja apagar o registro?")) {
            PessoasService.deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return
                    }
                    alert("Registro apagado com sucesso!");
                    navigate("/pessoas");
                });
        }
    };

    return (
        <LayoutBaseDePagina
            title={id === "nova" ? "Nova pessoa" : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    mostrarBotaoNovo={id !== "nova"}
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== "nova"}

                    aoClicarEmSalvar={handleSave}
                    aoClicarEmSalvarEFechar={handleSave}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => { navigate("/pessoas/detalhe/nova") }}
                    aoClicarEmVoltar={() => { navigate("/pessoas") }}
                />
            }>
            {isLoading && (
                <LinearProgress variant="indeterminate"/>
            )}
        </LayoutBaseDePagina>
    )
}