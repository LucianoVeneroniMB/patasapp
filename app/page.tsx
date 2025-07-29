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

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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

        // Use token immediately — e.g., send it to backend with formData
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

            {/* Example inputs */}
            <div>
              <label htmlFor="name" className="block font-medium">
                Nombre
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
              <label htmlFor="description" className="block font-medium">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-2 border rounded"
                onChange={handleInputChange}
                required
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
