import logo from "../assets/logo-icon.svg";

export function RedirectPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-3">
            <div className="w-full max-w-[580px] rounded-lg bg-gray-100 shadow-sm">
                <div className="flex flex-col gap-6 items-center text-center px-12 py-16">
                    <img src={logo} alt="Logo Brevly" className="text-blue-base h-12" />

                    <h1 className="text-x-large text-gray-600">
                        Redirecionando...
                    </h1>

                    <div className="flex flex-col gap-1">
                        <p className="text-medium text-gray-500">
                            O link será aberto automaticamente em alguns instantes.
                        </p>

                            <p className="text-medium text-gray-500">
                            Não foi redirecionado?{" "}
                            <a
                                href={'/'}
                                className="text-blue-base hover:underline"
                            >
                                Acesse aqui
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}