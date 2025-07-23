"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type FormType =
  | "findMyPet"
  | "foundPet"
  | "wantToAdopt"
  | "giveForAdoption"
  | null;

export default function Home() {
  const [formType, setFormType] = useState<FormType>(null);

  // Form state (basic example)
const [formData, setFormData] = useState<Record<string, unknown>>({});

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.files?.[0] || null });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    alert("Formulario enviado (implementa backend para procesar)");
    console.log("Datos del formulario:", formData);
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
            }}
            className="text-gray-500 underline"
          >
            ← Volver al menú
          </button>

          {formType === "findMyPet" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Quiero encontrar a mi mascota</h2>
              <label className="block">
                Foto de la mascota:
                <input
                  type="file"
                  name="petImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Ubicación (geolocalización o dirección):
                <input
                  type="text"
                  name="location"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Detalles de contacto:
                <input
                  type="text"
                  name="contact"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Fecha aproximada:
                <input
                  type="date"
                  name="date"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
            </>
          )}

          {formType === "foundPet" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Encontré una mascota</h2>
              <label className="block">
                Foto de la mascota:
                <input
                  type="file"
                  name="petImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Ubicación (geolocalización o dirección):
                <input
                  type="text"
                  name="location"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Fecha aproximada:
                <input
                  type="date"
                  name="date"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Detalles de contacto:
                <input
                  type="text"
                  name="contact"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Notas adicionales:
                <textarea
                  name="notes"
                  onChange={handleInputChange}
                  className="block mt-1"
                />
              </label>
            </>
          )}

          {formType === "wantToAdopt" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Quiero adoptar</h2>
              <label className="block">
                Ubicación (geolocalización o dirección):
                <input
                  type="text"
                  name="location"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Detalles de contacto:
                <input
                  type="text"
                  name="contact"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Notas adicionales:
                <textarea
                  name="notes"
                  onChange={handleInputChange}
                  className="block mt-1"
                />
              </label>
            </>
          )}

          {formType === "giveForAdoption" && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Quiero dar en adopción</h2>
              <label className="block">
                Fotos de la mascota:
                <input
                  type="file"
                  name="petImages"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Ubicación (geolocalización o dirección):
                <input
                  type="text"
                  name="location"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Detalles de contacto:
                <input
                  type="text"
                  name="contact"
                  onChange={handleInputChange}
                  required
                  className="block mt-1"
                />
              </label>
              <label className="block">
                Notas adicionales:
                <textarea
                  name="notes"
                  onChange={handleInputChange}
                  className="block mt-1"
                />
              </label>
            </>
          )}

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
