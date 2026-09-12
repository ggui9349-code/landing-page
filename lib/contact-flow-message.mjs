const BRAZILIAN_AREA_CODE = /^(?:1[1-9]|2[12478]|3[1-578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])$/;

const PHONE_ERROR =
  "Digite um WhatsApp com DDD, por exemplo: (81) 99999-9999.";

function clean(value) {
  return String(value ?? "").trim();
}

export function normalizePhoneDigits(value) {
  let digits = clean(value).replace(/\D/g, "");

  if (digits.startsWith("55") && digits.length > 11) {
    digits = digits.slice(2);
  }

  return digits.slice(0, 11);
}

export function isValidBrazilianPhone(value) {
  const digits = normalizePhoneDigits(value);
  const areaCode = digits.slice(0, 2);
  const localNumber = digits.slice(2);

  if (!BRAZILIAN_AREA_CODE.test(areaCode)) {
    return false;
  }

  if (digits.length === 11) {
    return /^9\d{8}$/.test(localNumber);
  }

  return digits.length === 10 && /^[2-9]\d{7}$/.test(localNumber);
}

export function validateOptionalBrazilianPhone(value) {
  const phone = clean(value);

  if (!phone || isValidBrazilianPhone(phone)) {
    return null;
  }

  return PHONE_ERROR;
}

export function buildMagneticWhatsappMessage(values) {
  const name = clean(values.name);
  const size = clean(values.size);
  const problem = clean(values.problem);
  const phone = clean(values.phone);
  const city = clean(values.city);
  const time = clean(values.time);
  const details = clean(values.details);
  const lines = [
    "Olá, vim pelo site da WL e quero avaliar uma reforma magnética.",
    `Nome: ${name}`,
    `Tamanho: ${size}`,
    `Problema principal: ${problem}`,
  ];

  if (phone) {
    lines.push(`Telefone: ${phone}`);
  }

  if (city) {
    lines.push(`Cidade: ${city}`);
  }

  if (time) {
    lines.push(`Melhor horário: ${time}`);
  }

  if (details) {
    lines.push(`Outras informações: ${details}`);
  }

  lines.push("Vou enviar as fotos do colchão nesta conversa.");
  return lines.join("\n");
}
