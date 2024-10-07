import { Environment } from "../../environment";
import { Api } from "../api/axios-config";

export interface IListagemPessoaProps {
    id: number;
    nome: string;
    email: string;
    cidadeId: number;
}

export interface IDetalhePessoaProps {
    id: number;
    nome: string;
    email: string;
    cidadeId: number;
}

type TPessoasComTotalCount = {
    data: IListagemPessoaProps[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ""): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
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

const getById = async (id: number): Promise<IDetalhePessoaProps | Error> => {
    try {
        const { data } = await Api.get(`/pessoas/${id}`);

        if (data)
            return data;

        return new Error('Erro ao buscar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao buscar o registro.');
    }
};

const create = async (dados: Omit<IDetalhePessoaProps, "id">): Promise<Number | Error> => {
    try {
        const { data } = await Api.post<IDetalhePessoaProps>(`/pessoas`, dados);

        if (data)
            return data.id;

        return new Error('Erro ao criar o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao criar o registro.');
    }
};

const updateById = async (id: number, dados: Omit<IDetalhePessoaProps, "id">): Promise<void | Error> => {
    try {
        const { data } = await Api.put(`/pessoas/${id}`, dados);

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
        const { data } = await Api.delete(`/pessoas/${id}`);

        if (data)
            return;

        return new Error('Erro ao remover o registro.');
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string}).message || 'Erro ao remover o registro.');
    }
};

export const PessoasService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};