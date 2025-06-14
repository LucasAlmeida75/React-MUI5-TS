import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"
import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = "", mostrarInputBusca = false, aoMudarTextoDeBusca,
    textoBotaoNovo = "Novo", mostrarBotaoNovo = false, aoClicarEmNovo
}) => {
    const theme = useTheme();
    return (
        <Box height={theme.spacing(5)} marginX={1} padding={1} paddingX={2} display="flex" gap={1} alignItems="center" component={Paper}>
            {mostrarInputBusca && (<TextField size="small" placeholder={Environment.INPUT_DE_BUSCA} value={textoDaBusca} onChange={(e) => {aoMudarTextoDeBusca?.(e.target.value)}}/>)}

            <Box display="flex" flex={1} justifyContent="end">
                {mostrarBotaoNovo && (<Button onClick={aoClicarEmNovo} color="primary" disableElevation variant="contained" startIcon={<Icon>add</Icon>}>{textoBotaoNovo}</Button>)}
            </Box>
        </Box>
    )
}