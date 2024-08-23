"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postLogin } from "../../services/users";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el cargando
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mostrar el cargando

    try {
      const response = await postLogin({ email, password });
      const data = await response.json();
      const { idToken } = data;

      // Guarda el token en el almacenamiento local
      localStorage.setItem("authToken", idToken);

      // Redirige al dashboard
      router.push("/");
    } catch (err) {
      setIsLoading(false); // Ocultar el cargando en caso de error
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <div className="flex flex-row gap-2 justify-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="block w-full p-3 text-center rounded-md bg-blue-500 text-white font-bold"
            >
              Iniciar Sesión
            </button>
          </form>
        )}
        <p className="text-xs text-center sm:px-6">
          ¿No tienes una cuenta?
          <a href="/signup" className="underline text-blue-500">
            {" "}
            Registrarse
          </a>
        </p>
      </div>
    </div>
  );
}
