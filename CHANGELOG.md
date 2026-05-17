# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

## [0.1.1] - 2026-05-17

### Added
- **Talent Voices** agora conta 25 profissionais: adicionados Daniela Funchal (IBM), João Guilherme Pincinato (Smart Fit), Morgana Floriano (Zamp), Sandra Carvalho (Grupo Boticário) e Thatiana Valle (Itaú Unibanco), com fotos hospedadas localmente em `/public/speakers/` e `loading="lazy"` para melhor performance
- Imagens da sessão de speakers carregam com `loading="lazy"` (redução de carga inicial ~1,8 MB)
- Novos palestrantes na página principal: **Mateus Alcantra** (Jovem Aprendiz no iFood Benefícios) e **Estela Moraes** (Analista de Dados Jr na Stone)
- Suporte a `objectPosition` por palestrante, permitindo enquadrar fotos com posição personalizada (ex: centralizar rosto no card)
- `allowFullScreen` no iframe do YouTube embeddado

### Changed
- Ordem dos palestrantes ajustada: Tatiane Santos e Ághata Brito aparecem antes de Roberta Saragiotto
- Título da seção de agenda atualizado: "O que as novas gerações têm a dizer"
- Meta description da subpágina Talent Voices atualizada de "20 nomes" para "25 nomes"
- `.gitignore` inclui `.gstack/` (diretório de trabalho local do gstack)

## [0.1.0] - 2026-05-14

### Added
- Subpágina **Talent Voices** (`/talent-voices`): curadoria de 20 profissionais de RH de empresas como Nubank, Disney, Google, Vale e outras, com fotos circulares, links para LinkedIn, vídeo institucional e seção sobre o Leapy ON
- Configuração MPA (Multi-Page App) no Vite — o site agora compila dois HTML independentes, permitindo subpáginas sem router
- `vercel.json` declarando `framework: vite` e `outputDirectory: dist` para garantir roteamento correto no Vercel

### Fixed
- Badge de tipo do palestrante visível no avesso do card ao girar (backface-visibility aplicado via inline style além de Tailwind para garantia cross-browser)
- Botão de som do vídeo agora chama `videoRef.current?.play()` ao desmutar, resolvendo caso onde autoplay estava bloqueado pelo browser
- Imagem de fundo do hero usa `object-cover` em vez de `object-contain`, evitando barras laterais em viewports com proporção diferente
- Key da lista de palestrantes usa `speaker.name` em vez de índice numérico, evitando reuso incorreto de nós DOM ao reordenar

[0.1.1]: https://github.com/leapy-edtech/leapy-on/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/leapy-edtech/leapy-on/releases/tag/v0.1.0
