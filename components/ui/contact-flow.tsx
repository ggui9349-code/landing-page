"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import { emitSiteAnalytics } from "@/components/ui/site-analytics";
import {
  buildMagneticWhatsappMessage,
  normalizePhoneDigits,
  validateOptionalBrazilianPhone,
} from "@/lib/contact-flow-message.mjs";

interface ContactFlowContextValue {
  openContactFlow: (trigger: HTMLButtonElement, source: string) => void;
}

type ContactStep = "form" | "ready";
type CopyState = "idle" | "copied" | "error";

const ContactFlowContext = createContext<ContactFlowContextValue | null>(null);

function formatBrazilianPhone(value: string) {
  const digits = normalizePhoneDigits(value);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : "";
  }

  const areaCode = digits.slice(0, 2);
  const localNumber = digits.slice(2);

  if (localNumber.length <= 4) {
    return `(${areaCode}) ${localNumber}`;
  }

  const firstBlockLength = localNumber.length > 8 ? 5 : 4;
  const firstBlock = localNumber.slice(0, firstBlockLength);
  const lastBlock = localNumber.slice(firstBlockLength, firstBlockLength + 4);

  return `(${areaCode}) ${firstBlock}${lastBlock ? `-${lastBlock}` : ""}`;
}

function copyWithFallback(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Não foi possível copiar a mensagem.");
  }
}

export function ContactFlowProvider({
  children,
  whatsappPhone,
}: {
  children: ReactNode;
  whatsappPhone: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ContactStep>("form");
  const [openFailed, setOpenFailed] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [preparedMessage, setPreparedMessage] = useState("");
  const [whatsappHref, setWhatsappHref] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const readyHeadingRef = useRef<HTMLHeadingElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sourceRef = useRef("sem-origem");
  const submitGuardRef = useRef(false);

  const openContactFlow = useCallback((trigger: HTMLButtonElement, source: string) => {
    triggerRef.current = trigger;
    sourceRef.current = source;
    setPrivacyConsent(false);
    setIsOpen(true);
  }, []);

  const closeContactFlow = useCallback(() => {
    setIsOpen(false);
    setStep("form");
    setOpenFailed(false);
    setCopyState("idle");
    setPrivacyConsent(false);
    submitGuardRef.current = false;
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || step !== "form") {
      return;
    }

    window.setTimeout(
      () => dialogRef.current?.querySelector<HTMLInputElement>("#contact-name")?.focus(),
      0,
    );
  }, [isOpen, step]);

  useEffect(() => {
    if (step !== "ready") {
      return;
    }

    window.setTimeout(() => {
      dialogRef.current?.scrollTo({ top: 0 });
      readyHeadingRef.current?.focus();
    }, 0);
  }, [step]);

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    event.currentTarget.value = formatBrazilianPhone(event.currentTarget.value);
    event.currentTarget.setCustomValidity("");
  }

  function handlePhoneInvalid(event: FormEvent<HTMLInputElement>) {
    event.currentTarget.setCustomValidity(
      validateOptionalBrazilianPhone(event.currentTarget.value) ?? "",
    );
  }

  function openWhatsapp(url: string) {
    try {
      const openedWindow = window.open(url, "_blank");

      if (openedWindow) {
        try {
          openedWindow.opener = null;
        } catch {
          // Some browsers protect the new context before navigation completes.
        }
      }

      return Boolean(openedWindow);
    } catch {
      return false;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitGuardRef.current) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const size = String(formData.get("size") ?? "").trim();
    const problem = String(formData.get("problem") ?? "").trim();
    const city = String(formData.get("city") ?? "").trim();
    const time = String(formData.get("time") ?? "").trim();
    const details = String(formData.get("details") ?? "").trim();
    const phoneInput = event.currentTarget.elements.namedItem(
      "phone",
    ) as HTMLInputElement | null;

    const phoneError = validateOptionalBrazilianPhone(phone);
    if (phoneError) {
      phoneInput?.setCustomValidity(phoneError);
      phoneInput?.reportValidity();
      phoneInput?.focus();
      return;
    }

    submitGuardRef.current = true;
    const message = buildMagneticWhatsappMessage({
      name,
      size,
      problem,
      phone,
      city,
      time,
      details,
    });
    const nextWhatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

    setPreparedMessage(message);
    setWhatsappHref(nextWhatsappHref);
    setCopyState("idle");
    emitSiteAnalytics({
      eventName: "contact_form_submit",
      eventLabel: "Formulario de avaliacao enviado",
      ctaSource: sourceRef.current,
    });

    const opened = openWhatsapp(nextWhatsappHref);

    emitSiteAnalytics({
      eventName: opened ? "whatsapp_open" : "whatsapp_blocked",
      eventLabel: opened ? "WhatsApp aberto apos formulario" : "WhatsApp bloqueado pelo navegador",
      ctaSource: sourceRef.current,
    });

    setOpenFailed(!opened);
    setStep("ready");
  }

  async function handleCopyMessage() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(preparedMessage);
      } else {
        copyWithFallback(preparedMessage);
      }

      setCopyState("copied");
      emitSiteAnalytics({
        eventName: "message_copy",
        eventLabel: "Mensagem copiada",
        ctaSource: sourceRef.current,
      });
    } catch {
      try {
        copyWithFallback(preparedMessage);
        setCopyState("copied");
        emitSiteAnalytics({
          eventName: "message_copy",
          eventLabel: "Mensagem copiada",
          ctaSource: sourceRef.current,
        });
      } catch {
        setCopyState("error");
      }
    }
  }

  function editContactDetails() {
    emitSiteAnalytics({
      eventName: "contact_form_edit",
      eventLabel: "Corrigir dados",
      ctaSource: sourceRef.current,
    });
    setStep("form");
    setOpenFailed(false);
    setCopyState("idle");
    submitGuardRef.current = false;
    window.setTimeout(
      () => dialogRef.current?.querySelector<HTMLInputElement>("#contact-name")?.focus(),
      0,
    );
  }

  return (
    <ContactFlowContext.Provider value={{ openContactFlow }}>
      {children}

      <dialog
        ref={dialogRef}
        className="contact-dialog"
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description"
        onClose={() => triggerRef.current?.focus()}
        onCancel={(event) => {
          event.preventDefault();
          closeContactFlow();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeContactFlow();
          }
        }}
      >
        <div className="contact-dialog-panel">
          <button
            type="button"
            className="contact-dialog-close"
            aria-label="Fechar formulário"
            onClick={closeContactFlow}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
              <path
                d="m6 6 12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="contact-dialog-heading">
            <p>{step === "ready" ? "Mensagem preparada" : "Reforma magnética"}</p>
            <h2
              id="contact-dialog-title"
              ref={readyHeadingRef}
              tabIndex={step === "ready" ? -1 : undefined}
            >
              {step === "ready"
                ? "Tudo pronto. Agora envie a mensagem no WhatsApp."
                : "Conte para a gente o que está acontecendo com seu colchão."}
            </h2>
            <span id="contact-dialog-description">
              {step === "ready"
                ? "A WL só recebe essas informações depois que você toca em Enviar no WhatsApp."
                : "Preencha quatro informações. Depois, você poderá enviar as fotos pelo WhatsApp."}
            </span>
          </div>

          <form
            className="contact-form"
            hidden={step === "ready"}
            onSubmit={handleSubmit}
          >
            <div className="contact-form-grid">
              <div className="contact-field">
                <label htmlFor="contact-name">
                  Nome <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-size">
                  Tamanho do colchão <span aria-hidden="true">*</span>
                </label>
                <select id="contact-size" name="size" defaultValue="" required>
                  <option value="" disabled>
                    Selecione
                  </option>
                  <option>Solteiro</option>
                  <option>Viúva</option>
                  <option>Casal</option>
                  <option>Queen</option>
                  <option>King</option>
                  <option>Sob medida</option>
                  <option>Não sei informar</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-problem">
                  Principal problema <span aria-hidden="true">*</span>
                </label>
                <select
                  id="contact-problem"
                  name="problem"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    O que está acontecendo?
                  </option>
                  <option>Afundamento</option>
                  <option>Perda de firmeza</option>
                  <option>Espuma deformada</option>
                  <option>Molas desconfortáveis</option>
                  <option>Tecido desgastado</option>
                  <option>Outro</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-phone">
                  WhatsApp <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  minLength={14}
                  maxLength={15}
                  placeholder="(81) 99999-9999"
                  aria-describedby="contact-phone-hint"
                  onChange={handlePhoneChange}
                  onInvalid={handlePhoneInvalid}
                />
                <span className="contact-field-hint" id="contact-phone-hint">
                  Informe o número com DDD para receber o atendimento.
                </span>
              </div>
            </div>

            <details className="contact-optional">
              <summary>
                Adicionar cidade, horário e outros detalhes <span>Opcional</span>
              </summary>
              <div className="contact-optional-grid">
                <div className="contact-field">
                  <label htmlFor="contact-city">
                    Cidade <span>(opcional)</span>
                  </label>
                  <select id="contact-city" name="city" defaultValue="">
                    <option value="">Selecione se desejar</option>
                    <option>Paulista</option>
                    <option>Olinda</option>
                    <option>Recife</option>
                    <option>Abreu e Lima</option>
                    <option>Camaragibe</option>
                    <option>Jaboatão dos Guararapes</option>
                    <option>Outra cidade da Região Metropolitana</option>
                  </select>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-time">
                    Melhor horário <span>(opcional)</span>
                  </label>
                  <select id="contact-time" name="time" defaultValue="">
                    <option value="">Selecione se desejar</option>
                    <option>Manhã</option>
                    <option>Tarde</option>
                    <option>Noite</option>
                    <option>Qualquer horário</option>
                  </select>
                </div>

                <div className="contact-field contact-field-wide">
                  <label htmlFor="contact-details">
                    Outras informações <span>(opcional)</span>
                  </label>
                  <textarea
                    id="contact-details"
                    name="details"
                    maxLength={500}
                    rows={3}
                    placeholder="Conte o que mudou no conforto ou o resultado que espera."
                  />
                </div>
              </div>
            </details>

            <div className="contact-consent">
              <input
                id="contact-privacy-consent"
                name="privacyConsent"
                type="checkbox"
                autoComplete="off"
                checked={privacyConsent}
                required
                onChange={(event) => {
                  setPrivacyConsent(event.currentTarget.checked);
                  event.currentTarget.setCustomValidity("");
                }}
                onInvalid={(event) =>
                  event.currentTarget.setCustomValidity(
                    "Marque esta caixa para concordar com a Política de Privacidade.",
                  )
                }
              />
              <div>
                <span>
                  <label htmlFor="contact-privacy-consent">Concordo com a </label>
                  <a
                    href="/politica-de-privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Política de Privacidade
                  </a>
                  .
                </span>
                <small>Obrigatório para continuar com a avaliação.</small>
              </div>
            </div>

            <button type="submit" className="contact-submit">
              <span>Enviar fotos para avaliação</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10h12M11 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </button>
            <p className="contact-form-note">
              Seu nome e telefone não ficam salvos neste site. A WL os recebe
              somente quando você envia a mensagem no WhatsApp.
            </p>
          </form>

          {step === "ready" ? (
            <div className="contact-ready" role="status" aria-live="polite">
              <span className="contact-ready-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="m6.5 12.5 3.25 3.25 7.75-8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {openFailed ? (
                <p className="contact-ready-alert" role="alert">
                  Seu navegador não abriu uma nova aba. Seus dados continuam
                  aqui e você pode tentar novamente.
                </p>
              ) : (
                <p>
                  O WhatsApp foi aberto em outra aba. Para concluir, revise a
                  conversa e toque em <strong>Enviar</strong>.
                </p>
              )}

              <div className="contact-ready-actions">
                <a
                  className="contact-submit"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    emitSiteAnalytics({
                      eventName: "whatsapp_retry",
                      eventLabel: "Abrir WhatsApp novamente",
                      ctaSource: sourceRef.current,
                    });
                    setOpenFailed(false);
                  }}
                >
                  <span>Abrir WhatsApp novamente</span>
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10h12M11 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </a>
                <button
                  className="contact-copy"
                  type="button"
                  onClick={handleCopyMessage}
                >
                  {copyState === "copied" ? "Mensagem copiada" : "Copiar mensagem"}
                </button>
              </div>

              {copyState === "error" ? (
                <p className="contact-copy-error" role="alert">
                  Não foi possível copiar automaticamente. Tente abrir o
                  WhatsApp novamente.
                </p>
              ) : null}

              <div className="contact-ready-links">
                <button type="button" onClick={editContactDetails}>
                  Corrigir os dados
                </button>
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    emitSiteAnalytics({
                      eventName: "whatsapp_blank_click",
                      eventLabel: "Abrir conversa sem mensagem pronta",
                      ctaSource: sourceRef.current,
                    });
                  }}
                >
                  Abrir conversa sem mensagem pronta
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </dialog>
    </ContactFlowContext.Provider>
  );
}

export function ContactTrigger({
  children,
  className,
  source,
  ariaLabel,
  showArrow = true,
}: {
  children: ReactNode;
  className: string;
  source: string;
  ariaLabel: string;
  showArrow?: boolean;
}) {
  const context = useContext(ContactFlowContext);
  const [isActivating, setIsActivating] = useState(false);

  if (!context) {
    throw new Error("ContactTrigger must be used within ContactFlowProvider.");
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!context) {
      return;
    }

    setIsActivating(true);
    window.setTimeout(() => setIsActivating(false), 380);
    context.openContactFlow(event.currentTarget, source);
  }

  return (
    <button
      type="button"
      className={`${className} contact-trigger${
        isActivating ? " is-activating" : ""
      }`}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      data-cta-source={source}
      onClick={handleClick}
    >
      <span className="contact-trigger-content">{children}</span>
      {showArrow ? (
        <svg
          aria-hidden="true"
          className="arrow-icon"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M4 10h12M11 5l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ) : null}
    </button>
  );
}
