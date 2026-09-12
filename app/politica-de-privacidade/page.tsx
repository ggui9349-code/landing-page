/* eslint-disable @next/next/no-img-element */

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Entenda como a WL Colchões utiliza e protege os dados enviados em pedidos de avaliação.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  openGraph: {
    title: "Política de Privacidade | WL Colchões",
    description:
      "Informações sobre o uso de dados em pedidos de avaliação da WL Colchões.",
    url: "/politica-de-privacidade",
  },
};

const whatsappHref = `https://wa.me/${siteConfig.whatsappDigits}?text=${encodeURIComponent(
  "Olá, gostaria de falar com a WL sobre meus dados pessoais.",
)}`;

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <header className="privacy-header">
        <Link className="privacy-brand" href="/" aria-label="WL Colchões, início">
          <span className="brand-logo">
            <img src="/images/wl-logo.png" alt="" width="121" height="74" />
          </span>
        </Link>
        <Link className="privacy-back" href="/">
          Voltar ao site
        </Link>
      </header>

      <main className="privacy-main">
        <header className="privacy-intro">
          <p>Última atualização: 30 de agosto de 2026</p>
          <h1>Política de Privacidade</h1>
          <span>
            Esta política explica, em linguagem simples, como a WL Colchões
            trata as informações usadas para avaliar e realizar serviços em
            colchões.
          </span>
        </header>

        <article className="privacy-content">
          <section>
            <h2>Quem é responsável pelos dados</h2>
            <p>
              A <strong>WL Colchões</strong> é responsável pelas informações
              recebidas durante o atendimento. Esta política se aplica aos
              pedidos iniciados neste site e às conversas decorrentes pelo
              WhatsApp.
            </p>
          </section>

          <section>
            <h2>Quais dados podemos receber</h2>
            <p>Dependendo do que você decidir informar, podemos receber:</p>
            <ul>
              <li>nome;</li>
              <li>tamanho e condição do colchão;</li>
              <li>telefone, cidade e melhor horário para contato;</li>
              <li>detalhes, mensagens, fotos e vídeos enviados no WhatsApp;</li>
              <li>
                informações necessárias para orçamento, execução, entrega e
                garantia do serviço.
              </li>
            </ul>
            <p>
              O formulário prepara a mensagem no seu navegador. A WL somente
              recebe essas informações quando você confirma o envio dentro do
              WhatsApp.
            </p>
          </section>

          <section>
            <h2>Como usamos seus dados</h2>
            <p>Usamos as informações para:</p>
            <ul>
              <li>entender o estado do colchão e fazer a avaliação inicial;</li>
              <li>responder dúvidas e apresentar uma recomendação e orçamento;</li>
              <li>organizar coleta, reforma, entrega, garantia e atendimento;</li>
              <li>cumprir obrigações legais e proteger direitos da WL e do cliente.</li>
            </ul>
            <p>
              O tratamento pode se apoiar no seu consentimento, nas medidas
              necessárias para atender ao serviço solicitado e no cumprimento
              de obrigações legais. A WL não vende seus dados pessoais.
            </p>
          </section>

          <section>
            <h2>Com quem os dados podem ser compartilhados</h2>
            <p>
              As informações podem ser processadas por serviços indispensáveis
              ao atendimento, como a hospedagem do site e o WhatsApp, operado
              pela Meta. Esses serviços possuem regras próprias de privacidade.
              Também poderá haver compartilhamento quando uma obrigação legal
              ou autoridade competente exigir.
            </p>
          </section>

          <section>
            <h2>Por quanto tempo conservamos as informações</h2>
            <p>
              Mantemos os dados apenas pelo tempo necessário para realizar o
              atendimento, prestar o serviço, acompanhar a garantia e cumprir
              obrigações legais. Depois desse período, as informações podem ser
              excluídas ou anonimizadas, salvo quando a conservação for
              permitida ou exigida por lei.
            </p>
          </section>

          <section>
            <h2>Como protegemos seus dados</h2>
            <p>
              Adotamos cuidados administrativos e técnicos compatíveis com a
              operação para reduzir riscos de acesso, alteração, divulgação ou
              perda indevida. Nenhum sistema é totalmente imune, mas limitamos o
              acesso às informações a quem precisa delas para realizar o
              atendimento.
            </p>
          </section>

          <section>
            <h2>Seus direitos pela LGPD</h2>
            <p>
              Você pode solicitar confirmação e acesso aos seus dados, correção
              de informações, detalhes sobre compartilhamento, revogação do
              consentimento e exclusão quando aplicável. Também pode apresentar
              outras solicitações previstas na Lei Geral de Proteção de Dados.
            </p>
            <a
              className="privacy-contact"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar atendimento sobre meus dados pelo WhatsApp
            </a>
            <p className="privacy-contact-number">
              Canal da WL: {siteConfig.whatsappPhone}
            </p>
          </section>

          <section>
            <h2>Atualizações desta política</h2>
            <p>
              Esta política poderá ser atualizada para acompanhar mudanças no
              atendimento ou na legislação. A versão vigente e sua data de
              atualização ficarão disponíveis nesta página.
            </p>
          </section>
        </article>
      </main>

      <footer className="privacy-footer">
        <span>© 2026 WL Colchões</span>
        <Link href="/">Voltar para a página inicial</Link>
      </footer>
    </div>
  );
}

