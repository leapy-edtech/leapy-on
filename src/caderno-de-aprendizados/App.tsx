import { useState, useEffect } from 'react'
import { ParticipantInfo } from './types'
import { EVENT_DATE } from './constants'
import IdentificationForm from './components/IdentificationForm'
import NotesForm from './components/NotesForm'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function App() {
  const [participantInfo, setParticipantInfo] = useState<ParticipantInfo | null>(() => {
    try {
      const cached = localStorage.getItem('leapy_participant_info')
      return cached ? JSON.parse(cached) : null
    } catch { return null }
  })
  const [step, setStep] = useState<1 | 2>(() => {
    try {
      return localStorage.getItem('leapy_participant_info') ? 2 : 1
    } catch { return 1 }
  })
  const [navWarning, setNavWarning] = useState<string | null>(null)

  useEffect(() => {
    let sid = localStorage.getItem('leapy_session_id')
    if (!sid) {
      sid = 'leapy-' + Math.random().toString(36).substring(2, 11) + '-' + Date.now()
      localStorage.setItem('leapy_session_id', sid)
    }
  }, [])

  const handleIdentificationSubmit = (info: ParticipantInfo) => {
    setParticipantInfo(info)
    localStorage.setItem('leapy_participant_info', JSON.stringify(info))
    setStep(2)
  }

  const handleEditIdentification = () => setStep(1)
  const handleResetSession = () => { setParticipantInfo(null); setStep(1) }

  const checkAndSubmitDraft = (): boolean => {
    try {
      const draft = localStorage.getItem('leapy_participant_draft')
      if (!draft) return false
      const parsed = JSON.parse(draft)
      if (parsed.nome?.trim() && parsed.empresa?.trim() && parsed.trilha && parsed.corMesa) {
        const info: ParticipantInfo = {
          nome: parsed.nome.trim(),
          empresa: parsed.empresa.trim(),
          trilha: parsed.trilha,
          corMesa: parsed.corMesa,
        }
        setParticipantInfo(info)
        localStorage.setItem('leapy_participant_info', JSON.stringify(info))
        return true
      }
    } catch { /* ignore */ }
    return false
  }

  const handleDotClick = (targetStep: 1 | 2) => {
    setNavWarning(null)
    if (targetStep === 1) {
      setStep(1)
    } else {
      if (participantInfo) { checkAndSubmitDraft(); setStep(2) }
      else {
        const ok = checkAndSubmitDraft()
        if (ok) { setStep(2) }
        else {
          setNavWarning('Por favor, preencha todos os campos obrigatórios na Identificação para acessar as anotações.')
          setTimeout(() => setNavWarning(null), 4500)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col text-[#1A0428] font-sans antialiased pb-12">
      <header className="w-full bg-white border-b border-[#EAEAEA] py-5 px-6 sticky top-0 z-30 shadow-sm mb-8 flex justify-center">
        <div className="w-full max-w-[640px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://39765206.fs1.hubspotusercontent-na1.net/hubfs/39765206/Leapy_On_2.png"
              alt="Logo Leapy ON"
              referrerPolicy="no-referrer"
              className="h-9 w-auto object-contain pointer-events-none"
            />
            <div className="h-6 w-[2px] bg-gray-200" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">{EVENT_DATE}</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-full shadow-sm select-none">
            <button
              onClick={() => handleDotClick(1)}
              disabled={step === 1}
              className={`min-w-[44px] min-h-[44px] transition-all flex items-center justify-center rounded-full ${
                step === 1 ? 'text-gray-300 cursor-default' : 'text-[#3B3CFF] hover:bg-gray-100 active:scale-95 cursor-pointer'
              }`}
              aria-label="Ir para Identificação"
            >
              <ChevronLeft className="w-5 h-5" style={{ strokeWidth: 2.5 }} />
            </button>
            <span className="text-[11px] font-semibold text-gray-400 tabular-nums px-1">{step}/2</span>
            <button
              onClick={() => handleDotClick(2)}
              disabled={step === 2}
              className={`min-w-[44px] min-h-[44px] transition-all flex items-center justify-center rounded-full ${
                step === 2 ? 'text-gray-300 cursor-default' : 'text-[#3B3CFF] hover:bg-gray-100 active:scale-95 cursor-pointer'
              }`}
              aria-label="Ir para Anotações"
            >
              <ChevronRight className="w-5 h-5" style={{ strokeWidth: 2.5 }} />
            </button>
          </div>
        </div>
      </header>

      {navWarning && (
        <div className="w-full max-w-[640px] mx-auto px-5 mb-5">
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs md:text-sm p-3.5 rounded-xl flex items-center justify-between shadow-sm">
            <span className="font-medium">{navWarning}</span>
            <button onClick={() => setNavWarning(null)} className="text-amber-500 hover:text-amber-700 font-bold ml-3 cursor-pointer text-sm">✕</button>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-[640px] mx-auto px-5">
        {step === 1 ? (
          <IdentificationForm initialData={participantInfo} onSubmit={handleIdentificationSubmit} />
        ) : (
          participantInfo && (
            <NotesForm
              participantInfo={participantInfo}
              onEditIdentification={handleEditIdentification}
              onResetSession={handleResetSession}
            />
          )
        )}
      </main>
    </div>
  )
}
