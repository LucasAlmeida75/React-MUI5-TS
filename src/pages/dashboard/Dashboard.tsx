import { Box, Card, CardContent, debounce, Grid2, LinearProgress, Paper, Typography } from "@mui/material"
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { useEffect, useState } from "react";
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const Dashboard = () => {
    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalCountCidades, setTotalCountCidades] = useState(0);
    const [totalCountPessoas, setTotalCountPessoas] = useState(0);

    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);


        CidadesService.getAll()
        .then((result) => {
            setIsLoadingCidades(false);

            if (result instanceof Error) {
                alert(result.message);
                return
            }

            setTotalCountCidades(result.totalCount);
        });

        PessoasService.getAll()
        .then((result) => {
            setIsLoadingPessoas(false);

            if (result instanceof Error) {
                alert(result.message);
                return
            }

            setTotalCountPessoas(result.totalCount);
        });
    }, []);
    return (
        <LayoutBaseDePagina title="Página Inicial" barraDeFerramentas={(<FerramentasDaListagem mostrarBotaoNovo={false} />)}>
            <Box margin={1} display="flex" flexDirection="column" gap={1}>
                {isLoadingCidades && isLoadingPessoas && (
                    <Grid2>
                        <LinearProgress variant="indeterminate" />
                    </Grid2>
                )}

                <Grid2 container direction="column" spacing={2}>

                    <Grid2 container direction="row">

                    {!isLoadingCidades && (
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Cidades
                                    </Typography>
                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant="h1">
                                            {totalCountCidades}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    )}
                    {!isLoadingPessoas && (
                        <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Pessoas
                                    </Typography>
                                    <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                        <Typography variant="h1">
                                            {totalCountPessoas}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    )}

                    </Grid2>

                </Grid2>


            </Box>
        </LayoutBaseDePagina>
    )
}