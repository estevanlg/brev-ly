import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLink } from "../services/links";
import { WarningIcon, XCircleIcon } from "@phosphor-icons/react";
import toast from "react-hot-toast";

const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "Informe uma URL válida")
    .url("Informe uma url válida"),

  shortenedUrl: z
    .string()
    .min(1, "Informe uma url minúscula e sem espaço/caracter especial.")
    .regex(
      /^[a-z0-9_-]+$/,
      "Informe uma url minúscula e sem espaço/caracter especial."
    ),
});

type CreateLinkFormData =
  z.infer<typeof createLinkSchema>;

export function LinkForm() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateLinkFormData>({
        resolver: zodResolver(createLinkSchema),
    });

    const createLinkMutation = useMutation({
        mutationFn: createLink,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["links"],
            });

            reset();
        },
        onError: (error: any) => {
            if (error?.response?.status === 409) {
                toast.custom((t) => (
                    <div
                        className={`flex items-center gap-3 rounded-md bg-red-100 p-4 shadow-md border border-red-300 ${
                        t.visible ? "animate-enter" : "animate-leave"
                        }`}
                    >
                        <XCircleIcon size={24} className="text-red-600 flex-shrink-0" />

                        <div className="flex flex-col">
                            <span className="font-semibold text-small text-red-700">
                                Erro no cadastro
                            </span>
                            <span className="text-small text-red-600">
                                Essa URL encurtada já existe.
                            </span>
                        </div>
                    </div>
                ));
            } else {
                console.error(error);
                toast.custom((t) => (
                    <div
                        className={`flex items-center gap-3 rounded-md bg-red-100 p-4 shadow-md border border-red-300 ${
                        t.visible ? "animate-enter" : "animate-leave"
                        }`}
                    >
                        <XCircleIcon size={24} className="text-red-600 flex-shrink-0" />

                        <div className="flex flex-col">
                            <span className="font-semibold text-small text-red-700">
                                Erro no cadastro
                            </span>
                            <span className="text-small text-red-600">
                                Erro inesperado ao cadastrar link.
                            </span>
                        </div>
                    </div>
                ));
            }
        },
    });

    async function onSubmit(
        data: CreateLinkFormData
    ) {
        await createLinkMutation.mutateAsync(data);
    }

    return (
        <div className="bg-gray-100 rounded-lg p-6 sm:p-8 w-full sm:w-[380px] flex flex-col gap-6">
            <h2 className="text-large text-gray-600 text-center sm:text-left">
                Novo link
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="originalUrl"
                            className={`
                                text-x-small uppercase
                                ${errors.originalUrl ? "text-danger" : "text-gray-500"
                            }`}
                        >
                            Link original
                        </label>

                        <input
                            id="originalUrl"
                            placeholder="https://www.exemplo.com.br"
                            {...register("originalUrl")}
                            className={`
                                w-full h-12 rounded-lg border px-4
                                text-base text-gray-600
                                placeholder:text-gray-400
                                focus:outline-none
                                focus:ring-1 focus:ring-blue-base
                                focus:border-blue-base
                                ${errors.originalUrl ? "border-danger" : "border-gray-300"}
                            `}
                        />

                        {errors.originalUrl && (
                            <div className="flex flex-row gap-2">
                                <WarningIcon size={16} className="text-danger" />

                                <span className="text-small text-gray-500">
                                    {errors.originalUrl.message}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="shortenedUrl"
                            className={`
                                text-x-small uppercase
                                ${errors.shortenedUrl ? "text-danger" : "text-gray-500"
                            }`}
                        >
                            Link encurtado
                        </label>

                        <div
                            className={`
                                flex items-center h-12 rounded-lg px-4
                                ${
                                errors.shortenedUrl
                                    ? "border border-danger"
                                    : "border border-gray-300"
                                }
                                focus-within:border-blue-base
                                focus-within:ring-1
                                focus-within:ring-blue-base
                            `}
                        >
                            <span className="text-medium text-gray-400 pr-0.5 font-medium">
                                brev.ly/
                            </span>

                            <input
                                id="shortenedUrl"
                                {...register("shortenedUrl")}
                                className="
                                w-full h-full bg-transparent
                                text-base text-gray-600
                                focus:outline-none
                                "
                            />
                        </div>

                        {errors.shortenedUrl && (
                            <div className="flex flex-row gap-2">
                                <WarningIcon size={16} className="text-danger" />

                                <span className="text-small text-gray-500">
                                    {errors.shortenedUrl.message}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={createLinkMutation.isPending}
                    className="
                        bg-blue-base text-white rounded-lg px-3 py-2
                        w-full h-12
                        hover:bg-blue-dark
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                    >
                    {createLinkMutation.isPending
                        ? "Salvando..."
                        : "Salvar link"}
                </button>
            </form>
        </div>
    );
}