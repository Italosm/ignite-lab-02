import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LogoIcon } from "../components/Logo";

import {
  useCreateSubscriberMutation,
  useGetEmailSubscriberQuery,
  usePublishSubscriberMutation,
} from "../graphql/generated";
import schema from "../schema";

interface FormValues {
  name: string;
  email: string;
  password: string;
  passwordMatch: string;
}

const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordMatch: "",
};

export function Subscribe() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [createSubscriber, { loading }] = useCreateSubscriberMutation();
  const [publishSubscriber] = usePublishSubscriberMutation();

  async function handleSubscriberLogin({ email, password }: FormValues) {
    return;
  }
  async function handleSubscriber({ name, email, password }: FormValues) {
    await createSubscriber({
      variables: {
        name,
        email,
        password,
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
          <div className="w-full md:w-[360px] text-center p-6 mt-8  md:mt-0 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block">
              Inscreva-se gratuitamente
            </strong>
            <Formik
              validateOnChange={false}
              validationSchema={schema}
              onSubmit={handleSubscriber}
              initialValues={initialValues}
              render={() => (
                <Form className="flex flex-col gap-2 w-full">
                  <Field
                    id="name"
                    name="name"
                    className="bg-gray-900 rounded px-5 h-14"
                    type="text"
                    placeholder="Seu nome completo"
                  />
                  <span className="text-orange-500 text-sm text-center">
                    <ErrorMessage name="name" />
                  </span>

                  <Field
                    id="email"
                    name="email"
                    className="bg-gray-900 rounded px-5 h-14"
                    type="text"
                    placeholder="Digite seu e-mail"
                  />
                  <span className="text-orange-500 text-sm text-center">
                    <ErrorMessage name="email" />
                  </span>
                  <Field
                    id="password"
                    name="password"
                    className="bg-gray-900 rounded px-5 h-14"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                  <span className="text-orange-500 text-sm text-center">
                    <ErrorMessage name="password" />
                  </span>
                  <Field
                    name="passwordMatch"
                    className="bg-gray-900 rounded px-5 h-14"
                    type="password"
                    placeholder="Confirme sua senha"
                  />
                  <span className="text-orange-500 text-sm text-center">
                    <ErrorMessage name="passwordMatch" />
                  </span>

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
                </Form>
              )}
            />
          </div>
        ) : (
          <div className="w-full md:w-[360px] p-6 mt-8  md:mt-0 bg-gray-700 border border-gray-500 rounded">
            <strong className="text-2xl mb-6 block text-center">
              Acessar plataforma
            </strong>
            <Formik
              validateOnChange={false}
              validationSchema={schema}
              onSubmit={handleSubscriberLogin}
              initialValues={initialValues}
              render={() => (
                <Form className="flex flex-col gap-2 w-full">
                  <Field
                    name="email"
                    className="bg-gray-900 rounded px-5 h-14"
                    type="text"
                    placeholder="Digite seu e-mail"
                  />
                  <span className="text-orange-500 text-sm text-center">
                    <ErrorMessage name="email" />
                  </span>
                  <Field
                    name="password"
                    className="bg-gray-900 rounded px-5 h-14"
                    type="password"
                    placeholder="Digite sua senha"
                  />
                  <span className="text-orange-500 text-sm text-center">
                    <ErrorMessage name="password" />
                  </span>

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
                  {/* <a
                href="#"
                className="text-center border border-transparent rounded hover:border-white p-2 hover:bg-green-700"
              >
                Esqueceu a senha?
              </a> */}
                </Form>
              )}
            />
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
