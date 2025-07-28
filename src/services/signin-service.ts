import { isAxiosError } from "axios";
import api from "./api-service";

interface SigninCredentials {
    username: string;
    password: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
    };
}


async function signin(credentials: SigninCredentials): Promise<AuthResponse> {
    try {
        const response = await api.apiLdap.post<AuthResponse>('/login', credentials);
        return response.data;

    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response) {
                if (error.response.status === 401) {
                    throw new Error("Credenciais inválidas. Verifique seu usuário e senha.");
                }
                throw new Error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
            }
            else if (error.request) {
                throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão.");
            }
        }

        throw new Error("Ocorreu um erro inesperado durante a autenticação.");
    }
}

export const authService = {
    signin,
};