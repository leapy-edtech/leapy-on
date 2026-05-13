# Leapy ON — Site do Evento

## O que é este projeto

Landing page do evento **Leapy ON — Conferência de Jovens Talentos**, construída em Vite + React + TypeScript + Tailwind CSS. É um site de página única com seções de agenda, palestrantes, patrocinadores e inscrição.

**Repositório de trabalho:** `/home/eduardorbl/Downloads/Leapy-ON/`

---

## Workflow: Merge de Nova Versão da Chefe

A chefe envia periodicamente atualizações feitas por vibe coding (geralmente via IA sem controle de versão). Essas versões chegam como um arquivo `.zip` nomeado no padrão:

```
leapy-on---conferência-de-jovens-talentos (N).zip
```

Onde `N` é um número de versão incremental (ex: 6, 7, 8...).

O zip geralmente é extraído em `/home/eduardorbl/Downloads/` ou dentro da própria pasta do projeto. O diretório extraído tem o mesmo nome do zip (sem o `.zip`).

### Como identificar a nova versão

Quando receber um prompt como:
- "a chefe mandou nova versão"
- "nova versão chegou"
- "tem um zip novo"
- "merge a nova versão"
- "atualiza com a versão dela"

**Execute o seguinte fluxo:**

---

## Fluxo de Merge (passo a passo)

### 1. Localizar a versão nova

```bash
# Procurar diretórios extraídos da chefe
ls /home/eduardorbl/Downloads/ | grep "leapy-on"
ls /home/eduardorbl/Downloads/Leapy-ON/ | grep "leapy-on"
```

Se houver múltiplas versões, usar a de número mais alto (mais recente).

Se o zip ainda não foi extraído, pedir ao usuário para extrair primeiro (ou extrair com `unzip`).

### 2. Comparar arquivo por arquivo

Os arquivos relevantes do projeto são:

| Arquivo | O que costuma mudar |
|---------|---------------------|
| `src/App.tsx` | Novos palestrantes, agenda, textos, layout de seções, novos componentes |
| `src/index.css` | Estilos globais, variáveis CSS, animações |
| `index.html` | Meta tags, título, fontes |
| `package.json` | Novas dependências |
| `vite.config.ts` | Raramente muda |

```bash
diff MINHA_VERSAO/src/App.tsx VERSAO_CHEFE/src/App.tsx
diff MINHA_VERSAO/src/index.css VERSAO_CHEFE/src/index.css
diff MINHA_VERSAO/index.html VERSAO_CHEFE/index.html
```

### 3. Classificar cada diferença

Para cada bloco de diff, decidir se é:

**IMPORTAR** — mudanças de conteúdo e funcionalidade que a chefe adicionou intencionalmente:
- Novos palestrantes (nome, bio, foto, LinkedIn, tipo)
- Mudanças de texto/copy (títulos, descrições, agenda)
- Novas seções ou componentes de UI
- Novos patrocinadores ou logotipos
- Ajustes de layout que parecem intencionais (reorganização de grade, ordem de seções)
- Novas datas ou informações do evento
- Novas dependências que habilitam funcionalidade nova

**IGNORAR** — regressões introduzidas pelo vibe coding que pioram o código:
- Remoção de tipos TypeScript (ex: `const Modal = ({ isOpen, onClose, children })` sem tipos → pior)
- Substituição de `useState<number | null>` por `useState(null)` sem tipo → pior
- Simplificações que quebram type safety
- Remoção de comentários úteis
- Piora de performance (ex: rerenders desnecessários)
- Remoção de acessibilidade (aria labels, roles)
- Regressões visuais que o usuário já corrigiu (espaçamentos, alinhamentos, etc.)
- Whitespace/formatação insignificante

**AVALIAR** — mudanças ambíguas que precisam de julgamento:
- Reorganização de componentes (pode ser melhor ou pior)
- Mudança de lógica de estado
- Alteração em estilos que podem ou não ser intencional

### 4. Aplicar as mudanças selecionadas

- Fazer edits cirúrgicos no arquivo da versão de trabalho
- **Nunca** substituir o arquivo inteiro pela versão da chefe
- Preservar TypeScript types, lógica de estado tipada, e todas as correções visuais já feitas
- Se adicionar um novo palestrante, seguir exatamente a interface/tipo já definido no código existente

### 5. Double check — auto-revisão + Codex

Antes de reportar, fazer duas rodadas de verificação:

**5a. Auto-revisão:** Reler o diff final aplicado e confirmar:
- Nenhum tipo TypeScript foi removido acidentalmente
- Nenhuma seção existente sumiu
- Nenhum dado de conteúdo existente (palestrante, patrocinador, texto) foi alterado sem intenção
- O código compila (rodar `npm run build` ou checar erros de TypeScript)

**5b. Codex:** Invocar `/codex` passando o diff das mudanças aplicadas para uma segunda opinião independente, pedindo especificamente:
- "Alguma regressão foi introduzida?"
- "Algum tipo TypeScript foi removido ou enfraquecido?"
- "Algum conteúdo pré-existente foi perdido ou alterado?"

### 6. Limpar os arquivos temporários

Após o double check estar ok, apagar o diretório extraído da versão da chefe e o zip correspondente:

```bash
rm -rf "/home/eduardorbl/Downloads/Leapy-ON/leapy-on---conferência-de-jovens-talentos (N)/"
rm -f "/home/eduardorbl/Downloads/leapy-on---conferência-de-jovens-talentos (N).zip"
# também checar dentro de /home/eduardorbl/Downloads/ se o zip foi extraído lá
```

### 7. Ship — abrir PR

Invocar `/ship` (gstack) para criar o PR com todas as mudanças aplicadas. O PR deve descrever claramente:
- O que foi importado da versão da chefe
- O que foi descartado e por quê

Após o PR aberto, reportar a URL para o usuário revisar manualmente e fazer o merge.

### 8. Reportar o resultado final

```
✓ Importado: [lista do que foi adicionado]
✗ Ignorado: [lista do que foi descartado e por quê]
🔗 PR: [URL do PR aberto]
```

---

## Princípio fundamental

> **Importar a intenção da chefe, preservar a qualidade do código.**

A chefe determina O QUÊ (conteúdo, funcionalidades, design). O código de trabalho determina COMO (implementação, tipos, qualidade).

---

## Stack do projeto

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (com tema customizado em `tailwind.config`)
- **Lucide React** (ícones)
- Sem backend — página estática

## Arquivos que NÃO existem neste projeto

- Sem rotas (é SPA de página única, sem React Router)
- Sem testes automatizados
- Sem API calls próprias (iframes externos para formulário de inscrição)
