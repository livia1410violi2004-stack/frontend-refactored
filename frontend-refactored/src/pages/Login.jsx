import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, User, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { AbsolutaLogo, AbsolutaMark } from "../components/Logo";
import { AUTH } from "../constants/testIds";
import { brand } from "../mocks/data";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ username, password });
      toast.success("Bem-vindo ao Absoluta ERP");
      const to = location.state?.from?.pathname || "/";
      navigate(to, { replace: true });
    } catch (err) {
      toast.error(err.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.1fr_1fr] bg-[#1D1D1C]">
      {/* Left: industrial image */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src={brand.loginBg}
          alt="Fixadores industriais"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(29,29,28,0.9) 0%, rgba(29,29,28,0.55) 50%, rgba(29,29,28,0.85) 100%)",
          }}
        />
        <div className="relative h-full flex flex-col justify-between p-12 text-white">
          <AbsolutaLogo variant="light" />
          <div className="max-w-md">
            <div className="abs-label text-[#F2A900] mb-3">Sistema Interno</div>
            <h2 className="font-heading text-4xl xl:text-5xl font-bold leading-[1.05] tracking-tight">
              Gestão comercial e operacional para <span className="text-[#F2A900]">fixadores industriais</span>.
            </h2>
            <p className="text-neutral-300 mt-5 text-sm leading-relaxed">
              Fixando qualidade. Garantindo soluções. Uma plataforma pensada para a rotina de metalúrgicas,
              engenharias e indústrias de precisão.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { k: "Qualidade", v: "ISO" },
                { k: "Precisão", v: "±0.01" },
                { k: "Confiança", v: "25+ anos" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-mono text-2xl font-semibold text-[#F2A900]">{s.v}</div>
                  <div className="abs-label text-neutral-400 mt-1">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#F2A900]" />
            Conexão criptografada · v0.1.0
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center px-6 py-10 bg-[#F5F5F5]">
        <form
          data-testid={AUTH.loginForm}
          onSubmit={submit}
          className="w-full max-w-sm bg-white border border-neutral-200 rounded-sm p-8 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <AbsolutaMark size={44} />
            <div className="text-right">
              <div className="abs-label text-neutral-500">Acesso</div>
              <div className="font-heading font-semibold text-[#1D1D1C]">ABSOLUTA ERP</div>
            </div>
          </div>

          <h1 className="font-heading text-2xl font-bold text-[#1D1D1C]">Entrar no sistema</h1>
          <p className="text-sm text-neutral-500 mt-1">Informe suas credenciais corporativas.</p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="abs-label block mb-1.5">Usuário</label>
              <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-sm px-3 py-2 focus-within:border-[#1D1D1C] focus-within:ring-1 focus-within:ring-[#F2A900] transition-colors">
                <User size={15} className="text-neutral-400" />
                <input
                  data-testid={AUTH.usernameInput}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 outline-none text-sm bg-transparent"
                  placeholder="admin"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="abs-label block mb-1.5">Senha</label>
              <div className="flex items-center gap-2 bg-white border border-neutral-300 rounded-sm px-3 py-2 focus-within:border-[#1D1D1C] focus-within:ring-1 focus-within:ring-[#F2A900] transition-colors">
                <Lock size={15} className="text-neutral-400" />
                <input
                  data-testid={AUTH.passwordInput}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 outline-none text-sm bg-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  data-testid={AUTH.rememberCheckbox}
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-[#F2A900]"
                />
                <span className="text-neutral-600">Lembrar acesso</span>
              </label>
              <a data-testid={AUTH.forgotLink} href="#" className="text-[#1D1D1C] font-semibold hover:text-[#F2A900] transition-colors">
                Esqueci minha senha
              </a>
            </div>

            <button
              data-testid={AUTH.submitBtn}
              type="submit"
              disabled={loading}
              className="abs-btn-primary w-full justify-center py-2.5 mt-2 disabled:opacity-60"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>ENTRAR <ArrowRight size={15} /></>}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-200 text-[11px] text-neutral-500 font-mono">
            DEMO · admin / admin123
          </div>
        </form>
      </div>
    </div>
  );
}
