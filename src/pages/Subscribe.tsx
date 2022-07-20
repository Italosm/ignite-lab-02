import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../components/Logo";
import {
  useCreateSubscriberMutation,
  usePublishSubscriberMutation,
} from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();
  const [publishSubscriber] = usePublishSubscriberMutation();

  async function handleSubscriber(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });

    await publishSubscriber({
      variables: {
        email,
      },
    });

    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px]  md:px-8 md:flex items-center justify-between mt-8 mx-auto">
        <div className="max-w-[640px]">
          <div className="flex mb-4 justify-center">
            <LogoIcon />
          </div>
          <h1 className="p-4 mt-2 md:p-0 text-3xl md:text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>.
          </h1>
          <p className="px-4 md:p-0 md:mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        {isLogin ? (
          <div className="w-[340px] text-center p-6 mt-8  md:mt-0 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block">
              Inscreva-se gratuitamente
            </strong>
            <form
              onSubmit={handleSubscriber}
              className="flex flex-col gap-2 w-full"
            >
              <input
                onChange={(event) => setName(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="text"
                placeholder="Seu nome completo"
              />
              <input
                onChange={(event) => setEmail(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="text"
                placeholder="Digite seu e-mail"
              />
              <input
                onChange={(event) => setPassword(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="password"
                placeholder="Digite sua senha"
              />
              <input
                onChange={(event) => setPasswordMatch(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="password"
                placeholder="Confirme sua senha"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 mb-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Garantir minha vaga
              </button>
              <button
                className=" border rounded border-transparent hover:border hover:border-white hover:bg-green-700 p-2"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                Faça já seu login
              </button>
            </form>
          </div>
        ) : (
          <div className="w-[340px] p-6 mt-8  md:mt-0 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block text-center">
              Acessar plataforma
            </strong>
            <form
              onSubmit={handleSubscriber}
              className="flex flex-col gap-2 w-full"
            >
              <input
                onChange={(event) => setEmail(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="text"
                placeholder="Digite seu e-mail"
              />
              <input
                onChange={(event) => setPassword(event.target.value)}
                className="bg-gray-900 rounded px-5 h-14"
                type="password"
                placeholder="Digite sua senha"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 mb-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Acessar Plataforma
              </button>
              <button
                className=" border border-transparent rounded hover:border-white hover:bg-green-700 p-2"
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                Inscreva-se já
              </button>
              <a
                href="#"
                className="text-center border border-transparent rounded hover:border-white p-2 hover:bg-green-700"
              >
                Esqueceu a senha?
              </a>
            </form>
          </div>
        )}
      </div>
      <img
        src="https://res.cloudinary.com/drgpo0mge/image/upload/v1657859075/Group_7735_aeua26.png"
        alt=""
      />
    </div>
  );
}
