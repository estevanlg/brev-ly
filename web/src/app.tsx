import { LinkForm } from "./components/link-form";
import { ListLinks } from "./components/list-links";

export function App() {
  return (
    <main className="flex flex-row gap-6 justify-center items-center h-dvh">
      <LinkForm />
      <ListLinks />
    </main>
  )
}
