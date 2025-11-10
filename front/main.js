// --- Validadores ---
const validators = {
  code: (v) => /^\d+$/.test(String(v || '').trim()),
  nombre: (v) => String(v || '').trim().length >= 2,
  apellido: (v) => String(v || '').trim().length >= 2,
  tipo: (v) => ['permanente','parcial'].includes(String(v || '').trim().toLowerCase())
};

function setError(name, message){
  const el = document.getElementById(name + 'Error');
  if (el) el.textContent = message || '';
}

function validateField(name, value){
  if(!validators[name]) return true;
  const ok = validators[name](value);
  if(!ok){
    const msgs = {
      code: 'Código inválido. Sólo letras, números y guiones (mín 3 caracteres).',
      nombre: 'El nombre debe tener al menos 2 caracteres.',
      apellido: 'El apellido debe tener al menos 2 caracteres.',
      tipo: 'Selecciona un tipo de afiliado.'
    };
    setError(name, msgs[name]);
  } else setError(name, '');
  return ok;
}

// --- Lógica principal ---
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('affiliateForm');
  const statusEl = document.getElementById('status');
  const out = document.getElementById('out');
  const formCard = document.getElementById('formCard');
  const listView = document.getElementById('listView');
  const listContainer = document.getElementById('listContainer');
  const successModal = document.getElementById('successModal');

  ['code','nombre','apellido','tipo'].forEach(name => {
    const el = document.getElementById(name);
    el.addEventListener('input', () => validateField(name, el.value));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'validando...';

    const data = {
      code: form.code.value.trim(),
      nombre: form.nombre.value.trim(),
      apellido: form.apellido.value.trim(),
      tipo: form.tipo.value.trim()
    };

    let allOk = true;
    Object.entries(data).forEach(([k, v]) => { if(!validateField(k, v)) allOk = false; });

    if(!allOk){
      statusEl.textContent = 'corrige los errores';
      return;
    }

    // Muestra payload en la UI (mapeado a backend)
    const payload = {
      numero_afiliado: parseInt(data.code, 10),
      nombre: data.nombre,
      apellido: data.apellido,
      tipo: String(data.tipo).toLowerCase()
    };
    out.textContent = JSON.stringify(payload, null, 2);
    statusEl.textContent = 'enviando...';

    try {
      const resp = await fetch('/afiliados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const body = await resp.json().catch(() => ({}));
      if (resp.ok) {
        statusEl.textContent = 'éxito — afiliación creada';
        successModal.classList.remove('hidden');
        form.reset();
        out.textContent = '{}';
        ['code','nombre','apellido','tipo'].forEach((n)=> setError(n, ''));
      } else {
        statusEl.textContent = 'error — ' + (body.error || body.mensaje || 'creación fallida');
      }
      out.textContent = JSON.stringify({ request: payload, response: body }, null, 2);
    } catch (err) {
      console.error(err);
      statusEl.textContent = 'error de red';
    }
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    form.reset();
    out.textContent = '{}';
    ['codeError','nombreError','apellidoError','tipoError'].forEach(id => setError(id.replace('Error',''), ''));
    statusEl.textContent = 'listo';
  });

  document.getElementById('closeModalBtn').addEventListener('click', () => {
    successModal.classList.add('hidden');
  });

  document.getElementById('viewListBtn').addEventListener('click', async () => {
    statusEl.textContent = 'cargando lista...';
    try {
      const resp = await fetch('/afiliados');
      const lista = await resp.json();
      renderList(lista, listContainer);
      formCard.classList.add('hidden');
      listView.classList.remove('hidden');
      statusEl.textContent = 'listo';
    } catch (err) {
      statusEl.textContent = 'Error al cargar lista';
    }
  });

  document.getElementById('backToFormBtn').addEventListener('click', () => {
    listView.classList.add('hidden');
    formCard.classList.remove('hidden');
  });
});

function renderList(lista, container){
  if (!Array.isArray(lista) || lista.length === 0){
    container.innerHTML = '<p>No hay afiliados registrados aún.</p>';
    return;
  }
  const rows = lista.map(a => `
    <tr>
      <td>${a.numero_afiliado}</td>
      <td>${a.nombre}</td>
      <td>${a.apellido}</td>
      <td>${a.tipo}</td>
    </tr>
  `).join('');
  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Número</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}