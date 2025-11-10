// --- Validadores ---
export function validateField(name, value){
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


['code','nombre','apellido','tipo'].forEach(name => {
const el = document.getElementById(name);
el.addEventListener('input', () => validateField(name, el.value));
});


form.addEventListener('submit', (e) => {
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


out.textContent = JSON.stringify(data, null, 2);
statusEl.textContent = 'enviando...';


setTimeout(() => {
statusEl.textContent = 'éxito — afiliación creada (simulado)';
}, 700);
});


document.getElementById('resetBtn').addEventListener('click', () => {
form.reset();
out.textContent = '{}';
['codeError','nombreError','apellidoError','tipoError'].forEach(id => setError(id.replace('Error',''), ''));
statusEl.textContent = 'listo';
});
});