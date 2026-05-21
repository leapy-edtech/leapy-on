import { ParticipantInfo, Answers } from '../types'
import { EVENT_DATE } from '../constants'

export async function generateNotesPDF(
  participant: ParticipantInfo,
  answers: Answers,
  timestamp: string
): Promise<void> {
  const { default: jsPDF } = await import('jspdf')

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 20

  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Leapy ON — Rodas de Conversa', margin, y)
  y += 8

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text(EVENT_DATE, margin, y)
  y += 10

  doc.setDrawColor(220, 220, 220)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Identificação', margin, y)
  y += 7

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Nome: ${participant.nome}`, margin, y); y += 6
  doc.text(`Empresa: ${participant.empresa}`, margin, y); y += 6

  const trilhaLines = doc.splitTextToSize(`Trilha: ${participant.trilha}`, contentWidth)
  doc.text(trilhaLines, margin, y)
  y += trilhaLines.length * 6 + 2
  doc.text(`Roda: ${participant.corMesa.nome}`, margin, y)
  y += 10

  doc.setDrawColor(220, 220, 220)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8

  const addSection = (title: string, content: string) => {
    if (y > 265) { doc.addPage(); y = 20 }
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(59, 60, 255)
    const titleLines = doc.splitTextToSize(title, contentWidth)
    doc.text(titleLines, margin, y)
    y += titleLines.length * 6 + 4
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(30, 30, 30)
    const bodyLines = doc.splitTextToSize(content || '(sem resposta)', contentWidth)
    bodyLines.forEach((line: string) => {
      if (y > 275) { doc.addPage(); y = 20 }
      doc.text(line, margin, y)
      y += 6
    })
    y += 6
  }

  addSection('1. Quais foram os principais desafios compartilhados sobre o tema?', answers.desafios)
  addSection('2. Quais foram as soluções, boas-práticas ou sugestões acionáveis compartilhadas sobre estes desafios?', answers.ideiasPraticas)
  addSection('3. Quais hipóteses ou experimentos a roda gostaria de ver testados?', answers.hipotesesExperimentos)

  doc.setFontSize(8)
  doc.setTextColor(160, 160, 160)
  doc.text(`Gerado em ${new Date(timestamp).toLocaleString('pt-BR')} — leapy.com.br`, margin, 287)

  doc.save(`leapy-on-${participant.nome.replace(/\s+/g, '-').toLowerCase()}.pdf`)
}
