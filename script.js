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
    const isFormVisible = addLinkFormContainer.style.display === 'block';
    if (!isFormVisible) {
        addLinkFormContainer.style.display = 'block';
        manageLinksForm.classList.add('active');
        uploadPdfForm.classList.remove('active');
    } else {
        addLinkFormContainer.style.display = 'none';
        manageLinksForm.classList.remove('active');
        uploadPdfForm.classList.remove('active');
    }
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

// ... (resto del código existente) ...
