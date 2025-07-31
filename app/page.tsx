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
  | "quieroAdoptar"
  | "quieroDarEnAdopcion";

const dogBreeds = [
  "Affenpinscher",
  "Akita Inu",
  "Alaskan Malamute",
  "Airedale Terrier",
  "Australian Shepherd",
  "Basenji",
  "Basset Hound",
  "Beagle",
  "Beauceron",
  "Bichón Frisé",
  "Bloodhound",
  "Border Collie",
  "Boston Terrier",
  "Boxer",
  "Boyero de Berna",
  "Braco Alemán",
  "Braco de Weimar",
  "Bretón",
  "Bulldog Francés",
  "Bulldog Inglés",
  "Bull Terrier",
  "Cane Corso",
  "Cavalier King Charles Spaniel",
  "Chesapeake Bay Retriever",
  "Chihuahua",
  "Chow Chow",
  "Cocker Spaniel",
  "Collie",
  "Dálmata",
  "Dachshund (Perro Salchicha)",
  "Doberman Pinscher",
  "Dogo Argentino",
  "Fox Terrier",
  "Golden Retriever",
  "Gran Danés",
  "Gran Pirineo",
  "Husky Siberiano",
  "Irish Terrier",
  "Jack Russell Terrier",
  "Kelpie Australiano",
  "Kuvasz",
  "Labrador Retriever",
  "Leonberger",
  "Lhasa Apso",
  "Maltés",
  "Mastín Inglés",
  "Mastín Napolitano",
  "Papillón",
  "Pequinés",
  "Perdiguero de Burgos",
  "Perro de Agua Español",
  "Perro de Montaña de los Pirineos",
  "Pinscher Miniatura",
  "Pointer",
  "Pomerania (Spitz Enano)",
  "Pug",
  "Pastor Alemán",
  "Pastor Australiano",
  "Pastor Belga",
  "Pastor del Cáucaso",
  "Rhodesian Ridgeback",
  "Rottweiler",
  "Saluki",
  "Samoyedo",
  "San Bernardo",
  "Schnauzer Miniatura",
  "Schnauzer Estándar",
  "Schnauzer Gigante",
  "Scottish Terrier",
  "Setter Irlandés",
  "Shar Pei",
  "Shetland Sheepdog (Sheltie)",
  "Shih Tzu",
  "Staffordshire Bull Terrier",
  "Terranova",
  "Vizsla",
  "Weimaraner",
  "West Highland White Terrier",
  "Wolfhound Irlandés",
  "Xoloitzcuintle (Perro Sin Pelo Mexicano)"
];

const catBreeds = [
  "Mestizo",
  "Abisinio",
  "American Curl",
  "American Shorthair",
  "Angora",
  "Azul Ruso",
  "Bengala",
  "Bombay",
  "Bosque de Noruega",
  "British Shorthair",
  "Devon Rex",
  "Egipcio",
  "Exótico",
  "Himalayo",
  "Korat",
  "Maine Coon",
  "Manx",
  "Mau Egipcio",
  "Persa",
  "Ragdoll",
  "Scottish Fold",
  "Siamés",
  "Siberiano",
  "Snowshoe",
  "Somalí",
  "Sphynx",
  "Tonkinés",
  "Van Turco"
];

const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  // Tu lógica aquí
};
