// Obtener elementos de inicio de sesión
// ... (código existente) ...

// Resto del código existente
// ... (código existente) ...

// Obtener elementos para el formulario y el overlay
const formOverlay = document.getElementById('formOverlay');
const addLinkFormContainer = document.getElementById('addLinkFormContainer');
const addLinkForm = document.getElementById('addLinkForm');
const linkTextInput = document.getElementById('linkText');
const linkURLInput = document.getElementById('linkURL');
const addLinkMessage = document.getElementById('addLinkMessage');
const linkList = document.getElementById('linkList');
const updateLinkButton = document.getElementById('updateLinkButton');
const cancelEditButton = document.getElementById('cancelEditButton');

let editIndex = null; // Variable para saber si estamos editando un enlace

// Event listener para el botón que alterna el formulario
toggleFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(formOverlay).display === 'none') {
        formOverlay.style.display = 'block';
    } else {
        formOverlay.style.display = 'none';
    }
});

// Cerrar el formulario y el overlay al agregar o actualizar enlaces
function closeFormOverlay() {
    formOverlay.style.display = 'none';
    // Limpiar los campos y restablecer el formulario si es necesario
    linkTextInput.value = '';
    linkURLInput.value = '';
    editIndex = null;
    updateLinkButton.style.display = 'none';
    cancelEditButton.style.display = 'none';
    addLinkForm.querySelector('button[type="submit"]').style.display = 'block';
    addLinkMessage.textContent = '';
}

// Modificar las funciones donde se cierra el formulario para llamar a closeFormOverlay()

// Por ejemplo, después de agregar o actualizar un enlace
addLinkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // ... (código existente para agregar o actualizar enlaces) ...

    // Guardar los enlaces en localStorage
    saveLinks();

    // Cerrar el overlay y restablecer el formulario
    closeFormOverlay();
});

// También modificar el botón de cancelar edición
cancelEditButton.addEventListener('click', () => {
    closeFormOverlay();
});

// Cerrar el overlay si se hace clic fuera del formulario
formOverlay.addEventListener('click', (event) => {
    if (event.target === formOverlay) {
        closeFormOverlay();
    }
});

// El resto del código JavaScript permanece igual
// ... (resto del código existente) ...
