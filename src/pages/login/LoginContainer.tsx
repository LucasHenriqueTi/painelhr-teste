import { useState } from "react";
import LoginView from "./LoginView"; // Verifique o caminho
import { authService } from "@/services/signin-service"; // Verifique o caminho
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "@tanstack/react-router";

const LoginContainer = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate({ from: '/login' });
  const { login } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: authService.signin, 
    onSuccess: (data) => {
      // Cria um objeto 'user' com os dados que temos
      const userToStore = { username: data.username };
      // Salva o usuário no store global
      login(userToStore);
      // Redireciona para o dashboard
      navigate({ to: '/dashboard' });
    },
    onError: (error) => {
      console.error("Erro de login:", error.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <LoginView
      username={username}
      password={password}
      error={loginMutation.error ? loginMutation.error.message : null}
      isLoading={loginMutation.isPending} 
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginContainer;