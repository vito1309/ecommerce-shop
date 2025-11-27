import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "../hooks/use-signup";

const formSchema = z.object({
  name: z.string()
    .nonempty("O nome completo é obrigatório"),
  email: z.string()
    .email("E-mail inválido")
    .nonempty("O e-mail é obrigatório"),
  password: z.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginSchema = z.infer<typeof formSchema>;

export function SignUpForm() {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchema) {
    mutate(values, {
      onSuccess: () => navigate("/signin")
    });
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <h1 className="text-center text-2xl font-semibold text-gray-800">
            Crie uma conta
          </h1>
          <p className="text-center text-sm text-gray-500 mt-1">
            Ainda não tem uma conta ClickShop?
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {(error as any)?.response?.data?.message || "Erro ao cadastrar cliente"}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input type="name" placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="........" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isPending}
              >
                {isPending ? "Cadastrando..." : "Cadastre-se"}
              </Button>

            </form>
          </Form>

          <Separator className="my-6" />

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Faça Login
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Já é cliente ClickShop?
            </p>

            <Button
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              onClick={() => navigate("/signin")}
            >
              Entrar
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
