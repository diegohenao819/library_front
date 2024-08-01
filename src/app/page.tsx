

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center h-screen space-x-4 gap-5 bg-background">
    
      <Image
        src="https://static01.nyt.com/images/2015/10/24/opinion/24manguel/24manguel-superJumbo.jpg"
        alt="PetSoft"
        width={400}
        height={500}
      />

      <div className="w-[30%]">
        <Logo />
        <h1 className="text-4xl font-bold mt-2">
          Manage your <span className="font-extrabold">LibraryApp</span> reserva con nosotros!
        </h1>
        <p className=" mt-2">
        Utiliza LibraryApp para reservar los libros que quieres leer! La lectura es una de las mejores formas de aprender y crecer.
        </p>

        <div className="mt-4 space-x-4">
          <Button asChild>
            <Link href="/signup"> Registrarse </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href="/login"> Iniciar sesión </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
