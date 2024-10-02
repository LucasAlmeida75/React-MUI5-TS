import { FerramentasDeDetalhe } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"

export const Dashboard = () => {
    return (
        <LayoutBaseDePagina title="Página Inicial" barraDeFerramentas={(<FerramentasDeDetalhe mostrarBotaoSalvarEFechar />)}>
            Teste
        </LayoutBaseDePagina>
    )
}