import { formatarMoeda, formatarTelefone, escapeHtml } from '../utils/formatters.js';

const CORES_CATEGORIA = {
    'Alimentação' : 'success',
    'Tecnologia': 'info',
    'Artesanato': 'warning',
    'Serviços Gerais': 'primary',
    'Turismo': 'secondary'
    
};

export function renderizarCards(servicos, containerElement) {
  if (!servicos || servicos.length === 0) {
    containerElement.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-inbox fs-1 text-muted"></i>
        <h5 class="text-muted mt-2">Nenhum serviço cadastrado nesta categoria.</h5>
      </div>`;
    return;
  }


  containerElement.innerHTML = servicos.map(s => `
    <div class="col-md-6 col-lg-4 mb-4">
      <div class="card h-100 shadow-sm border-0 vitrine-card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="badge bg-success">${escapeHtml(s.categoria)}</span>
            <span class="fw-bold text-primary">${formatarMoeda(s.precoBase)}</span>
          </div>
          <h5 class="card-title fw-bold mb-1">${escapeHtml(s.nome)}</h5>
          <h6 class="text-muted small mb-3"><i class="bi bi-geo-alt-fill text-danger me-1"></i>${escapeHtml(s.localizacao)}</h6> <!-- ⚠️ campo cortado -->
          <p class="card-text text-secondary small">${escapeHtml(s.descricao)}</p>
        </div>
        <div class="card-footer bg-transparent border-0 pt-0 pb-3 d-flex justify-content-between"> <!-- ⚠️ classes cortadas -->
          <a href="https://wa.me/55${(s.telefone || '').replace(/\D/g, '')}" target="_blank" class="btn btn-sm btn-success"> <!-- ⚠️ classes cortadas -->
            <i class="bi bi-whatsapp me-1"></i>${formatarTelefone(s.telefone)}
          </a>
          <button class="btn btn-sm btn-outline-danger btn-excluir" data-id="${s.id}" title="Excluir"> <!-- ⚠️ title cortado -->
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

export function exibirToast(mensagem, tipo = 'success') {
  const toastEl = document.getElementById('toastNotificacao');
  const toastBody = document.getElementById('toastMensagem');
  if (toastEl && toastBody) {
    toastBody.innerText = mensagem;
 
  }
}