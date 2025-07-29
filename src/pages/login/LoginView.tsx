import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

// Tipagem para as props que a View espera receber do Container
interface LoginViewProps {
  // Estado
  username: string;
  password: string;
  error: string | null;
  isLoading: boolean;
  
  // Funções para atualizar o estado
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;

  // Função para lidar com o envio do formulário
  onSubmit: (e: React.FormEvent) => void;
}

const LoginView = ({
  username,
  password,
  error,
  isLoading,
  onUsernameChange,
  onPasswordChange,
  onSubmit
}: LoginViewProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Digite seu usuário e senha para acessar a plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {/* Campo de Erro */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro de Autenticação</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Campo de Usuário */}
            <div className="grid gap-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="seu.usuario"
                required
                value={username}
                onChange={(e) => onUsernameChange(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Campo de Senha */}
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" variant="destructive" className="w-full bg-black" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginView;