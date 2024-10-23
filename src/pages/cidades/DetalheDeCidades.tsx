import React, { useEffect, useRef, useState } from "react";
import { Box, Grid2, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { FerramentasDeDetalhe } from "../../shared/components";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IFormProps {
    nome: string;
}

const formValidationSchema: yup.ObjectSchema<IFormProps> = yup.object().shape({
    nome: yup.string().min(3).required()
})

export const DetalheDeCidades: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { id = "nova" } = useParams<"id">();
    const [nome, setNome] = useState("");
    const isSaveAndClose = useRef(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormProps>({resolver: yupResolver(formValidationSchema)});

    const onSubmit = (data: IFormProps) => {
        setIsLoading(true);
                if (id === "nova") {
                    CidadesService.create(data)
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);
                                return
                            }
                            if (isSaveAndClose.current)
                                navigate(`/cidades`);
                            else
                                navigate(`/cidades/detalhes/${result}`);
                        });
                } else {
                    CidadesService.updateById(Number(id), data)
                        .then((result) => {
                            setIsLoading(false);
                            if (result instanceof Error) {
                                alert(result.message);
                                return
                            }

                            if (isSaveAndClose.current)
                                navigate(`/cidades`);
                        });
                }


    };

    const handleSaveAndClose = (data: IFormProps) => {
        isSaveAndClose.current = true;
        onSubmit(data);
    }

    const handleSave = (data: IFormProps) => {
        isSaveAndClose.current = false;
        onSubmit(data);
    }

    useEffect(() => {
        if (id !== "nova") {
            setIsLoading(true);
            CidadesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate("/cidades");
                        return;
                    }
                    setNome(result.nome);

                    reset({
                        nome: result.nome
                    });
                });
        } else {
            reset({
                nome: ""
            });
        }
    }, [id, navigate, reset]);

    const handleDelete = (id: number) => {
        if (window.confirm("Tem certeza que deseja apagar o registro?")) {
            CidadesService.deleteById(id)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    }
                    alert("Registro apagado com sucesso!");
                    navigate("/cidades");
                });
        }
    };

    return (
        <LayoutBaseDePagina
            title={id === "nova" ? "Nova cidade" : nome}
            barraDeFerramentas={
                <FerramentasDeDetalhe
                    mostrarBotaoNovo={id !== "nova"}
                    textoBotaoNovo="Nova"
                    mostrarBotaoSalvarEFechar
                    mostrarBotaoApagar={id !== "nova"}
                    aoClicarEmSalvar={handleSubmit(handleSave)}
                    aoClicarEmSalvarEFechar={handleSubmit(handleSaveAndClose)}
                    aoClicarEmApagar={() => handleDelete(Number(id))}
                    aoClicarEmNovo={() => { navigate("/cidades/detalhe/nova") }}
                    aoClicarEmVoltar={() => { navigate("/cidades") }}
                />
            }>

            <form>
                <Box margin={1} paddingX={2} display="flex" flexDirection="column" gap={1} component={Paper} variant="outlined">
                    <Grid2 container direction="column" padding={2} spacing={2}>
                        {isLoading && (
                            <Grid2>
                                <LinearProgress variant="indeterminate" />
                            </Grid2>
                        )}

                        {!isLoading && (
                            <Grid2>
                                <Typography variant="h6">
                                    Geral
                                </Typography>
                            </Grid2>
                        )}
                        {!isLoading && (
                            <Grid2 container direction="row" spacing={2}>
                                <Grid2 size={{ xs: 12, sm: 8, md: 6, lg: 4, xl: 2 }}>
                                    <TextField
                                        label="Nome"
                                        fullWidth
                                        size="small"
                                        error={!!errors.nome}
                                        helperText={errors.nome ? (
                                            <span style={{ display: 'block', height: '1em', color: 'red' }}>
                                                {errors.nome.message}
                                            </span>
                                        ) : undefined}
                                        {...register("nome")}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </Grid2>
                            </Grid2>
                        )}

                    </Grid2>


                </Box>
            </form>
        </LayoutBaseDePagina>
    )
};