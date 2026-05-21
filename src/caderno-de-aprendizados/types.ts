export interface ColorMesa {
  hex: string
  nome: string
}

export const CORES_MESA: ColorMesa[] = [
  { hex: '#5ff402', nome: 'Verde-limão' },
  { hex: '#24baf9', nome: 'Azul-ciano' },
  { hex: '#f8629e', nome: 'Rosa' },
  { hex: '#FF0000', nome: 'Vermelho' },
  { hex: '#fcfd3a', nome: 'Amarelo-vivo' },
  { hex: '#F5A623', nome: 'Laranja' },
  { hex: '#ADADAD', nome: 'Prata' },
  { hex: '#000000', nome: 'Preto' },
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
