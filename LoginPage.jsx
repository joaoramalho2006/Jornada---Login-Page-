

import { useState } from "react";

export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [focusCpf, setFocusCpf] = useState(false);
  const [focusSenha, setFocusSenha] = useState(false);

 
  function formatarCPF(valor) {
    const n = valor.replace(/\D/g, "").slice(0, 11);
    return n
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }


  async function handleLogin(e) {
    e.preventDefault();
    setErro("");

    if (!cpf || !senha) {
      setErro("Preencha o CPF e a senha.");
      return;
    }

    setCarregando(true);

   
    await new Promise((r) => setTimeout(r, 1200));
    setCarregando(false);
    setErro("Integração com API pendente. Veja os comentários no código.");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Sora', sans-serif;
        }

        .fast-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #0a1f5c 0%, #1255b8 45%, #0d47a1 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
        }

        /* Círculos decorativos de fundo */
        .fast-page::before {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          top: -120px;
          right: -120px;
          pointer-events: none;
        }
        .fast-page::after {
          content: '';
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          bottom: -80px;
          left: -80px;
          pointer-events: none;
        }

        /* Animação de entrada */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .fast-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: slideUp 0.5s ease both;
        }

        .fast-logo-box {
          background: #fff;
          border-radius: 18px;
          padding: 14px 28px;
          margin-bottom: 14px;
          box-shadow: 0 6px 32px rgba(0,0,0,0.28);
        }

        .fast-logo-text {
          font-size: 30px;
          font-weight: 800;
          color: #1255b8;
          letter-spacing: 4px;
        }

        .fast-portal-title {
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .fast-portal-sub {
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          margin-bottom: 28px;
        }

        /* Card principal */
        .fast-card {
          background: #fff;
          border-radius: 20px;
          padding: 36px 32px 28px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 16px 60px rgba(0,0,0,0.35);
          animation: slideUp 0.5s 0.1s ease both;
        }

        .fast-card-title {
          font-size: 22px;
          font-weight: 700;
          color: #0d1b3e;
          margin-bottom: 4px;
        }

        .fast-card-sub {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 26px;
        }

        /* Campos */
        .fast-field {
          margin-bottom: 18px;
        }

        .fast-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 7px;
        }

        .fast-input {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #d1d5db;
          border-radius: 10px;
          font-size: 15px;
          font-family: 'Sora', sans-serif;
          color: #111827;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fafafa;
        }

        .fast-input:focus {
          border-color: #1255b8;
          box-shadow: 0 0 0 3px rgba(18, 85, 184, 0.12);
          background: #fff;
        }

        .fast-input::placeholder {
          color: #b0b7c3;
        }

        /* Erro */
        .fast-erro {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #b91c1c;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Botão */
        .fast-btn {
          width: 100%;
          padding: 14px;
          background: #1255b8;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.1s;
          margin-top: 6px;
        }

        .fast-btn:hover:not(:disabled) {
          background: #0d47a1;
          transform: translateY(-1px);
        }

        .fast-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .fast-btn:disabled {
          background: #93c5fd;
          cursor: not-allowed;
        }

        /* Spinner */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .fast-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        /* Link cadastro */
        .fast-cadastro {
          text-align: center;
          margin-top: 22px;
          font-size: 13px;
          color: #9ca3af;
        }

        .fast-cadastro a {
          color: #1255b8;
          font-weight: 700;
          text-decoration: none;
        }

        .fast-cadastro a:hover {
          text-decoration: underline;
        }

        /* Divider */
        .fast-divider {
          height: 1px;
          background: #f0f0f0;
          margin: 22px 0 18px;
        }

        /* Rodapé */
        .fast-footer {
          color: rgba(255,255,255,0.45);
          font-size: 11px;
          margin-top: 28px;
          text-align: center;
          animation: slideUp 0.5s 0.2s ease both;
        }

        /* Responsivo */
        @media (max-width: 480px) {
          .fast-card {
            padding: 28px 20px 22px;
          }
        }
      `}</style>

      <div className="fast-page">

        {/* CABEÇALHO */}
        <div className="fast-header">
          <div className="fast-logo-box">
            <span className="fast-logo-text">FAST</span>
          </div>
          <h1 className="fast-portal-title">Portal do Colaborador</h1>
          <p className="fast-portal-sub">Fast Ariam Londrina</p>
        </div>

        {/* CARD DE LOGIN */}
        <div className="fast-card">
          <p className="fast-card-title">Bem-vindo!</p>
          <p className="fast-card-sub">Entre com suas credenciais para acessar o sistema</p>

          {/* MENSAGEM DE ERRO */}
          {erro && (
            <div className="fast-erro">
              <span>⚠</span>
              <span>{erro}</span>
            </div>
          )}

          {/* CAMPO CPF */}
          <div className="fast-field">
            <label className="fast-label" htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              type="text"
              className="fast-input"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(formatarCPF(e.target.value))}
              maxLength={14}
              autoComplete="username"
            />
          </div>

          {/* CAMPO SENHA */}
          <div className="fast-field">
            <label className="fast-label" htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              className="fast-input"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {/* BOTÃO ENTRAR */}
          <button
            className="fast-btn"
            onClick={handleLogin}
            disabled={carregando}
          >
            {carregando ? (
              <>
                <span className="fast-spinner" />
                Verificando...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Entrar
              </>
            )}
          </button>

          <div className="fast-divider" />

          {/* LINK CADASTRO */}
          <p className="fast-cadastro">
            Ainda não tem cadastro?{" "}
            {/* 🔧 INTEGRAR: troque href="/cadastro" pela rota real */}
            <a href="/cadastro">Cadastre-se aqui</a>
          </p>
        </div>

        {/* RODAPÉ */}
        <p className="fast-footer">© 2026 Fast Ariam Londrina · Todos os direitos reservados</p>

      </div>
    </>
  );
}

