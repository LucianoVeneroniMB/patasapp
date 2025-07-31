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

const perroRazas = [
  "Affenpinscher", "Akita Inu", "Alaskan Malamute", "Airedale Terrier",
  "Australian Shepherd", "Basenji", "Basset Hound", "Beagle", "Beauceron",
  "Bichón Frisé", "Bloodhound", "Border Collie", "Boston Terrier", "Boxer",
  "Boyero de Berna", "Braco Alemán", "Braco de Weimar", "Bretón", "Bulldog Francés",
  "Bulldog Inglés", "Bull Terrier", "Cane Corso", "Cavalier King Charles Spaniel",
  "Chesapeake Bay Retriever", "Chihuahua", "Chow Chow", "Cocker Spaniel", "Collie",
  "Dálmata", "Dachshund (Perro Salchicha)", "Doberman Pinscher", "Dogo Argentino",
  "Fox Terrier", "Golden Retriever", "Gran Danés", "Gran Pirineo", "Husky Siberiano",
  "Irish Terrier", "Jack Russell Terrier", "Kelpie Australiano", "Kuvasz",
  "Labrador Retriever", "Leonberger", "Lhasa Apso", "Maltés", "Mastín Inglés",
  "Mastín Napolitano", "Papillón", "Pequinés", "Perdiguero de Burgos",
  "Perro de Agua Español", "Perro de Montaña de los Pirineos", "Pinscher Miniatura",
  "Pointer", "Pomerania (Spitz Enano)", "Pug", "Pastor Alemán", "Pastor Australiano",
  "Pastor Belga", "Pastor del Cáucaso", "Rhodesian Ridgeback", "Rottweiler", "Saluki",
  "Samoyedo", "San Bernardo", "Schnauzer Miniatura", "Schnauzer Estándar",
  "Schnauzer Gigante", "Scottish Terrier", "Setter Irlandés", "Shar Pei",
  "Shetland Sheepdog (Sheltie)", "Shih Tzu", "Staffordshire Bull Terrier",
  "Terranova", "Vizsla", "Weimaraner", "West Highland White Terrier",
  "Wolfhound Irlandés", "Xoloitzcuintle (Perro Sin Pelo Mexicano)", "Cruza"
];

const gatoRazas = [
  "Siamés", "Persa", "Maine Coon", "British Shorthair", "Sphynx", "Bengala",
  "Azul Ruso", "Europeo Común", "Cruza"
];

export default function Home() {
  const [formType, setFormType] = useState<FormType>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

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
      <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LfNmpMrAAAAAHJjT35Fh69t4L6EOM5vBiWI3YME" strategy="afterInteractive" />
      {/* Main form UI is included separately in another response or can be pasted from prior answer */}
    </>
  );
}
