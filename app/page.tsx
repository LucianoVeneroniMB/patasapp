
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Script from "next/script";

interface GrecaptchaEnterprise {
  enterprise: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}

declare const grecaptcha: GrecaptchaEnterprise | undefined;

type FormType =
  | "findMyPet"
  | "foundPet"
  | "wantToAdopt"
  | "giveForAdoption"
  | null;

export default function Home() {
  const [formType, setFormType] = useState<FormType>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.files?.[0] || null });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!grecaptcha) {
      alert("No se pudo cargar reCAPTCHA. Intenta nuevamente.");
      return;
    }

    grecaptcha.enterprise.ready(async () => {
      try {
        const token = await grecaptcha.enterprise.execute(
          "6LfNmpMrAAAAAHJjT35Fh69t4L6EOM5vBiWI3YME",
          { action: "LOGIN" }
        );

        console.log("reCAPTCHA token:", token);
        console.log("Datos del formulario:", formData);

        alert("Formulario enviado (implementa backend para procesar)");
      } catch (error) {
        console.error("Error ejecutando reCAPTCHA:", error);
        alert("Error con reCAPTCHA. Intenta nuevamente.");
      }
    });
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/enterprise.js?render=6LfNmpMrAAAAAHJjT35Fh69t4L6EOM5vBiWI3YME"
        strategy="afterInteractive"
      />

      <main className="min-h-screen p-8 max-w-3xl mx-auto font-sans">
        <h1 className="text-3xl font-bold mb-8 text-center">🐾 Pet Finder</h1>

        {!formType && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={() => setFormType("findMyPet")}
              className="bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700"
            >
              Quiero encontrar a mi mascota
            </button>
            <button
              onClick={() => setFormType("foundPet")}
              className="bg-green-600 text-white p-4 rounded shadow hover:bg-green-700"
            >
              Encontré una mascota
            </button>
            <button
              onClick={() => setFormType("wantToAdopt")}
              className="bg-purple-600 text-white p-4 rounded shadow hover:bg-purple-700"
            >
              Quiero adoptar
            </button>
            <button
              onClick={() => setFormType("giveForAdoption")}
              className="bg-red-600 text-white p-4 rounded shadow hover:bg-red-700"
            >
              Quiero dar en adopción
            </button>
          </div>
        )}

        {formType && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <button
              type="button"
              onClick={() => {
                setFormType(null);
                setFormData({});
              }}
              className="text-gray-500 underline"
            >
              ← Volver al menú
            </button>

            {/* Common fields */}
            <div>
              <label htmlFor="name" className="block font-medium">
                Tu Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full p-2 border rounded"
                onChange={handleInputChange}
                required
              />
            </div>

                <div>
                  <label htmlFor="email" className="block font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block font-medium">
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                  />
                </div>

            <div>
              <label htmlFor="edad" className="block font-medium">
                Edad de la mascota
              </label>
              <input
                id="edad"
                name="edad"
                type="text"
                className="w-full p-2 border rounded"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="photo" className="block font-medium">
                Foto
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {(formType === "findMyPet" ||
              formType === "foundPet" ||
              formType === "giveForAdoption") && (
              <>
                <div>
                  <label htmlFor="nombreMascota" className="block font-medium">
                    Nombre de la mascota
                  </label>
                  <input
                    id="nombreMascota"
                    name="nombreMascota"
                    type="text"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="raza" className="block font-medium">
                    Raza
                  </label>
                  <input
                    id="raza"
                    name="raza"
                    type="text"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="tipoMascota" className="block font-medium">
                    Tipo de Mascota
                  </label>
                  <select
                    id="tipoMascota"
                    name="tipoMascota"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option value="Gato">Gato</option>
                    <option value="Perro">Perro</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="peso" className="block font-medium">
                    Peso Aproximado
                  </label>
                  <input
                    id="peso"
                    name="peso"
                    type="text"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="color" className="block font-medium">
                    Color
                  </label>
                  <input
                    id="color"
                    name="color"
                    type="text"
                    className="w-full p-2 border rounded"
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}

            {(formType === "findMyPet" || formType === "foundPet") && (
              <div>
                <label htmlFor="fecha" className="block font-medium">
                  {formType === "findMyPet"
                    ? "Fecha que se perdió"
                    : "Fecha que se encontró"}
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  type="date"
                  className="w-full p-2 border rounded"
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="description" className="block font-medium">
                Notas
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 border rounded"
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Enviar
            </button>
          </form>
        )}
      </main>
    </>
  );
}
