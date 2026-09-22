import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { LinkCard } from "./link-card";

interface LinkData {
  id: string;
  originalUrl: string;
  shortenedUrl: string;
  visitorCounter: number;
  createdAt: Date;
}

const links: LinkData[] = [
  { id: "1", shortenedUrl: "brev.ly/Portfolio-Dev-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", originalUrl: "devsite.portfolio.com.br/devname-123456-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", visitorCounter: 1, createdAt: new Date() },
  { id: "2", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 2, createdAt: new Date() },
  { id: "3", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 0, createdAt: new Date() },
  { id: "4", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 1, createdAt: new Date() },
  { id: "5", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 2, createdAt: new Date() },
  { id: "6", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 0, createdAt: new Date() },
  { id: "7", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 1, createdAt: new Date() },
  { id: "8", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 2, createdAt: new Date() },
  { id: "9", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 0, createdAt: new Date() },
  { id: "10", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 1, createdAt: new Date() },
  { id: "11", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 2, createdAt: new Date() },
  { id: "12", shortenedUrl: "brev.ly/Portfolio-Dev", originalUrl: "devsite.portfolio.com.br/devname-123456", visitorCounter: 0, createdAt: new Date() },
];

export function ListLinks() {
  const isEmpty = links.length === 0;

  return (
    <div className="bg-gray-100 rounded-lg p-8 w-[580px] flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5">
        <h2 className="text-large text-gray-600">Meus links</h2>
        <button
          className="bg-gray-200 text-small text-gray-500 rounded-sm px-3 py-2 h-8 flex flex-row items-center transition-all outline-2 outline-transparent hover:outline-blue-base disabled:opacity-50  disabled:hover:outline-transparent"
        >
          <DownloadSimpleIcon size={14} className="mr-2" />
            Baixar CSV
        </button>
      </div>

      {isEmpty ? (
        <div
          className="flex flex-col items-center justify-center gap-3 pt-4 pb-6"
        >
          <LinkIcon size={32} className="text-gray-400" />
          <span className="text-x-small text-gray-500 uppercase">Ainda não existem links cadastrados</span>
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
              onCopy={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}