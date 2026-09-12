function normalizeSiteUrl(value: string | undefined) {
  const fallback = "https://www.wlcolchoes.com.br";

  if (!value) {
    return fallback;
  }

  const normalized = value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `https://${value}`;

  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

export const siteConfig = {
  name: "WL Colchões",
  legalName: "WL Colchões",
  url: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL,
  ),
  title: "Reforma de Colchões em Recife, Olinda e Paulista | WL Colchões",
  shortTitle: "Reforma de Colchões | WL Colchões",
  description:
    "Reforma profissional de colchões em Recife, Olinda, Paulista e Região Metropolitana. Envie fotos pelo WhatsApp e descubra se seu colchão pode ser recuperado.",
  socialDescription:
    "Seu colchão afundou, deformou ou perdeu o conforto? Envie fotos para uma avaliação inicial pelo WhatsApp.",
  whatsappPhone: "+55 81 8751-4699",
  whatsappDigits: "558187514699",
  locale: "pt_BR",
  areaServed: [
    "Paulista",
    "Olinda",
    "Recife",
    "Região Metropolitana do Recife",
  ],
  ogImage: {
    path: "/og.png",
    width: 1200,
    height: 630,
    alt: "WL Colchões: reforma profissional de colchões em Recife, Olinda e Paulista",
  },
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.endsWith("/")
    ? siteConfig.url
    : `${siteConfig.url}/`;
  return new URL(path, base).toString();
}
