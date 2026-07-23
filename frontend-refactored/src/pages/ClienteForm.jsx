import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { toast } from "sonner";
import { CLIENTES } from "../constants/testIds";
import { ClientesService } from "../services/clientes.service";
import { ArrowLeft, Save } from "lucide-react";

const Field = ({ label, children, className = "" }) => (
  <div className={className}>
    <label className="abs-label block mb-1.5">{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900] transition-colors"
  />
);

const Section = ({ title, children }) => (
  <div className="abs-card p-5">
    <div className="abs-panel-title mb-4">{title}</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
  </div>
);

export default function ClienteForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState({
    razaoSocial: "", nomeFantasia: "", cnpj: "", ie: "", segmento: "Metalúrgica",
    cep: "", rua: "", numero: "", complemento: "", bairro: "", cidade: "", estado: "SP",
    contato: "", cargo: "", telefone: "", whatsapp: "", email: "",
    vendedor: "", condicaoPagamento: "30 dias", limiteCredito: 0, observacoes: "",
    status: "Ativo",
  });

  useEffect(() => {
    if (isEdit) ClientesService.get(id).then((c) => c && setForm(c));
  }, [id, isEdit]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = async (e) => {
    e.preventDefault();
    if (!form.razaoSocial || !form.cnpj) {
      toast.error("Preencha Razão Social e CNPJ.");
      return;
    }
    if (isEdit) {
      await ClientesService.update(id, form);
      toast.success("Cliente atualizado com sucesso.");
    } else {
      await ClientesService.create(form);
      toast.success("Cliente cadastrado com sucesso.");
    }
    navigate("/clientes");
  };

  return (
    <>
      <Header title={isEdit ? "Editar Cliente" : "Novo Cliente"} subtitle="Cadastro comercial" />
      <main className="p-6 space-y-4 abs-fade-up">
        <button onClick={() => navigate(-1)} className="text-sm text-neutral-500 hover:text-[#1D1D1C] inline-flex items-center gap-1.5">
          <ArrowLeft size={14} /> Voltar
        </button>

        <form data-testid={CLIENTES.form} onSubmit={save} className="space-y-4">
          <Section title="Dados da Empresa">
            <Field label="Razão Social" className="md:col-span-2"><Input value={form.razaoSocial} onChange={set("razaoSocial")} required /></Field>
            <Field label="Nome Fantasia"><Input value={form.nomeFantasia} onChange={set("nomeFantasia")} /></Field>
            <Field label="CNPJ"><Input value={form.cnpj} onChange={set("cnpj")} placeholder="00.000.000/0000-00" required /></Field>
            <Field label="Inscrição Estadual"><Input value={form.ie} onChange={set("ie")} /></Field>
            <Field label="Segmento">
              <select className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm" value={form.segmento} onChange={set("segmento")}>
                {["Metalúrgica","Automotivo","Construção Civil","Naval","Agrícola","Aeroespacial","Outros"].map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </Section>

          <Section title="Endereço">
            <Field label="CEP"><Input value={form.cep} onChange={set("cep")} /></Field>
            <Field label="Rua" className="md:col-span-2"><Input value={form.rua} onChange={set("rua")} /></Field>
            <Field label="Número"><Input value={form.numero} onChange={set("numero")} /></Field>
            <Field label="Complemento"><Input value={form.complemento} onChange={set("complemento")} /></Field>
            <Field label="Bairro"><Input value={form.bairro} onChange={set("bairro")} /></Field>
            <Field label="Cidade"><Input value={form.cidade} onChange={set("cidade")} /></Field>
            <Field label="Estado">
              <select className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm" value={form.estado} onChange={set("estado")}>
                {["SP","RJ","MG","RS","PR","SC","BA","PE","GO","DF","ES","CE"].map(u => <option key={u}>{u}</option>)}
              </select>
            </Field>
          </Section>

          <Section title="Contatos">
            <Field label="Nome do contato"><Input value={form.contato} onChange={set("contato")} /></Field>
            <Field label="Cargo"><Input value={form.cargo} onChange={set("cargo")} /></Field>
            <Field label="Telefone"><Input value={form.telefone} onChange={set("telefone")} /></Field>
            <Field label="WhatsApp"><Input value={form.whatsapp} onChange={set("whatsapp")} /></Field>
            <Field label="E-mail" className="md:col-span-2"><Input type="email" value={form.email} onChange={set("email")} /></Field>
          </Section>

          <Section title="Comercial">
            <Field label="Vendedor responsável"><Input value={form.vendedor} onChange={set("vendedor")} /></Field>
            <Field label="Condição de pagamento"><Input value={form.condicaoPagamento} onChange={set("condicaoPagamento")} /></Field>
            <Field label="Limite de crédito (R$)"><Input type="number" value={form.limiteCredito} onChange={set("limiteCredito")} /></Field>
            <Field label="Observações" className="md:col-span-3">
              <textarea rows={3} value={form.observacoes} onChange={set("observacoes")}
                className="w-full bg-white border border-neutral-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-[#1D1D1C] focus:ring-1 focus:ring-[#F2A900]" />
            </Field>
          </Section>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => navigate("/clientes")} className="abs-btn-ghost">Cancelar</button>
            <button type="submit" data-testid={CLIENTES.saveBtn} className="abs-btn-primary">
              <Save size={14} /> Salvar Cliente
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
