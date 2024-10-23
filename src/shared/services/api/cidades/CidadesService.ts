import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IListagemCidadeProps {
    id: number;
    nome: string;
}

export interface IDetalheCidadeProps {
    id: number;
    nome: string;
}

type TCidadesComTotalCount = {
    data: IListagemCidadeProps[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ""): Promise<TCidadesComTotalCount | Error> => {
    try {
        const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS)
            };
        }

        return new Error('Erro ao listar os registros.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao listar os registros.');
    }
};

const getById = async (id: number): Promise<IDetalheCidadeProps | Error> => {
    try {
        const { data } = await Api.get(`/cidades/${id}`);

        if (data)
            return data;

        return new Error('Erro ao buscar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao buscar o registro.');
    }
};

const create = async (dados: Omit<IDetalheCidadeProps, "id">): Promise<Number | Error> => {
    try {
        const { data } = await Api.post<IDetalheCidadeProps>(`/cidades`, dados);

        if (data)
            return data.id;

        return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: Omit<IDetalheCidadeProps, "id">): Promise<void | Error> => {
    try {
        const { data } = await Api.put(`/cidades/${id}`, dados);

        if (data)
            return;

        return new Error('Erro ao atualizar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao atualizar o registro.');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const { data } = await Api.delete(`/cidades/${id}`);

        if (data)
            return;

        return new Error('Erro ao remover o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao remover o registro.');
    }
};

export const CidadesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};