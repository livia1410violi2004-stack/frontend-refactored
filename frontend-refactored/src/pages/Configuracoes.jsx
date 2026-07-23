import React from "react";
import { Header } from "../components/layout/Header";
import { PageHeader } from "../components/PageHeader";
import { CONFIG } from "../constants/testIds";
import { AbsolutaMark } from "../components/Logo";
import { Building2, Bell, Palette, Lock } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

const Field = ({ label, children }) => (
  <div><label className="abs-label block mb-1.5">{label}</label>{children}</div>
);
const Input = (props) => (
  <input {...props} className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
);

export default function Configuracoes() {
  return (
    <>
      <Header title="Configurações" subtitle="Preferências do sistema" />
      <main data-testid={CONFIG.page} className="p-6 space-y-4 abs-fade-up">
        <PageHeader title="Configurações" description="Ajuste dados da empresa, logo, preferências de sistema e permissões." />

        <div className="abs-card">
          <Tabs defaultValue="empresa">
            <TabsList className="w-full justify-start rounded-none bg-neutral-50 border-b border-neutral-200 h-auto p-0">
              <TabsTrigger value="empresa" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3"><Building2 size={14} className="mr-2"/>Empresa</TabsTrigger>
              <TabsTrigger value="preferencias" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3"><Palette size={14} className="mr-2"/>Preferências</TabsTrigger>
              <TabsTrigger value="notificacoes" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3"><Bell size={14} className="mr-2"/>Notificações</TabsTrigger>
              <TabsTrigger value="seguranca" className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#F2A900] px-5 py-3"><Lock size={14} className="mr-2"/>Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="empresa" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
                <div className="text-center">
                  <div className="abs-label mb-2">Logo</div>
                  <div className="w-full aspect-square bg-neutral-50 border border-neutral-200 rounded-sm flex items-center justify-center">
                    <AbsolutaMark size={120} />
                  </div>
                  <button className="abs-btn-ghost mt-3 w-full justify-center">Alterar logo</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Razão Social"><Input defaultValue="Absoluta Fixadores Ltda." /></Field>
                  <Field label="Nome Fantasia"><Input defaultValue="Absoluta Fixadores" /></Field>
                  <Field label="CNPJ"><Input defaultValue="45.789.123/0001-70" /></Field>
                  <Field label="Inscrição Estadual"><Input defaultValue="123.456.789.000" /></Field>
                  <Field label="Endereço"><Input defaultValue="Rua Industrial, 2500" /></Field>
                  <Field label="Cidade / UF"><Input defaultValue="São Paulo / SP" /></Field>
                  <Field label="Telefone"><Input defaultValue="(11) 4488-9900" /></Field>
                  <Field label="E-mail"><Input defaultValue="contato@absolutafixadores.com.br" /></Field>
                </div>
              </div>
              <div className="mt-6 flex justify-end"><button className="abs-btn-primary">Salvar alterações</button></div>
            </TabsContent>

            <TabsContent value="preferencias" className="p-6 space-y-4">
              <Field label="Idioma"><select className="w-full max-w-xs bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm"><option>Português (Brasil)</option><option>English</option></select></Field>
              <Field label="Moeda padrão"><select className="w-full max-w-xs bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm"><option>BRL (R$)</option><option>USD (US$)</option></select></Field>
              <Field label="Formato de data"><select className="w-full max-w-xs bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm"><option>DD/MM/AAAA</option><option>AAAA-MM-DD</option></select></Field>
            </TabsContent>

            <TabsContent value="notificacoes" className="p-6 space-y-3">
              {[
                "Alerta de estoque baixo",
                "Novos orçamentos criados",
                "Pedidos aprovados",
                "Vencimento de propostas",
              ].map(n => (
                <label key={n} className="flex items-center justify-between p-3 border border-neutral-200 rounded-sm cursor-pointer hover:border-neutral-300">
                  <span className="text-sm text-[#1D1D1C]">{n}</span>
                  <input type="checkbox" defaultChecked className="accent-[#F2A900] w-4 h-4" />
                </label>
              ))}
            </TabsContent>

            <TabsContent value="seguranca" className="p-6 space-y-4">
              <Field label="Senha atual"><Input type="password" /></Field>
              <Field label="Nova senha"><Input type="password" /></Field>
              <Field label="Confirmar senha"><Input type="password" /></Field>
              <div className="flex justify-end"><button className="abs-btn-primary">Atualizar senha</button></div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
