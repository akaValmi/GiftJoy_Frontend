"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Register } from "../../services/users";

export default function Signup() {
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar el cargando
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mostrar el cargando
    try {
      await Register({
        primer_nombre: primerNombre,
        segundo_nombre: segundoNombre,
        primer_apellido: primerApellido,
        segundo_apellido: segundoApellido,
        correo: correo,
        password: password,
      });
      router.push("/login");
    } catch (err) {
      setIsLoading(false); // Ocultar el cargando en caso de error
      if (err.response.status === 400) {
        setError(`Error de validación: ${err.errorData.message}`);
      } else if (err.response.status === 500) {
        setError("El correo electrónico ya está registrado.");
      } else if (err.response.status === 422) {
        setError("Datos invalidos.");
      } else {
        setError(`Error del servidor: ${err.response.statusText}`);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100 shadow-lg">
        <h1 className="text-2xl font-bold text-center">Registrarse</h1>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <div className="flex flex-row gap-2 justify-center">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="primerNombre" className="block text-gray-700">
                Primer Nombre
              </label>
              <input
                type="text"
                id="primerNombre"
                value={primerNombre}
                onChange={(e) => setPrimerNombre(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="segundoNombre" className="block text-gray-700">
                Segundo Nombre
              </label>
              <input
                type="text"
                id="segundoNombre"
                value={segundoNombre}
                onChange={(e) => setSegundoNombre(e.target.value)}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="primerApellido" className="block text-gray-700">
                Primer Apellido
              </label>
              <input
                type="text"
                id="primerApellido"
                value={primerApellido}
                onChange={(e) => setPrimerApellido(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="segundoApellido" className="block text-gray-700">
                Segundo Apellido
              </label>
              <input
                type="text"
                id="segundoApellido"
                value={segundoApellido}
                onChange={(e) => setSegundoApellido(e.target.value)}
                className="w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="correo" className="block text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
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
            <button className="block w-full p-3 text-center rounded-md bg-blue-500 text-white font-bold">
              Registrarse
            </button>
          </form>
        )}
        <p className="text-xs text-center sm:px-6">
          ¿Ya tienes una cuenta?
          <a href="/login" className="underline text-blue-500">
            {" "}
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
