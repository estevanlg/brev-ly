import { CopyIcon, TrashIcon } from "@phosphor-icons/react";

interface LinkCardProps {
  title: string;
  originalUrl: string;
  clicks: number;
  onCopy: () => void;
  onDelete: () => void;
}

export function LinkCard({
  title,
  originalUrl,
  clicks,
  onCopy,
  onDelete,
}: LinkCardProps) {
  return (
    <div className="flex items-center justify-between rounded-lg py-5 transition-colors">
        <div className="flex min-w-0 flex-col">
            <span className="text-medium font-medium text-blue-base truncate">
                {title}
            </span>

            <span className="text-small text-gray-500 truncate">
                {originalUrl}
            </span>
        </div>

        <div className="flex items-center gap-5 ml-4">
            <span className="whitespace-nowrap text-small text-gray-500">
                {clicks} {clicks > 1 ? 'acessos' : 'acesso'}
            </span>

            <div className="flex items-center gap-1">
                <button
                    onClick={onCopy}
                    className="flex h-8 w-8 items-center justify-center rounded border border-transparent bg-gray-200 text-gray-600 hover:border-blue-base"
                >
                    <CopyIcon size={14} />
                </button>

                <button
                    onClick={onDelete}
                    className="flex h-8 w-8 items-center justify-center rounded border border-transparent bg-gray-200 text-gray-600 hover:border-blue-base"
                >
                    <TrashIcon size={14} />
                </button>
            </div>
        </div>
    </div>
  );
}