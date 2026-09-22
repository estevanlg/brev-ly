import { LinkForm } from "./components/link-form";
import { ListLinks } from "./components/list-links";
import logoIgnite from "./assets/Logo.svg";

export function App() {
  return (
    <main className="flex flex-col lg:flex-row gap-6 justify-center items-start h-auto lg:h-dvh px-4">
      <div className="flex flex-col items-center lg:items-start gap-6">
        <img src={logoIgnite} alt="Logo Ignite" className="h-8 text-blue-base mx-auto lg:mx-0" />
        <LinkForm />
      </div>
      <ListLinks />
    </main>
  )
}
