import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLink } from "../services/links";

const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "Informe a URL original")
    .url("Informe uma URL válida"),

  shortenedUrl: z
    .string()
    .min(1, "Informe a URL encurtada")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Utilize apenas letras, números, hífen (-) e underline (_)"
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
                            className="text-x-small uppercase text-gray-500"
                        >
                            Link original
                        </label>

                        <input
                            id="originalUrl"
                            placeholder="https://www.exemplo.com.br"
                            {...register("originalUrl")}
                            className="
                                w-full h-12 rounded-md border px-4 py-2
                                text-base text-gray-600
                                placeholder:text-gray-400
                                focus:outline-none
                                focus:ring-1 focus:ring-blue-base
                                focus:border-blue-base
                                border-gray-300
                            "
                        />

                        {errors.originalUrl && (
                            <span className="text-xs text-red-500">
                                {errors.originalUrl.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="shortenedUrl"
                            className="text-x-small uppercase text-gray-500"
                        >
                            Link encurtado
                        </label>

                        <div
                            className={`
                                flex items-center h-12 rounded-md px-4
                                ${
                                errors.shortenedUrl
                                    ? "border border-red-500"
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
                            <span className="text-xs text-red-500">
                                {errors.shortenedUrl.message}
                            </span>
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