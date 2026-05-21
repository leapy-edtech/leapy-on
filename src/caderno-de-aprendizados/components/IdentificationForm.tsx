import { useState, useEffect } from 'react'
import { ParticipantInfo, CORES_MESA, ColorMesa } from '../types'
import { User, Building, BookOpen, Layers } from 'lucide-react'

const TRILHAS_OPCOES = [
  'Como influenciar a efetivação e construir programas de entrada que funcionem como pipelines de talentos',
  'Como lidar com os impactos da IA na contratação e no desenvolvimento de jovens talentos',
  'Como engajar jovens talentos em jornadas de aprendizagem e desenvolvimento',
  'Como comunicar a marca empregadora e atrair jovens talentos',
]

interface Props {
  initialData: ParticipantInfo | null
  onSubmit: (data: ParticipantInfo) => void
}

export default function IdentificationForm({ initialData, onSubmit }: Props) {
  const [nome, setNome] = useState(initialData?.nome ?? '')
  const [empresa, setEmpresa] = useState(initialData?.empresa ?? '')
  const [trilha, setTrilha] = useState(initialData?.trilha ?? '')
  const [corMesa, setCorMesa] = useState<ColorMesa | null>(initialData?.corMesa ?? null)
  const [errors, setErrors] = useState<{ nome?: string; empresa?: string; trilha?: string; corMesa?: string }>({})

  useEffect(() => {
    try {
      const draft = localStorage.getItem('leapy_participant_draft')
      if (draft) {
        const p = JSON.parse(draft)
        if (p.nome) setNome(p.nome)
        if (p.empresa) setEmpresa(p.empresa)
        if (p.trilha) setTrilha(p.trilha)
        if (p.corMesa) setCorMesa(p.corMesa)
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem('leapy_participant_draft', JSON.stringify({ nome, empresa, trilha, corMesa }))
    }, 500)
    return () => clearTimeout(t)
  }, [nome, empresa, trilha, corMesa])

  const validate = (): boolean => {
    const e: typeof errors = {}
    if (!nome.trim()) e.nome = 'Por favor, digite seu nome.'
    if (!empresa.trim()) e.empresa = 'Por favor, digite o nome da sua empresa.'
    if (!trilha) e.trilha = 'Por favor, selecione o tema do grupo.'
    if (!corMesa) e.corMesa = 'Por favor, escolha a cor da sua roda.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate() && corMesa) onSubmit({ nome: nome.trim(), empresa: empresa.trim(), trilha, corMesa })
  }

  const isComplete = !!nome.trim() && !!empresa.trim() && !!trilha && !!corMesa

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[640px] mx-auto bg-white p-6 md:p-8 rounded-2xl border border-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#1A0428] tracking-tight">Sua Identificação</h2>
        <p className="text-xs md:text-sm text-gray-500">Insira seus dados para organizar suas anotações do evento.</p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="nome" className="text-xs font-bold text-[#1A0428] uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-4 h-4 text-[#3B3CFF]" /> Seu Nome *
        </label>
        <input id="nome" type="text" value={nome}
          onChange={(e) => { setNome(e.target.value); if (errors.nome) setErrors(p => ({ ...p, nome: undefined })) }}
          placeholder="Ex: Ana Souza"
          className="w-full text-sm py-3 px-4 rounded-xl border border-[#DDDDDD] focus:outline-none focus:border-[#3B3CFF] transition-all placeholder:text-gray-400 bg-white"
        />
        {errors.nome && <p className="text-xs text-red-500 font-medium pl-1">{errors.nome}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="empresa" className="text-xs font-bold text-[#1A0428] uppercase tracking-wider flex items-center gap-1.5">
          <Building className="w-4 h-4 text-[#3B3CFF]" /> Empresa *
        </label>
        <input id="empresa" type="text" value={empresa}
          onChange={(e) => { setEmpresa(e.target.value); if (errors.empresa) setErrors(p => ({ ...p, empresa: undefined })) }}
          placeholder="Ex: Leapy S/A"
          className="w-full text-sm py-3 px-4 rounded-xl border border-[#DDDDDD] focus:outline-none focus:border-[#3B3CFF] transition-all placeholder:text-gray-400 bg-white"
        />
        {errors.empresa && <p className="text-xs text-red-500 font-medium pl-1">{errors.empresa}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="trilha" className="text-xs font-bold text-[#1A0428] uppercase tracking-wider flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-[#3B3CFF]" /> Selecione o tema do grupo *
        </label>
        <div className="relative">
          <select id="trilha" value={trilha}
            onChange={(e) => { setTrilha(e.target.value); if (errors.trilha) setErrors(p => ({ ...p, trilha: undefined })) }}
            className="w-full text-sm py-3 pl-4 pr-10 rounded-xl border border-[#DDDDDD] bg-white focus:outline-none focus:border-[#3B3CFF] appearance-none cursor-pointer text-gray-700 transition-all font-medium"
          >
            <option value="">-- Escolha um tema abaixo --</option>
            {TRILHAS_OPCOES.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#3B3CFF]">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {errors.trilha && <p className="text-xs text-red-500 font-medium pl-1">{errors.trilha}</p>}
      </div>

      <div className="space-y-2.5">
        <label className="text-xs font-bold text-[#1A0428] uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#3B3CFF]" /> Selecione a cor da sua roda *
        </label>
        <div className="flex flex-wrap gap-3 md:gap-4 items-center p-3 py-4 bg-gray-50 border border-[#EAEAEA] rounded-xl">
          {CORES_MESA.map((c) => {
            const selected = corMesa?.hex === c.hex
            return (
              <button key={c.hex} type="button"
                onClick={() => { setCorMesa(c); if (errors.corMesa) setErrors(p => ({ ...p, corMesa: undefined })) }}
                className="w-11 h-11 md:w-14 md:h-14 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-sm flex items-center justify-center relative"
                style={{ backgroundColor: c.hex, border: selected ? '3px solid #3B3CFF' : '1px solid #D1D5DB' }}
                aria-label={`Roda ${c.nome}`} title={c.nome}
              >
                {selected && <div className="absolute inset-0.5 rounded-full border border-white pointer-events-none" />}
              </button>
            )
          })}
        </div>
        {corMesa && (
          <p className="text-xs font-semibold text-[#3B3CFF] pl-1 flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: corMesa.hex }} />
            Roda {corMesa.nome} selecionada
          </p>
        )}
        {errors.corMesa && <p className="text-xs text-red-500 font-medium pl-1">{errors.corMesa}</p>}
      </div>

      <div className="pt-2">
        <button type="submit" disabled={!isComplete}
          className={`w-full font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center ${
            isComplete ? 'bg-[#3B3CFF] hover:bg-[#3B3CFF]/90 text-white cursor-pointer hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
          }`}
        >
          Começar anotações
        </button>
      </div>
    </form>
  )
}
