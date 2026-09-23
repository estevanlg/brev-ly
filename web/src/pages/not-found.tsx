import notFoundLogo from "../assets/not-found.svg";

export function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-3">
            <div className="w-full max-w-[580px] rounded-lg bg-gray-100 shadow-sm">
                <div className="flex flex-col gap-6 items-center text-center px-12 py-16">
                    <img src={notFoundLogo} alt="Logo Brevly" className="text-blue-base h-22" />

                    <h1 className="text-x-large text-gray-600">
                        Link não encontrado
                    </h1>

                    <p className="text-medium text-gray-500">
                        O link que você está tentando acessar não existe,
                        foi removido ou é uma URL inválida.
                        Saiba mais em{" "}
                        <a
                            href={'/'}
                            className="text-blue-base hover:underline"
                        >
                            brev.ly
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}