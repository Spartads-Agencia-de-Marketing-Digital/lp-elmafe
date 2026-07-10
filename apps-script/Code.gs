/**
 * Elmafe LP — recetor de leads (Google Apps Script Web App)
 * Recebe o POST do formulário da landing page (lp.elmafe.pt) e acrescenta
 * uma linha à folha "Leads LP Elmafe".
 *
 * Folha destino: https://docs.google.com/spreadsheets/d/1fC2-eCUR1U0eJp_P2i02C0HNtVrkI_9zbPZBbL7lcW0
 * Padrão idêntico ao usado nas LPs Bamblue / SPLW.
 */

var SHEET_ID = '1fC2-eCUR1U0eJp_P2i02C0HNtVrkI_9zbPZBbL7lcW0';
var SHEET_NAME = 'Leads';

// Ordem TEM de bater certo com o cabeçalho A1:Q1 da folha.
var COLUMNS = [
  'timestamp',
  'nome_completo',
  'empresa',
  'email_profissional',
  'telefone',
  'rea_de_interesse',              // Área de interesse
  'pas_do_projeto',                // País do projeto
  'detalhes_do_projeto_opcional',  // Detalhes do projeto
  'url',
  'referrer',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid'
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (!data.timestamp) data.timestamp = new Date().toISOString();

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    var row = COLUMNS.map(function (k) { return data[k] != null ? data[k] : ''; });
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check opcional (abrir o /exec no browser devolve isto).
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'elmafe-lp-leads' }))
    .setMimeType(ContentService.MimeType.JSON);
}
