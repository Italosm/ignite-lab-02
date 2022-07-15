import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

export function Subscribe() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [createSubscriber, { loading }] = useCreateSubscriberMutation();

  async function handleSubscruiber(event: FormEvent) {
    event.preventDefault();

    await createSubscriber({
      variables: {
        name,
        email,
      },
    });
    navigate("/event");
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <LogoIcon />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa</strong>, do
            zero, com <strong className="text-blue-500">React</strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="p-8 bg-gray-700 border border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">
            Inscreva-se gratuitamente
          </strong>
          <form
            onSubmit={handleSubscruiber}
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
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img
        src="https://res.cloudinary.com/drgpo0mge/image/upload/v1657859075/Group_7735_aeua26.png"
        alt=""
      />
    </div>
  );
}
