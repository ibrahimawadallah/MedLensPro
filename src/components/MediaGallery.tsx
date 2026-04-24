import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { MediaItem } from "@/lib/dailymed";

interface Props {
  media: MediaItem[];
}

export async function MediaGallery({ media }: Props) {
  const images = media.filter((m) => m.mime_type?.startsWith("image/"));
  if (images.length === 0) return null;
  const t = await getTranslations("drug");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5">
      <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-3">
        {t("mediaHeading")}
      </h2>
      <p className="text-sm text-slate-500 mb-4">{t("mediaIntro")}</p>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((m) => (
          <li
            key={m.url}
            className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50"
          >
            <a href={m.url} target="_blank" rel="noreferrer">
              <Image
                src={m.url}
                alt={m.name}
                width={400}
                height={300}
                className="h-40 w-full object-contain bg-white"
                unoptimized
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
