import { useState } from "react";
import  LoginView  from "./LoginView";
import { authService } from "@/services/signin-service";
import { useMutation } from "@tanstack/react-query";

export function LoginContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 2. Configure o useMutation
  const loginMutation = useMutation({
    mutationFn: authService.signin, 
    onSuccess: (data) => {
      alert(`Login bem-sucedido com React Query! Token: ${data.token}`);
      console.log("SUCESSO:", data);
    },

    onError: (error) => {
        console.error("DEBUG: Erro capturado pelo React Query:", error.message);
    }
  });

  // 3. Simplifique a função handleSubmit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  };

  // 4. Use os estados gerenciados pelo React Query
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
}