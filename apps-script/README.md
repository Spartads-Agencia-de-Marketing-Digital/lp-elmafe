# Recetor de leads — Elmafe LP

Web App em Google Apps Script que recebe o formulário da landing page e escreve
na folha **Leads LP Elmafe**
(`1fC2-eCUR1U0eJp_P2i02C0HNtVrkI_9zbPZBbL7lcW0`).

Mesmo padrão das LPs Bamblue / SPLW.

## Deploy (passo manual — precisa de conta com acesso à folha)

1. Ir a https://script.google.com › **Novo projeto**.
2. Colar o conteúdo de `Code.gs` e gravar.
3. **Implementar › Nova implementação › Tipo: App Web**.
   - Executar como: **Eu** (a conta que tem acesso de escrita à folha).
   - Quem tem acesso: **Qualquer pessoa**.
4. Autorizar os âmbitos (SpreadsheetApp).
5. Copiar o **URL do /exec** que termina em `.../exec`.
6. Colar esse URL na landing page: em `index.html`, na constante
   `var LP_ENDPOINT = 'REPLACE_WITH_APPS_SCRIPT_EXEC_URL';`
   substituir pelo `/exec`. Fazer commit + redeploy no Vercel.

## Teste

- Abrir o `/exec` no browser deve devolver `{"ok":true,"service":"elmafe-lp-leads"}`.
- Submeter o formulário na LP deve criar uma linha nova na folha.

Enquanto `LP_ENDPOINT` estiver por configurar, a LP mostra o ecrã "Obrigado!" e
dispara o evento GTM `lead_lp_elmafe`, mas **não guarda o lead** (fica só no
console do browser). É preciso o /exec para persistir.
