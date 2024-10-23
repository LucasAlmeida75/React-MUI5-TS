import { useEffect, useMemo, useState } from "react";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";
import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useDebounce } from "../../../shared/hooks";
import { Control, Controller } from "react-hook-form";
import { IFormProps } from "../DetalheDePessoas";

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCidadeProps {
    control: Control<IFormProps>;
    isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({control, isExternalLoading = false}) => {
    const { debounce } = useDebounce();
    const [busca, setBusca] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            CidadesService.getAll(1, busca)
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    /* alert(result.message); */
                    return
                }

                setOpcoes(result.data.map((cidade) => ({id: cidade.id, label: cidade.nome})));
            });
        })
    }, [busca, debounce]);

    return (
        <Controller
            name="cidadeId"
            control={control}
            render={({ field: {onChange, value} }) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const selectedOption = useMemo(() => {
                    return opcoes.find(option => Number(option.id) === Number(value)) || null;
                }, [value, opcoes]);
                return (
                    <Autocomplete
                        openText="Abrir"
                        closeText="Fechar"
                        loadingText="Carregando..."
                        noOptionsText="Nenhuma opção encontrada"

                        disablePortal

                        options={opcoes}
                        loading={isLoading}
                        disabled={isExternalLoading}
                        value={selectedOption}
                        onInputChange={(_, value) => {setBusca(value)}}
                        onChange={(_, value) => { onChange(value?.id || null); setBusca(""); }}
                        popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                label="Cidade"
                            />
                        )}
                    />
                );
            }}
        />
    )
}