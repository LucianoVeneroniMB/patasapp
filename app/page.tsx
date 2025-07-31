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

type FormType = "findMyPet" | "foundPet" | "wantToAdopt" | "giveForAdoption" | null;

const perroRazas = [
  "Affenpinscher", "Akita Inu", "Alaskan Malamute", "Airedale Terrier", "Australian Shepherd",
  "Basenji", "Basset Hound", "Beagle", "Beauceron", "Bichón Frisé", "Bloodhound", "Border Collie",
  "Boston Terrier", "Boxer", "Boyero de Berna", "Braco Alemán", "Braco de Weimar", "Bretón",
  "Bulldog Francés", "Bulldog Inglés", "Bull Terrier", "Cane Corso",
  "Cavalier King Charles Spaniel", "Chesapeake Bay Retriever", "Chihuahua", "Chow Chow",
  "Cocker Spaniel", "Collie", "Dálmata", "Dachshund (Perro Salchicha)", "Doberman Pinscher",
  "Dogo Argentino", "Fox Terrier", "Golden Retriever", "Gran Danés", "Gran Pirineo",
  "Husky Siberiano", "Irish Terrier", "Jack Russell Terrier", "Kelpie Australiano", "Kuvasz",
  "Labrador Retriever", "Leonberger", "Lhasa Apso", "Maltés", "Mastín Inglés",
  "Mastín Napolitano", "Papillón", "Pequinés", "Perdiguero de Burgos",
  "Perro de Agua Español", "Perro de Montaña de los Pirineos", "Pinscher Miniatura", "Pointer",
  "Pomerania (Spitz Enano)", "Pug", "Pastor Alemán", "Pastor Australiano", "Pastor Belga",
  "Pastor del Cáucaso", "Rhodesian Ridgeback", "Rottweiler", "Saluki", "Samoyedo",
  "San Bernardo", "Schnauzer Miniatura", "Schnauzer Estándar", "Schnauzer Gigante",
  "Scottish Terrier", "Setter Irlandés", "Shar Pei", "Shetland Sheepdog (Sheltie)",
  "Shih Tzu", "Staffordshire Bull Terrier", "Terranova", "Vizsla", "Weimaraner",
  "West Highland White Terrier", "Wolfhound Irlandés", "Xoloitzcuintle (Perro Sin Pelo Mexicano)",
  "Cruza"
];

const gatoRazas = [
  "Siamés", "Persa", "Maine Coon", "British Shorthair", "Sphynx", "Bengala",
  "Azul Ruso", "Europeo Común", "Cruza"
];

export default function Home() {
  const [formType, setFormType] = useState<FormType>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.files?.[0] || null });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (formData.email !== formData.emailConfirm) {
      alert("Los emails no coinciden.");
      return;
    }

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
            <button onClick={() => setFormType("findMyPet")} className="bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700">Quiero encontrar a mi mascota</button>
            <button onClick={() => setFormType("foundPet")} className="bg-green-600 text-white p-4 rounded shadow hover:bg-green-700">Encontré una mascota</button>
            <button onClick={() => setFormType("wantToAdopt")} className="bg-purple-600 text-white p-4 rounded shadow hover:bg-purple-700">Quiero adoptar</button>
            <button onClick={() => setFormType("giveForAdoption")} className="bg-red-600 text-white p-4 rounded shadow hover:bg-red-700">Quiero dar en adopción</button>
          </div>
        )}

        {formType && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <button type="button" onClick={() => { setFormType(null); setFormData({}); }} className="text-gray-500 underline">← Volver al menú</button>

            <input id="name" name="name" type="text" placeholder="Tu Nombre" className="w-full p-2 border rounded" onChange={handleInputChange} required />
            <input id="email" name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleInputChange} required />
            <input id="emailConfirm" name="emailConfirm" type="email" placeholder="Confirma tu Email" className="w-full p-2 border rounded" onChange={handleInputChange} required autoComplete="off" />
            <input id="telefono" name="telefono" type="tel" placeholder="Teléfono" className="w-full p-2 border rounded" onChange={handleInputChange} />
            <input id="edad" name="edad" type="text" placeholder="Edad de la mascota" className="w-full p-2 border rounded" onChange={handleInputChange} />
            <input id="photo" name="photo" type="file" accept="image/*" onChange={handleFileChange} />

            {(formType === "findMyPet" || formType === "foundPet" || formType === "giveForAdoption") && (
              <>
                <input id="nombreMascota" name="nombreMascota" type="text" placeholder="Nombre de la mascota" className="w-full p-2 border rounded" onChange={handleInputChange} />

                <select id="tipoMascota" name="tipoMascota" className="w-full p-2 border rounded" onChange={handleInputChange} defaultValue="">
                  <option value="" disabled>Tipo de Mascota</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Otro">Otro</option>
                </select>

                {formData.tipoMascota && formData.tipoMascota !== "Otro" && (
                  <select id="raza" name="raza" className="w-full p-2 border rounded" onChange={handleInputChange} defaultValue="Cruza">
                    <option value="Cruza">Cruza</option>
                    {(formData.tipoMascota === "Perro" ? perroRazas : gatoRazas).map((raza: string) => (
                      <option key={raza} value={raza}>{raza}</option>
                    ))}
                  </select>
                )}

                <select id="sexo" name="sexo" className="w-full p-2 border rounded" onChange={handleInputChange}>
                  <option value="">Sexo</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>

                <select id="pelaje" name="pelaje" className="w-full p-2 border rounded" onChange={handleInputChange}>
                  <option value="">Pelaje</option>
                  <option value="Corto">Corto</option>
                  <option value="Medio">Medio</option>
                  <option value="Largo">Largo</option>
                </select>

                <input id="colorOjos" name="colorOjos" type="text" placeholder="Color de ojos" className="w-full p-2 border rounded" onChange={handleInputChange} />
                <select id="castrado" name="castrado" className="w-full p-2 border rounded" onChange={handleInputChange}>
                  <option value="">¿Castrado/a?</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
                <input id="colorCollar" name="colorCollar" type="text" placeholder="Color de Collar" className="w-full p-2 border rounded" onChange={handleInputChange} />
                <select id="chapita" name="chapita" className="w-full p-2 border rounded" onChange={handleInputChange}>
                  <option value="">¿Tiene chapita?</option>
                  <option value="Tiene">Tiene</option>
                  <option value="No Tiene">No Tiene</option>
                </select>
                {formData.chapita === "Tiene" && (
                  <input id="textoChapita" name="textoChapita" type="text" placeholder="¿Qué dice en la chapita?" className="w-full p-2 border rounded" onChange={handleInputChange} />
                )}
              </>
            )}

            {(formType === "findMyPet" || formType === "foundPet") && (
              <input id="fecha" name="fecha" type="date" className="w-full p-2 border rounded" onChange={handleInputChange} />
            )}

            <textarea id="description" name="description" placeholder="Notas" className="w-full p-2 border rounded" onChange={handleInputChange} required />
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Enviar</button>
          </form>
        )}
      </main>
    </>
  );
}
