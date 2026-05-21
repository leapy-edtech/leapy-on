export interface ColorMesa {
  hex: string
  nome: string
}

export const CORES_MESA: ColorMesa[] = [
  { hex: '#5ff402', nome: 'Verde-limão' },
  { hex: '#24baf9', nome: 'Azul-ciano' },
  { hex: '#f8629e', nome: 'Rosa' },
  { hex: '#f9a334', nome: 'Laranja-claro' },
  { hex: '#fcfd3a', nome: 'Amarelo-vivo' },
  { hex: '#d6d67f', nome: 'Verde-oliva' },
  { hex: '#c6c6c6', nome: 'Cinza' },
  { hex: '#a67058', nome: 'Marrom' },
]

export interface ParticipantInfo {
  nome: string
  empresa: string
  trilha: string
  corMesa: ColorMesa
}

export interface Answers {
  desafios: string
  ideiasPraticas: string
  hipotesesExperimentos: string
}

export interface ParticipantRecord {
  idSessao: string
  timestampCriacao: string
  timestampUltimaEdicao: string
  nome: string
  empresa: string
  trilha: string
  corMesaHex: string
  corMesaNome: string
  desafios: string
  ideiasPraticas: string
  hipotesesExperimentos: string
}
