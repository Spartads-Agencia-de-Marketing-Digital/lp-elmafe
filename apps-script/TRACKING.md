# Tracking da LP Elmafe — o que falta configurar no GTM

A LP já tem o container **GTM-5KM8Z8R2** instalado (head + noscript) e o formulário
faz `dataLayer.push({ event: 'lead_lp_elmafe', ... })` ao submeter com sucesso.

Falta criar (em **workspace draft**, sem publicar até revisão do Bruno):

## 1. Trigger — Custom Event
- **Tipo:** Evento personalizado
- **Nome do evento:** `lead_lp_elmafe`
- **Nome sugerido:** `CE - lead_lp_elmafe (LP)`

## 2. Tag — GA4 event (seguro, conta própria Elmafe)
- **Tipo:** `gaawe` (Google Analytics: GA4 Event)
- **measurementIdOverride:** `G-EZ0NBLNLYX` (propriedade GA4 da Elmafe)
- **eventName:** `generate_lead`
- **Dispara em:** trigger `CE - lead_lp_elmafe (LP)`
- Mesma estrutura da tag 17 já existente ("GA4 - Leads - Envio Formulário Contacto").

## 3. Conversão Google Ads — DECISÃO PENDENTE (não criar às cegas)
> ⚠️ As tags de conversão Google Ads deste container apontam para
> **AW-18114358140** (rotulada internamente "Conta SPLW 766-081-5784").
> Ligar leads da LP Elmafe a essa conta = atribuir conversões da Elmafe à SPLW.
>
> **Antes de criar a conversão da LP é preciso decidir:** que conta Google Ads
> deve receber as conversões da LP Elmafe? (A Elmafe partilha a conta 3844807770
> com a SPLW desde 2026-05-05 — confirmar o ID/label de conversão correto.)

## Notas
- Bloqueio de execução: os writes de GTM via MCP exigem `CLAUDE_PROFILE=mutations-paused`
  (guarda de segurança de tenant de cliente). Ficam por criar até autorização.
- Meta Pixel: a Elmafe **não** tem pixel implementado no container (só Google/GA4),
  por isso a LP não dispara evento Meta. Se se quiser CAPI/Pixel, é setup à parte.
