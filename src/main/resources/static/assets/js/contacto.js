/* contacto.js */

// Función para mostrar estado en el botón
function setButtonState(btn, state, message) {
  btn.disabled = true;
  switch (state) {
    case 'loading':
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      btn.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
      break;
    case 'success':
      btn.innerHTML = '<i class="fas fa-check"></i> ' + message;
      btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
      setTimeout(() => {
        resetButton(btn);
      }, 3000);
      break;
    case 'error':
      btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> ' + message;
      btn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
      setTimeout(() => {
        resetButton(btn);
      }, 3000);
      break;
    default:
      break;
  }
}

function resetButton(btn) {
  btn.disabled = false;
  btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
  btn.style.background = '';
}

document.addEventListener('DOMContentLoaded', function () {
  // Mostrar/ocultar campo de empresa según tipo de atención
  const tipoCliente = document.getElementById('tipoCliente');
  const empresaContainer = document.getElementById('empresaContainer');
  if (tipoCliente && empresaContainer) {
    tipoCliente.addEventListener('change', function () {
      empresaContainer.style.display = this.value === 'empresa' ? 'block' : 'none';
    });
    empresaContainer.style.display = tipoCliente.value === 'empresa' ? 'block' : 'none';
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = form.querySelector('.btn-send');
      if (!btn) return;

      // Estado de carga
      setButtonState(btn, 'loading');

      // Recolectar datos
      const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        tipoCliente: document.getElementById('tipoCliente').value,
        nombreEmpresa: document.getElementById('nombreEmpresa').value,
        especialidad: document.getElementById('especialidad').value,
        tipoConsulta: document.getElementById('tipoConsulta').value,
        mensaje: document.getElementById('mensaje').value
      };

      // Validación simple
      if (!formData.nombre || !formData.apellido || !formData.correo || !formData.especialidad || !formData.tipoConsulta) {
        setButtonState(btn, 'error', 'Campos incompletos');
        return;
      }

      try {
        const API_URL = 'http://localhost:8080/api/contacto';
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          // Éxito: resetea el formulario
          form.reset();
          if (empresaContainer) empresaContainer.style.display = 'none';
          setButtonState(btn, 'success', '¡Enviado!');
        } else {
          const errorText = await response.text();
          console.error(errorText);
          setButtonState(btn, 'error', 'Error en servidor');
        }
      } catch (error) {
        console.error(error);
        setButtonState(btn, 'error', 'Error de conexión');
      }
    });
  }
});