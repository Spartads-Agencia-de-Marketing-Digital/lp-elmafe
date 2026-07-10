# Tracking da LP Elmafe — o que falta configurar no GTM

A LP já tem o container **GTM-5KM8Z8R2** instalado (head + noscript) e o formulário
faz `dataLayer.push({ event: 'lead_lp_elmafe', ... })` ao submeter com sucesso.

## IDs confirmados (2026-07-10)
- Conta GTM: **6276046034** (ELMAFE) — o container é mesmo do cliente, não da SPLW.
- Container: **210175030** (`www.elmafe.pt`, publicId `GTM-5KM8Z8R2`).
- Workspace: **9** (Default Workspace).
- Propriedade GA4: **G-EZ0NBLNLYX** (usada por todas as tags GA4 existentes: tags 13 e 17).

## Decisão de isolamento (importante)
As tags de conversão Google Ads deste container (tag 10 e tag 16, tipo `awct`)
apontam para **conversionId 18114358140** = **AW-18114358140 ("Conta SPLW 766-081-5784")**.
Por isso a LP **não** deve reutilizar os eventos existentes ("Leads - Contacto" /
"Leads - Pedido de Orçamento") — dispararia a conversão na conta SPLW.
A LP usa um **evento GA4 próprio e isolado**, ligado só ao seu trigger custom-event.
Nenhuma tag `awct` (Google Ads) é criada até haver decisão da conta correta.

Falta criar (em **workspace draft**, sem publicar até revisão do Bruno):

## 1. Trigger — Custom Event
- **Tipo:** `customEvent`
- **Nome do evento:** `lead_lp_elmafe`
- **Nome sugerido:** `CE - lead_lp_elmafe (LP)`

## 2. Tag — GA4 event (seguro, propriedade própria Elmafe, evento isolado)
- **Tipo:** `gaawe` (Google Analytics: GA4 Event)
- **Nome sugerido:** `GA4 - Leads - LP Mastros`
- **eventName:** `Leads - LP Mastros`  (evento novo e isolado; marcar como
  evento-chave no GA4 depois de disparar pela 1ª vez)
- **measurementIdOverride:** `G-EZ0NBLNLYX`
- **sendEcommerceData:** `false`
- **Dispara em:** trigger `CE - lead_lp_elmafe (LP)`
- Mesma estrutura da tag 17 já existente ("GA4 - Leads - Envio Formulário Contacto").

## 3. Conversão Google Ads — DECISÃO PENDENTE (não criar às cegas)
> ⚠️ Que conta Google Ads deve receber as conversões da LP Elmafe?
> As `awct` deste container escrevem em AW-18114358140 (SPLW). A Elmafe partilha a
> conta 3844807770 com a SPLW desde 2026-05-05 — confirmar o ID/label de conversão
> correto antes de criar a tag `awct` da LP.

## Como executar (dois desbloqueios do Bruno)
- **Writes GTM via MCP:** exigem `CLAUDE_PROFILE=mutations-paused` no arranque do
  Claude Code (o processo MCP herda o env ao arrancar; não muda a meio da sessão).
  Relançar com esse env → o Claude cria trigger + tag GA4 nos IDs acima.
  Alternativa: criar à mão na UI do GTM (workspace 9), 2 objetos.
- **Meta Pixel:** a Elmafe **não** tem pixel implementado neste container (só
  Google/GA4). A LP não dispara evento Meta. Se se quiser CAPI/Pixel, é setup à parte.
