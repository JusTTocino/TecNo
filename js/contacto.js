document.getElementById('miFormulario').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const alerta  = document.getElementById('alerta');

  alerta.className = 'alerta';

  if (nombre === '' || email === '' || mensaje === '') {
    alerta.textContent = '⚠️ Por favor completa todos los campos.';
    alerta.className = 'alerta error visible';
    return;
  } 
  
  if (!email.includes('@')) {
    alerta.textContent = '⚠️ El correo electrónico no es válido.';
    alerta.className = 'alerta error visible';
    return;
  }

  alerta.textContent = '⏳ Enviando tu mensaje...';
  alerta.className = 'alerta exito visible';

  const datosFormulario = new FormData();
  datosFormulario.append('name', nombre);
  datosFormulario.append('email', email);
  datosFormulario.append('message', mensaje);
  datosFormulario.append('_subject', 'Nuevo mensaje desde TecnoFuturo');

  fetch("https://formsubmit.co/ajax/data.losientobb@gmail.com", {
    method: "POST",
    body: datosFormulario,
    headers: {
        'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) throw new Error('Error en la respuesta de red');
    return response.json();
  })
  .then(data => {
    alerta.textContent = '✅ Tu correo fue enviado correctamente.';
    alerta.className = 'alerta exito visible';
    
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';
  })
  .catch(error => {
    alerta.textContent = '⚠️ Hubo un problema al procesar el envío. Revisa tu conexión.';
    alerta.className = 'alerta error visible';
    console.error('Error:', error);
  });
});