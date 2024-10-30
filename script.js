// ... (código existente) ...

// Obtener elementos de los botones azul y rojo
const toggleManageLinksFormButton = document.getElementById('toggleManageLinksFormButton');
const toggleUploadPdfFormButton = document.getElementById('toggleUploadPdfFormButton');

// Obtener elementos de los formularios
const addLinkFormContainer = document.getElementById('addLinkFormContainer');
const manageLinksForm = document.getElementById('manageLinksForm');
const uploadPdfForm = document.getElementById('uploadPdfForm');

// Event listener para el botón que alterna el formulario principal
toggleFormButton.addEventListener('click', () => {
    addLinkFormContainer.style.display = 'block';
    manageLinksForm.classList.add('active');
    uploadPdfForm.classList.remove('active');
});

// Event listener para el botón azul (gestionar enlaces)
toggleManageLinksFormButton.addEventListener('click', () => {
    manageLinksForm.classList.add('active');
    uploadPdfForm.classList.remove('active');
});

// Event listener para el botón rojo (cargar PDF)
toggleUploadPdfFormButton.addEventListener('click', () => {
    uploadPdfForm.classList.add('active');
    manageLinksForm.classList.remove('active');
});

// Event listener para cerrar el formulario cuando se hace clic fuera de él
window.addEventListener('click', function(event) {
    if (!event.target.closest('#addLinkFormContainer') && !event.target.closest('#toggleFormButton')) {
        addLinkFormContainer.style.display = 'none';
        manageLinksForm.classList.remove('active');
        uploadPdfForm.classList.remove('active');
    }
});

// Manejar el envío del formulario para cargar el PDF
const uploadPdfFormElement = document.getElementById('uploadPdfFormElement');
const pdfFileInput = document.getElementById('pdfFileInput');
const uploadPdfMessage = document.getElementById('uploadPdfMessage');

uploadPdfFormElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const file = pdfFileInput.files[0];

    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();

        fileReader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            // Actualizar el visor PDF con el nuevo archivo
            pdfViewer.src = url;

            uploadPdfMessage.textContent = 'PDF actualizado exitosamente.';
            uploadPdfMessage.style.color = 'green';

            // Guardar el PDF en localStorage (opcional, pero no recomendado para archivos grandes)
            // localStorage.setItem('pdfData', e.target.result);
        };

        fileReader.readAsArrayBuffer(file);
    } else {
        uploadPdfMessage.textContent = 'Por favor, selecciona un archivo PDF válido.';
        uploadPdfMessage.style.color = 'red';
    }
});

// Cargar el PDF desde localStorage al iniciar (opcional)
/*
const savedPdfData = localStorage.getItem('pdfData');
if (savedPdfData) {
    const blob = new Blob([savedPdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    pdfViewer.src = url;
}
*/

// ... (resto del código existente) ...
