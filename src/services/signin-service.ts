// Interface para as credenciais que a função de login recebe
interface SigninCredentials {
  username: string;
  password: string;
}

// Interface para a resposta esperada da API em caso de sucesso
interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL;


const signin = async (credentials: SigninCredentials): Promise<AuthResponse> => {
  if (!API_URL) {
    throw new Error("A variável de ambiente VITE_API_URL não está definida.");
  }
  
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Credenciais inválidas. Verifique seu usuário e senha.");
      }
      throw new Error("Ocorreu um erro na resposta do servidor.");
    }

    // 4. Precisamos converter manualmente a resposta de string JSON para um objeto
    return response.json();

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Erro de conexão. Verifique sua internet e tente novamente.");
  }
}

export const authService = {
  signin,
};