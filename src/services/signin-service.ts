import Cookies from 'js-cookie';

// --- INTERFACES ---

interface SigninCredentials {
  username: string;
  password: string;
}

// Resposta exata que seu backend envia no login
interface AuthApiResponse {
  username: string;
  token: string;
  refresh_token: string;
  expires_in: number;
  message: string;
}

// O que a função checkAuthStatus deve retornar
interface CheckStatusResponse {
  user: {
    username: string;
  };
}


const API_URL = import.meta.env.VITE_API_URL;

// --- FUNÇÃO DE LOGIN ---
const signin = async (credentials: SigninCredentials): Promise<AuthApiResponse> => {
  if (!API_URL) throw new Error("VITE_API_URL não está definida.");

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Credenciais inválidas.");
  }

  const data: AuthApiResponse = await response.json();

  const expiresInDays = data.expires_in / (60 * 60 * 24);
  Cookies.set('authToken', data.token, {
    expires: expiresInDays,
    secure: import.meta.env.PROD,
    sameSite: 'strict',
  });

  return data;
};


// --- FUNÇÃO DE LOGOUT ---
const logout = async (): Promise<void> => {
  Cookies.remove('authToken');
  // Se tiver uma rota de logout no backend, descomente a linha abaixo
  // await fetch(`${API_URL}/logout`, { method: 'POST' });
};


// --- A PEÇA QUE FALTAVA ---
/**
 * Verifica se existe um cookie de autenticação válido e busca os dados do usuário.
 * Esta função é essencial para restaurar a sessão ao recarregar a página.
 */
const checkAuthStatus = async (): Promise<CheckStatusResponse> => {
  const token = Cookies.get('authToken');

  // Se não houver token, rejeita a promessa imediatamente.
  if (!token) {
    throw new Error("Token de autenticação não encontrado.");
  }

  // Esta função assume que você tem uma rota como `/me` ou `/profile` no seu backend
  // que valida o token e retorna os dados do usuário.
  // O token precisa ser enviado no cabeçalho Authorization, como é padrão em APIs REST.
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    // Se a resposta for 401 ou outro erro, o token é inválido ou expirou.
    // Removemos o cookie inválido do navegador.
    Cookies.remove('authToken');
    throw new Error("Sessão inválida ou expirada.");
  }
  
  const userData = await response.json();

  // Adapte este retorno para corresponder à estrutura de dados do usuário
  // que a sua rota /profile retorna.
  return { 
    user: { 
      username: userData.username, 
    } 
  };
};


export const authService = {
  signin,
  logout,
  checkAuthStatus, // Agora exportamos a nova função
};