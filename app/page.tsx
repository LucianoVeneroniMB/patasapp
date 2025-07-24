"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type FormType =
  | "findMyPet"
  | "foundPet"
  | "wantToAdopt"
  | "giveForAdoption"
  | null;

export default function Home() {
  const [formType, setFormType] = useState<FormType>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.files?.[0] || null });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("Por favor, completa el reCAPTCHA.");
      return;
    }

    // Aquí puedes enviar el token al backend para validarlo junto con formData
    console.log("reCAPTCHA token:", recaptchaToken);
    console.log("Datos del formulario:", formData);
    alert("Formulario enviado (implementa backend para procesar)");
  }

  return (
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
              setRecaptchaToken(null);
            }}
            className="text-gray-500 underline"
          >
            ← Volver al menú
          </button>

          {/* All your formType-specific JSX remains unchanged */}
          {/* (omitted here for brevity) */}

          {/* Insert reCAPTCHA here */}
          <div className="my-4">
            <ReCAPTCHA
              sitekey="6LfX540rAAAAACJ6veUJInwmZB53_RbVJ5-y4lOf"
              onChange={(token) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken(null)}
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
  );
}
