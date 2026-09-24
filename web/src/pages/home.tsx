import { LinkForm } from "../components/link-form";
import { ListLinks } from "../components/list-links";
import brevlyLogo from "../assets/Logo.svg";
import { Toaster } from "react-hot-toast";

export function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center lg:items-start w-full max-w-5xl p-3">
        <img src={brevlyLogo} alt="Logo Brevly" className="text-blue-base h-6 mb-2" />
        
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="flex-none">
            <LinkForm />
          </div>
          
          <div className="flex-1">
            <ListLinks />
          </div>
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
      />
    </main>
  )
}
