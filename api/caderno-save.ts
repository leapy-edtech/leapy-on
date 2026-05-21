import { createClient } from '@supabase/supabase-js'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { id_sessao } = req.query
    if (!id_sessao) return res.status(400).json({ error: 'id_sessao é obrigatório' })

    const { data, error } = await supabase
      .from('on_participant_records')
      .select('desafios, ideias_praticas, hipoteses_experimentos, timestamp_ultima_edicao')
      .eq('id_sessao', id_sessao)
      .single()

    if (error || !data) return res.status(200).json(null)

    return res.status(200).json({
      desafios: data.desafios,
      ideiasPraticas: data.ideias_praticas,
      hipotesesExperimentos: data.hipoteses_experimentos,
      ultimaEdicao: data.timestamp_ultima_edicao,
    })
  }

  if (req.method === 'POST') {
    const { idSessao, timestampCriacao, timestampUltimaEdicao, nome, empresa, trilha, corMesaHex, corMesaNome, desafios, ideiasPraticas, hipotesesExperimentos } = req.body

    if (!idSessao || !nome?.trim() || !empresa?.trim() || !trilha) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
    }

    const { error } = await supabase
      .from('on_participant_records')
      .upsert(
        {
          id_sessao: idSessao,
          timestamp_criacao: timestampCriacao,
          timestamp_ultima_edicao: timestampUltimaEdicao,
          nome: nome.trim(),
          empresa: empresa.trim(),
          trilha,
          cor_mesa_hex: corMesaHex,
          cor_mesa_nome: corMesaNome,
          desafios: desafios ?? '',
          ideias_praticas: ideiasPraticas ?? '',
          hipoteses_experimentos: hipotesesExperimentos ?? '',
        },
        { onConflict: 'id_sessao' }
      )

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
