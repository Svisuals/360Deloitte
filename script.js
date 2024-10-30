// Obtener elementos de inicio de sesión
/* (código existente) */

// Resto del código existente
const toggleButton = document.getElementById('toggleButton');
const iframe1 = document.getElementById('iframe1');
const iframe2 = document.getElementById('iframe2');
const pdfViewer = document.getElementById('pdfViewer');
const togglePdfButton = document.getElementById('togglePdfButton');
const toggleFormButton = document.getElementById('toggleFormButton');
const iframe1Menu = document.getElementById('iframe1Menu');
const iframe2Menu = document.getElementById('iframe2Menu');
const iframe1MenuButton = document.getElementById('iframe1MenuButton');
const iframe2MenuButton = document.getElementById('iframe2MenuButton');
const iframe1MenuContent = document.getElementById('iframe1MenuContent');
const iframe2MenuContent = document.getElementById('iframe2MenuContent');

// Elementos para los formularios y botones A y B
const formContainer = document.getElementById('formContainer');
const buttonA = document.getElementById('buttonA');
const buttonB = document.getElementById('buttonB');
const addLinkFormContainer = document.getElementById('addLinkFormContainer');
const uploadPdfFormContainer = document.getElementById('uploadPdfFormContainer');
const uploadPdfForm = document.getElementById('uploadPdfForm');
const pdfFileInput = document.getElementById('pdfFile');
const uploadPdfMessage = document.getElementById('uploadPdfMessage');

// Inicialmente mostrar solo iframe1
iframe1.style.display = 'block';
iframe2.style.display = 'none';
pdfViewer.style.display = 'none'; // Ocultar el visor PDF por defecto

// Ocultar menú del iframe2 inicialmente
iframe2Menu.style.display = 'none';

// Ocultar el botón del formulario por defecto
toggleFormButton.style.display = 'none';

// Event listener para el botón que alterna el formulario
toggleFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(formContainer).display === 'none') {
        formContainer.style.display = 'block';
        // Por defecto, mostrar el formulario de gestión de enlaces
        addLinkFormContainer.style.display = 'block';
        uploadPdfFormContainer.style.display = 'none';
    } else {
        formContainer.style.display = 'none';
    }
});

// Event listener para botón A
buttonA.addEventListener('click', () => {
    // Mostrar formulario de gestión de enlaces, ocultar formulario de subir PDF
    addLinkFormContainer.style.display = 'block';
    uploadPdfFormContainer.style.display = 'none';
});

// Event listener para botón B
buttonB.addEventListener('click', () => {
    // Mostrar formulario de subir PDF, ocultar formulario de gestión de enlaces
    uploadPdfFormContainer.style.display = 'block';
    addLinkFormContainer.style.display = 'none';
});

// Manejar el envío del formulario para subir PDF
uploadPdfForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const file = pdfFileInput.files[0];
    if (file && file.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Almacenar el PDF como base64 en localStorage
            const pdfData = e.target.result;
            localStorage.setItem('uploadedPdf', pdfData);

            uploadPdfMessage.textContent = 'PDF subido exitosamente.';
            uploadPdfMessage.style.color = 'green';

            // Actualizar la fuente del visor PDF
            pdfViewer.src = pdfData;
        };
        reader.readAsDataURL(file);
    } else {
        uploadPdfMessage.textContent = 'Por favor, selecciona un archivo PDF válido.';
        uploadPdfMessage.style.color = 'red';
    }
});

// Función para cargar el PDF subido desde localStorage
function loadUploadedPdf() {
    const pdfData = localStorage.getItem('uploadedPdf');
    if (pdfData) {
        pdfViewer.src = pdfData;
    } else {
        // Si no hay PDF subido, usar el PDF por defecto
        pdfViewer.src = 'CRONOGRAMA.pdf';
    }
}

// Llamar a la función al cargar la página
loadUploadedPdf();

// Resto del código existente
/* (Aquí iría el resto de tu código, incluyendo los manejadores de eventos para los otros botones, los menús desplegables, y las funciones para gestionar enlaces) */
