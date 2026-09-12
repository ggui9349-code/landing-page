import assert from "node:assert/strict";
import test from "node:test";
import {
  buildMagneticWhatsappMessage,
  validateOptionalBrazilianPhone,
} from "../lib/contact-flow-message.mjs";

test("allows an empty optional phone and rejects an invalid one", () => {
  assert.equal(validateOptionalBrazilianPhone(""), null);
  assert.equal(validateOptionalBrazilianPhone("(81) 99999-9999"), null);
  assert.equal(
    validateOptionalBrazilianPhone("(00) 1234-5678"),
    "Digite um WhatsApp com DDD, por exemplo: (81) 99999-9999.",
  );
});

test("builds the exact magnetic renovation message without optional details", () => {
  const message = buildMagneticWhatsappMessage({
    name: "Ana",
    size: "Queen",
    problem: "Afundamento",
    phone: "",
    city: "",
    time: "",
    details: "",
  });

  assert.equal(
    message,
    [
      "Olá, vim pelo site da WL e quero avaliar uma reforma magnética.",
      "Nome: Ana",
      "Tamanho: Queen",
      "Problema principal: Afundamento",
      "Vou enviar as fotos do colchão nesta conversa.",
    ].join("\n"),
  );
});

test("adds each optional value without changing the required message boundaries", () => {
  const message = buildMagneticWhatsappMessage({
    name: "Ana",
    size: "Queen",
    problem: "Afundamento",
    phone: "(81) 99999-9999",
    city: "Recife",
    time: "Tarde",
    details: "O colchão está desnivelado.",
  });

  assert.equal(
    message,
    [
      "Olá, vim pelo site da WL e quero avaliar uma reforma magnética.",
      "Nome: Ana",
      "Tamanho: Queen",
      "Problema principal: Afundamento",
      "Telefone: (81) 99999-9999",
      "Cidade: Recife",
      "Melhor horário: Tarde",
      "Outras informações: O colchão está desnivelado.",
      "Vou enviar as fotos do colchão nesta conversa.",
    ].join("\n"),
  );
  assert.match(
    message,
    /^Olá, vim pelo site da WL e quero avaliar uma reforma magnética\./,
  );
  assert.match(message, /Vou enviar as fotos do colchão nesta conversa\.$/);
});
