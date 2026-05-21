import { useState, useEffect, useRef, useCallback } from 'react'
import { ParticipantInfo, ParticipantRecord } from '../types'
import { generateNotesPDF } from '../utils/pdfGenerator'
import { Edit2, CloudOff, Check, Loader2, Download, Trash2 } from 'lucide-react'

interface Props {
  participantInfo: ParticipantInfo
  onEditIdentification: () => void
  onResetSession: () => void
}

export default function NotesForm({ participantInfo, onEditIdentification, onResetSession }: Props) {
  const [desafios, setDesafios] = useState('')
  const [ideiasPraticas, setIdeiasPraticas] = useState('')
  const [hipotesesExperimentos, setHipotesesExperimentos] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'offline'>('idle')
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null)
  const [recovering, setRecovering] = useState(false)

  const desafiosRef = useRef<HTMLTextAreaElement>(null)
  const ideiasRef = useRef<HTMLTextAreaElement>(null)
  const hipotesesRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const restore = async () => {
      let restoredFromLocal = false
      try {
        const saved = localStorage.getItem('leapy_buffered_answers')
        if (saved) {
          const parsed = JSON.parse(saved)
          const hasContent = parsed.desafios?.trim() || parsed.ideiasPraticas?.trim() || parsed.hipotesesExperimentos?.trim()
          if (hasContent) {
            setDesafios(parsed.desafios ?? '')
            setIdeiasPraticas(parsed.ideiasPraticas ?? '')
            setHipotesesExperimentos(parsed.hipotesesExperimentos ?? '')
            restoredFromLocal = true
          }
        }
        const t = localStorage.getItem('leapy_last_saved_time')
        if (t) setLastSavedTime(t)
      } catch { /* ignore */ }

      if (!restoredFromLocal) {
        const sid = localStorage.getItem('leapy_session_id')
        if (!sid) return
        setRecovering(true)
        const safetyTimeout = setTimeout(() => setRecovering(false), 6000)
        try {
          const res = await fetch(`/api/caderno-save?id_sessao=${encodeURIComponent(sid)}`)
          if (res.ok) {
            const data = await res.json()
            if (data) {
              setDesafios(data.desafios ?? '')
              setIdeiasPraticas(data.ideiasPraticas ?? '')
              setHipotesesExperimentos(data.hipotesesExperimentos ?? '')
              localStorage.setItem('leapy_buffered_answers', JSON.stringify({
                desafios: data.desafios,
                ideiasPraticas: data.ideiasPraticas,
                hipotesesExperimentos: data.hipotesesExperimentos,
              }))
              if (data.ultimaEdicao) {
                const t = new Date(data.ultimaEdicao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                setLastSavedTime(t)
                setSaveStatus('saved')
                localStorage.setItem('leapy_last_saved_time', t)
              }
            }
          }
        } catch { /* sem conexão */ }
        finally {
          clearTimeout(safetyTimeout)
          setRecovering(false)
        }
      }
    }
    restore()
  }, [])

  useEffect(() => {
    if (desafiosRef.current) {
      desafiosRef.current.style.height = 'auto'
      desafiosRef.current.style.height = `${Math.max(desafiosRef.current.scrollHeight, 180)}px`
    }
  }, [desafios])

  useEffect(() => {
    if (ideiasRef.current) {
      ideiasRef.current.style.height = 'auto'
      ideiasRef.current.style.height = `${Math.max(ideiasRef.current.scrollHeight, 180)}px`
    }
  }, [ideiasPraticas])

  useEffect(() => {
    if (hipotesesRef.current) {
      hipotesesRef.current.style.height = 'auto'
      hipotesesRef.current.style.height = `${Math.max(hipotesesRef.current.scrollHeight, 180)}px`
    }
  }, [hipotesesExperimentos])

  const getSessionId = (): string => {
    let sid = localStorage.getItem('leapy_session_id')
    if (!sid) {
      sid = 'leapy-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now()
      localStorage.setItem('leapy_session_id', sid)
    }
    return sid
  }

  const getCreationTimestamp = (): string => {
    let created = localStorage.getItem('leapy_creation_time')
    if (!created) {
      created = new Date().toISOString()
      localStorage.setItem('leapy_creation_time', created)
    }
    return created
  }

  const saveToServer = useCallback(async (d: string, i: string, h: string) => {
    if (!d.trim() && !i.trim() && !h.trim()) return
    setSaveStatus('saving')

    const record: ParticipantRecord = {
      idSessao: getSessionId(),
      timestampCriacao: getCreationTimestamp(),
      timestampUltimaEdicao: new Date().toISOString(),
      nome: participantInfo.nome,
      empresa: participantInfo.empresa,
      trilha: participantInfo.trilha,
      corMesaHex: participantInfo.corMesa.hex,
      corMesaNome: participantInfo.corMesa.nome,
      desafios: d, ideiasPraticas: i, hipotesesExperimentos: h,
    }

    if (!navigator.onLine) {
      setSaveStatus('offline')
      const t = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      setLastSavedTime(t); localStorage.setItem('leapy_last_saved_time', t)
      return
    }

    try {
      const res = await fetch('/api/caderno-save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
      const t = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      if (res.ok) {
        setSaveStatus('saved'); setLastSavedTime(t)
        localStorage.setItem('leapy_last_saved_time', t)
      } else { setSaveStatus('idle') }
    } catch {
      setSaveStatus('offline')
      const t = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      setLastSavedTime(t); localStorage.setItem('leapy_last_saved_time', t)
    }
  }, [participantInfo])

  useEffect(() => {
    const bufferTimer = setTimeout(() => {
      localStorage.setItem('leapy_buffered_answers', JSON.stringify({ desafios, ideiasPraticas, hipotesesExperimentos }))
    }, 500)
    const syncTimer = setTimeout(() => {
      saveToServer(desafios, ideiasPraticas, hipotesesExperimentos)
    }, 3000)
    return () => { clearTimeout(bufferTimer); clearTimeout(syncTimer) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desafios, ideiasPraticas, hipotesesExperimentos])

  const handleDownloadPDF = async () => {
    await saveToServer(desafios, ideiasPraticas, hipotesesExperimentos)
    await generateNotesPDF(participantInfo, { desafios, ideiasPraticas, hipotesesExperimentos }, getCreationTimestamp())
  }

  const handleResetSession = async () => {
    if (!window.confirm('Tem certeza? Suas anotações serão apagadas.')) return
    const sid = getSessionId()
    setDesafios(''); setIdeiasPraticas(''); setHipotesesExperimentos('')
    setSaveStatus('idle'); setLastSavedTime(null)
    try {
      await fetch('/api/caderno-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idSessao: sid }),
      })
    } catch { /* ignore */ }
    localStorage.removeItem('leapy_buffered_answers')
    localStorage.removeItem('leapy_last_saved_time')
    localStorage.removeItem('leapy_session_id')
    localStorage.removeItem('leapy_creation_time')
    localStorage.removeItem('leapy_participant_info')
    localStorage.removeItem('leapy_participant_draft')
    onResetSession()
  }

  return (
    <div className="w-full max-w-[640px] mx-auto space-y-6">
      <div className="bg-[#F0F2FF] text-[#1A0428] p-5 rounded-2xl border border-[#3B3CFF]/15 shadow-[0_4px_16px_rgba(59,60,255,0.03)] relative overflow-hidden select-none">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-[#3B3CFF]/5 to-transparent pointer-events-none" />
        <div className="flex justify-between items-start">
          <div className="space-y-1 z-10">
            <span className="text-[10px] font-extrabold tracking-wider text-[#3B3CFF] uppercase">Roda de Conversa Ativa</span>
            <h3 className="text-lg font-extrabold tracking-tight leading-tight">{participantInfo.nome}</h3>
            <p className="text-xs text-gray-500 font-medium">{participantInfo.empresa}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 z-10">
            <div className="flex items-center justify-center bg-white p-1.5 rounded-full border border-gray-200/80 shadow-sm" title={`Roda ${participantInfo.corMesa.nome}`}>
              <span className="w-3.5 h-3.5 rounded-full inline-block shrink-0" style={{ backgroundColor: participantInfo.corMesa.hex }} />
            </div>
            <button onClick={onEditIdentification} className="text-[#3B3CFF] hover:text-[#3B3CFF]/80 flex items-center justify-center bg-white p-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer mt-1 border border-gray-100" aria-label="Editar Identificação">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-[#3B3CFF]/10 text-xs text-gray-600 z-10 relative">
          <strong className="text-[#1A0428] block font-bold mb-0.5">Trilha:</strong>
          {participantInfo.trilha}
        </div>
      </div>

      <div className="space-y-5 bg-white p-6 md:p-8 rounded-2xl border border-[#EAEAEA] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        {recovering && (
          <div className="flex items-center gap-2 text-xs text-gray-400 animate-pulse pb-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Recuperando anotações anteriores...
          </div>
        )}

        {[
          { id: 'desafios', label: '1. Quais foram os principais desafios compartilhados sobre o tema?', value: desafios, set: setDesafios, ref: desafiosRef, placeholder: 'Digite aqui livremente sobre as dificuldades, dores e desafios apontados pela roda de conversa...' },
          { id: 'ideias', label: '2. Quais foram as soluções, boas-práticas ou sugestões acionáveis compartilhadas sobre estes desafios?', value: ideiasPraticas, set: setIdeiasPraticas, ref: ideiasRef, placeholder: 'Anote aqui as principais soluções inovadoras, ferramentas, sugestões dinâmicas ou cases práticos discutidos...' },
          { id: 'hipoteses', label: '3. Quais hipóteses ou experimentos a roda gostaria de ver testados?', value: hipotesesExperimentos, set: setHipotesesExperimentos, ref: hipotesesRef, placeholder: 'Descreva hipóteses levantadas ou experimentos práticos e testes que o grupo sugeriu realizar...' },
        ].map(({ id, label, value, set, ref, placeholder }) => (
          <div key={id} className="space-y-2">
            <label htmlFor={id} className="text-xs md:text-sm font-extrabold text-[#1A0428] leading-tight block">{label}</label>
            <textarea id={id} ref={ref} value={value}
              onChange={(e) => set(e.target.value)}
              placeholder={placeholder}
              className="w-full text-sm p-4 rounded-xl border border-[#DDDDDD] focus:outline-none focus:border-[#3B3CFF] bg-white resize-none leading-relaxed transition-all min-h-[180px] overflow-hidden"
            />
          </div>
        ))}

        <div className="flex items-center pt-3 border-t border-[#EAEAEA]">
          {saveStatus === 'saving' && (
            <span className="text-xs text-gray-400 flex items-center gap-1.5 animate-pulse">
              <Loader2 className="w-3.5 h-3.5 animate-spin" /> Salvando...
            </span>
          )}
          {saveStatus === 'saved' && lastSavedTime && (
            <span className="text-xs text-[#4FE0B0] flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5" /> Salvo às {lastSavedTime}
            </span>
          )}
          {saveStatus === 'offline' && lastSavedTime && (
            <span className="text-xs text-amber-500 flex items-center gap-1.5 font-medium">
              <CloudOff className="w-3.5 h-3.5" /> Sem conexão — salvo localmente às {lastSavedTime}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4">
        <button onClick={handleDownloadPDF} className="w-full sm:w-auto border-2 border-[#3B3CFF] hover:bg-[#3B3CFF]/5 active:scale-95 transition-all text-[#3B3CFF] font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md">
          <Download className="w-4 h-4" /> Baixar anotações em PDF
        </button>
        <button onClick={handleResetSession} className="w-full sm:w-auto text-xs font-bold text-gray-400 hover:text-red-500 cursor-pointer flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg hover:bg-red-50 transition-all">
          <Trash2 className="w-3.5 h-3.5" /> Limpar e começar de novo
        </button>
      </div>
    </div>
  )
}
