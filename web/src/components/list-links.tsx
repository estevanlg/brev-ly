import { DownloadSimpleIcon, LinkIcon, SpinnerGapIcon, InfoIcon, XCircleIcon } from "@phosphor-icons/react";
import { LinkCard } from "./link-card";
import { useLinks } from "../hooks/use-links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink, exportLinks } from "../services/links";
import toast from "react-hot-toast";

interface LinkData {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  visitorCounter: number;
  createdAt: Date;
}

export function ListLinks() {
  const queryClient = useQueryClient();

  const {
    data: links = [] as LinkData[],
    isLoading,
  } = useLinks();

  const deleteMutation = useMutation({
      mutationFn: deleteLink,
      onSuccess: () => {
          queryClient.invalidateQueries({
          queryKey: ["links"],
          });
      },
  });

  const exportMutation = useMutation({
    mutationFn: exportLinks,
    onSuccess: (data) => {
      window.open(data.reportUrl, "_blank");
    },
    onError: () => {
      toast.custom((t) => (
        <div
          className={`flex items-center gap-3 rounded-md bg-red-100 p-4 shadow-md border border-red-300 ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <XCircleIcon size={24} className="text-red-600 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-semibold text-small text-red-700">Erro na exportação</span>
            <span className="text-small text-red-600">Não foi possível gerar o relatório.</span>
          </div>
        </div>
      ));
    },
  });

  const isEmpty = links.length === 0;

  return (
    <div className="bg-gray-100 rounded-lg p-6 sm:p-8 w-full sm:w-[580px] flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <h2 className="text-large text-gray-600">Meus links</h2>
        <button
          className="bg-gray-200 text-small text-gray-500 rounded-sm px-3 py-2 h-8 flex flex-row items-center transition-all outline-2 outline-transparent hover:outline-blue-base disabled:opacity-50 disabled:hover:outline-transparent"
          onClick={() => exportMutation.mutate()}
          disabled={exportMutation.isPending || isEmpty}
        >
          {exportMutation.isPending ? (
            <SpinnerGapIcon size={14} className="mr-2 animate-spin" />
          ) : (
            <DownloadSimpleIcon size={14} className="mr-2" />
          )}
          Baixar CSV
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-6">
          <SpinnerGapIcon size={24} className="text-gray-400 animate-spin" />
          <span className="text-x-small text-gray-500 uppercase text-center">
            carregando links...
          </span>
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center gap-3 pt-4 pb-6">
          <LinkIcon size={32} className="text-gray-400" />
          <span className="text-x-small text-gray-500 uppercase text-center">
            Ainda não existem links cadastrados
          </span>
        </div>
      ) : (
        <div
          style={{ overflowY: "auto" }}
          className="max-h-96 divide-y divide-gray-200 scrollbar-auto scrollbar-thumb-blue-base scrollbar-track-gray-100"
        >
          {links.map((link) => (
            <LinkCard
              key={link.id}
              title={link.shortenedUrl}
              originalUrl={link.originalUrl}
              clicks={link.visitorCounter}
              onCopy={() => {
                const fullUrl = `http://localhost:5173/${link.shortenedUrl}`;
                navigator.clipboard.writeText(fullUrl);

                toast.custom((t) => (
                  <div
                    className={`flex items-center gap-3 rounded-md bg-blue-light p-4 shadow-md border border-gray-200 ${
                      t.visible ? "animate-enter" : "animate-leave"
                    }`}
                  >
                    <InfoIcon size={24} className="text-blue-dark flex-shrink-0" />

                    <div className="flex flex-col">
                      <span className="font-semibold text-small text-blue-dark">
                        Link copiado com sucesso
                      </span>
                      <span className="text-small text-blue-base">
                        O link {link.shortenedUrl} foi copiado para a área de transferência.
                      </span>
                    </div>
                  </div>
                ));
              }}
              onDelete={() => deleteMutation.mutate(link.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
