// Obtener elementos de inicio de sesión
const loginOverlay = document.getElementById('loginOverlay');
const authForm = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Variable para almacenar el usuario autenticado
let loggedInUser = null;

// Manejar el envío del formulario de autenticación
authForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Verificar las credenciales
    if ((username === 'ADM' || username === 'deloitte') && password === '1234') {
        // Establecer el usuario autenticado
        loggedInUser = username;

        // Ocultar la pantalla de inicio de sesión
        loginOverlay.style.display = 'none';

        // Mostrar u ocultar los botones según el usuario
        if (loggedInUser === 'deloitte') {
            toggleFormButton.style.display = 'block';
            // Los botones UPLOAD.png y MANAGE.png están ocultos por defecto y solo se mostrarán al interactuar con FORM.png
        } else {
            toggleFormButton.style.display = 'none';
            toggleUploadFormButton.style.display = 'none'; // Asegurar que esté oculto
            toggleManageFormButton.style.display = 'none'; // Asegurar que esté oculto
        }
    } else {
        // Mostrar mensaje de error
        errorMessage.textContent = 'Usuário ou senha incorretos.';
        errorMessage.style.display = 'block';
    }
});

// Obtener referencias a los elementos principales
const toggleButton = document.getElementById('toggleButton'); // DUP.png
const iframe1 = document.getElementById('iframe1');
const iframe2 = document.getElementById('iframe2');
const pdfViewer = document.getElementById('pdfViewer');
const togglePdfButton = document.getElementById('togglePdfButton'); // PDF.png
const toggleFormButton = document.getElementById('toggleFormButton'); // FORM.png
const toggleUploadFormButton = document.getElementById('toggleUploadFormButton'); // UPLOAD.png
const toggleManageFormButton = document.getElementById('toggleManageFormButton'); // MANAGE.png
const iframe1Menu = document.getElementById('iframe1Menu');
const iframe2Menu = document.getElementById('iframe2Menu');
const iframe1MenuButton = document.getElementById('iframe1MenuButton');
const iframe2MenuButton = document.getElementById('iframe2MenuButton');
const iframe1MenuContent = document.getElementById('iframe1MenuContent');
const iframe2MenuContent = document.getElementById('iframe2MenuContent');
const addLinkFormContainer = document.getElementById('addLinkFormContainer');

// Inicialmente mostrar solo iframe1
iframe1.style.display = 'block';
iframe2.style.display = 'none';
pdfViewer.style.display = 'none'; // Ocultar el visor PDF por defecto

// Ocultar menú del iframe2 inicialmente
iframe2Menu.style.display = 'none';

// Ocultar los botones del formulario por defecto (solo 'deloitte' los verá después de iniciar sesión)
toggleFormButton.style.display = 'none';
toggleUploadFormButton.style.display = 'none'; // Asegurar que esté oculto por defecto
toggleManageFormButton.style.display = 'none'; // Asegurar que esté oculto por defecto

// Event listener para el botón del menú del iframe1
iframe1MenuButton.addEventListener('click', () => {
    iframe1Menu.classList.toggle('show');
});

// Event listener para el botón del menú del iframe2
iframe2MenuButton.addEventListener('click', () => {
    iframe2Menu.classList.toggle('show');
});

// Función para actualizar los event listeners de los menús
function updateMenuEventListeners() {
    iframe1MenuContent.querySelectorAll('a').forEach((link) => {
        link.onclick = function(event) {
            event.preventDefault();
            iframe1.src = this.href;
            iframe1Menu.classList.remove('show');
        };
    });

    iframe2MenuContent.querySelectorAll('a').forEach((link) => {
        link.onclick = function(event) {
            event.preventDefault();
            iframe2.src = this.href;
            iframe2Menu.classList.remove('show');
        };
    });
}

// Llamar a la función inicialmente
updateMenuEventListeners();

// Event listener para el botón 'DUP.png' (toggleButton)
toggleButton.addEventListener('click', () => {
    if (window.getComputedStyle(iframe2).display === 'none') {
        iframe2.style.display = 'block';
        iframe2Menu.style.display = 'block'; // Mostrar menú del iframe2
        iframe1.style.width = '50%';
        iframe2.style.width = '50%';
        pdfViewer.style.display = 'none';
        togglePdfButton.style.display = 'none';
        // Ocultar cualquier formulario visible
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
        document.getElementById('container').classList.remove('horizontal-split');
    } else {
        iframe2.style.display = 'none';
        iframe2Menu.style.display = 'none'; // Ocultar menú del iframe2
        iframe1.style.width = '100%';
        togglePdfButton.style.display = 'block';
        document.getElementById('container').classList.remove('horizontal-split');
    }
    adjustLayout(); // Ajustar layout después de mostrar u ocultar iframe2
});

// Event listener para el botón del visor PDF (togglePdfButton)
togglePdfButton.addEventListener('click', () => {
    if (window.getComputedStyle(pdfViewer).display === 'none') {
        pdfViewer.style.display = 'block';
        iframe1.style.width = '50%';
        pdfViewer.style.width = '50%';
        iframe2.style.display = 'none';
        iframe2Menu.style.display = 'none'; // Ocultar menú del iframe2
        togglePdfButton.style.display = 'block';
        // Ocultar cualquier formulario visible
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
        document.getElementById('container').classList.add('horizontal-split');
    } else {
        pdfViewer.style.display = 'none';
        iframe1.style.width = '100%';
        togglePdfButton.style.display = 'block';
        document.getElementById('container').classList.remove('horizontal-split');
    }
    adjustLayout(); // Ajustar layout después de mostrar u ocultar el visor PDF
});

// Event listener para el botón que alterna el formulario de enlaces (FORM.png)
toggleFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(addLinkFormContainer).display === 'none') {
        // Mostrar los botones UPLOAD.png y MANAGE.png
        toggleUploadFormButton.style.display = 'block';
        toggleManageFormButton.style.display = 'block';
        // Mostrar el formulario de gestión de enlaces por defecto
        addLinkFormContainer.style.display = 'block';
        // Ocultar el formulario de subir PDF si está visible
        uploadPdfFormContainer.style.display = 'none';
    } else {
        // Ocultar los botones UPLOAD.png y MANAGE.png
        toggleUploadFormButton.style.display = 'none';
        toggleManageFormButton.style.display = 'none';
        // Ocultar ambos formularios
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
    }
});

// Event listener para el botón que alterna el formulario de gestionar enlaces (MANAGE.png)
toggleManageFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(addLinkFormContainer).display === 'none') {
        // Mostrar el formulario de gestión de enlaces
        addLinkFormContainer.style.display = 'block';
        // Asegurarse de que los botones estén visibles
        toggleUploadFormButton.style.display = 'block';
        toggleManageFormButton.style.display = 'block';
        // Ocultar el formulario de subir PDF si está visible
        uploadPdfFormContainer.style.display = 'none';
    } else {
        // Ocultar el formulario de gestión de enlaces
        addLinkFormContainer.style.display = 'none';
        // Ocultar los botones UPLOAD.png y MANAGE.png
        toggleUploadFormButton.style.display = 'none';
        toggleManageFormButton.style.display = 'none';
    }
});

// Obtener elementos relacionados con el formulario de subir PDF
const uploadPdfFormContainer = document.getElementById('uploadPdfFormContainer');
const uploadPdfForm = document.getElementById('uploadPdfForm');
const pdfFileInput = document.getElementById('pdfFile');
const uploadMessage = document.getElementById('uploadMessage');
const cancelUploadButton = document.getElementById('cancelUploadButton');

// Event listener para alternar la visibilidad del formulario de subir PDF (UPLOAD.png)
toggleUploadFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(uploadPdfFormContainer).display === 'none') {
        // Mostrar el formulario de subir PDF
        uploadPdfFormContainer.style.display = 'block';
        // Asegurarse de que los botones estén visibles
        toggleUploadFormButton.style.display = 'block';
        toggleManageFormButton.style.display = 'block';
        // Ocultar el formulario de gestión de enlaces si está visible
        addLinkFormContainer.style.display = 'none';
    } else {
        // Ocultar el formulario de subir PDF
        uploadPdfFormContainer.style.display = 'none';
    }
});

// Event listener para el botón de cancelar en el formulario de subir PDF
cancelUploadButton.addEventListener('click', () => {
    uploadPdfFormContainer.style.display = 'none';
    pdfFileInput.value = '';
    uploadMessage.textContent = '';
});

// Manejar el envío del formulario de subir PDF
uploadPdfForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const file = pdfFileInput.files[0];

    if (!file) {
        uploadMessage.textContent = 'Por favor, seleccione un archivo PDF.';
        uploadMessage.style.color = 'red';
        return;
    }

    if (file.type !== 'application/pdf') {
        uploadMessage.textContent = 'El archivo seleccionado no es un PDF.';
        uploadMessage.style.color = 'red';
        return;
    }

    const fileURL = URL.createObjectURL(file);
    pdfViewer.src = fileURL;

    uploadMessage.textContent = 'PDF cargado exitosamente.';
    uploadMessage.style.color = 'green';

    // Cerrar el formulario después de un breve retraso
    setTimeout(() => {
        uploadPdfFormContainer.style.display = 'none';
        uploadMessage.textContent = '';
    }, 2000);
});

// Función para ajustar el layout
function adjustLayout() {
    const isMobile = window.innerWidth <= 1300;
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isMobile) {
        // En modo móvil, ocultamos el visor PDF y su botón
        pdfViewer.style.display = 'none';
        togglePdfButton.style.display = 'none';

        if (isPortrait) {
            // En orientación vertical, iframes dividen la altura
            iframe1.style.width = '100%';
            iframe1.style.height = (window.getComputedStyle(iframe2).display === 'block') ? '50%' : '100%';
            iframe2.style.width = '100%';
            iframe2.style.height = (window.getComputedStyle(iframe2).display === 'block') ? '50%' : '0';
        } else {
            // En orientación horizontal, mostrar u ocultar iframe2 según su estado actual
            if (window.getComputedStyle(iframe2).display === 'block') {
                iframe1.style.width = '50%';
                iframe1.style.height = '100%';
                iframe2.style.width = '50%';
                iframe2.style.height = '100%';
            } else {
                iframe1.style.width = '100%';
                iframe1.style.height = '100%';
                iframe2.style.width = '0';
                iframe2.style.height = '0';
            }
        }
    } else {
        // En modo escritorio, los elementos ocupan toda la altura y se distribuyen por el ancho
        iframe1.style.height = '100%';
        togglePdfButton.style.display = 'block';

        if (window.getComputedStyle(iframe2).display === 'block') {
            iframe1.style.width = '50%';
            iframe2.style.width = '50%';
            iframe2.style.height = '100%';
            pdfViewer.style.display = 'none';
        } else if (window.getComputedStyle(pdfViewer).display === 'block') {
            iframe1.style.width = '50%';
            pdfViewer.style.width = '50%';
            iframe2.style.height = '0';
            iframe2.style.display = 'none';
        } else {
            iframe1.style.width = '100%';
            iframe2.style.height = '0';
            iframe2.style.display = 'none';
            pdfViewer.style.display = 'none';
        }
    }

    // Asegurar que los menús no afecten la posición de los botones
    iframe1Menu.style.position = 'fixed';
    iframe2Menu.style.position = 'fixed';
}

window.addEventListener('resize', adjustLayout);
window.addEventListener('orientationchange', adjustLayout);
adjustLayout();

// Cerrar el menú si el usuario hace clic fuera de él
window.addEventListener('click', function(event) {
    if (!event.target.closest('#iframe1MenuButton')) {
        iframe1Menu.classList.remove('show');
    }
    if (!event.target.closest('#iframe2MenuButton')) {
        iframe2Menu.classList.remove('show');
    }
});

// Obtener elementos del formulario de agregar enlaces
const addLinkForm = document.getElementById('addLinkForm');
const linkTextInput = document.getElementById('linkText');
const linkURLInput = document.getElementById('linkURL');
const addLinkMessage = document.getElementById('addLinkMessage');
const linkList = document.getElementById('linkList');
const updateLinkButton = document.getElementById('updateLinkButton');
const cancelEditButton = document.getElementById('cancelEditButton');

let editIndex = null; // Variable para saber si estamos editando un enlace

// Manejar el envío del formulario para agregar o actualizar enlaces
addLinkForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const linkText = linkTextInput.value.trim();
    const linkURL = linkURLInput.value.trim();

    if (linkText === '' || linkURL === '') {
        addLinkMessage.textContent = 'Por favor, completa todos los campos.';
        addLinkMessage.style.color = 'red';
        return;
    }

    if (editIndex !== null) {
        // Actualizar el enlace existente
        updateExistingLink(linkText, linkURL);
    } else {
        // Agregar un nuevo enlace
        addNewLink(linkText, linkURL);
    }

    // Limpiar los campos del formulario
    linkTextInput.value = '';
    linkURLInput.value = '';
    editIndex = null;
    updateLinkButton.style.display = 'none';
    cancelEditButton.style.display = 'none';
    addLinkForm.querySelector('button[type="submit"]').style.display = 'block';

    // Guardar los enlaces en localStorage
    saveLinks();
});

// Función para agregar un nuevo enlace
function addNewLink(linkText, linkURL) {
    // Crear nuevos elementos de enlace
    const newLink1 = document.createElement('a');
    newLink1.href = linkURL;
    newLink1.textContent = linkText;

    const newLink2 = newLink1.cloneNode(true);

    // Agregar el enlace a ambos menús
    iframe1MenuContent.appendChild(newLink1);
    iframe2MenuContent.appendChild(newLink2);

    // Actualizar los event listeners
    updateMenuEventListeners();

    // Agregar a la lista de enlaces
    addLinkToList(linkText, linkURL);

    addLinkMessage.textContent = 'Enlace agregado exitosamente.';
    addLinkMessage.style.color = 'green';
}

// Función para actualizar un enlace existente
function updateExistingLink(linkText, linkURL) {
    // Actualizar en los menús
    const links1 = iframe1MenuContent.querySelectorAll('a');
    const links2 = iframe2MenuContent.querySelectorAll('a');

    links1[editIndex].textContent = linkText;
    links1[editIndex].href = linkURL;

    links2[editIndex].textContent = linkText;
    links2[editIndex].href = linkURL;

    // Actualizar en la lista
    const listItems = linkList.querySelectorAll('li');
    const span = listItems[editIndex].querySelector('span');
    span.textContent = linkText;

    // Actualizar los event listeners
    updateMenuEventListeners();

    addLinkMessage.textContent = 'Enlace actualizado exitosamente.';
    addLinkMessage.style.color = 'green';
}

// Función para agregar el enlace a la lista de enlaces
function addLinkToList(linkText, linkURL) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = linkText;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => editLink(li, linkText, linkURL));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteLink(li));

    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    linkList.appendChild(li);
}

// Función para editar un enlace
function editLink(li, linkText, linkURL) {
    const index = Array.from(linkList.children).indexOf(li);
    editIndex = index;

    linkTextInput.value = linkText;
    linkURLInput.value = linkURL;

    addLinkForm.querySelector('button[type="submit"]').style.display = 'none';
    updateLinkButton.style.display = 'block';
    cancelEditButton.style.display = 'block';
}

// Event listener para el botón de actualizar enlace
updateLinkButton.addEventListener('click', () => {
    addLinkForm.dispatchEvent(new Event('submit'));
});

// Event listener para cancelar la edición
cancelEditButton.addEventListener('click', () => {
    linkTextInput.value = '';
    linkURLInput.value = '';
    editIndex = null;
    updateLinkButton.style.display = 'none';
    cancelEditButton.style.display = 'none';
    addLinkForm.querySelector('button[type="submit"]').style.display = 'block';
    addLinkMessage.textContent = '';
});

// Función para eliminar un enlace
function deleteLink(li) {
    const index = Array.from(linkList.children).indexOf(li);

    // Eliminar de los menús
    iframe1MenuContent.removeChild(iframe1MenuContent.children[index]);
    iframe2MenuContent.removeChild(iframe2MenuContent.children[index]);

    // Eliminar de la lista
    linkList.removeChild(li);

    // Actualizar los event listeners
    updateMenuEventListeners();

    // Guardar los enlaces en localStorage
    saveLinks();
}

// Función para guardar los enlaces en localStorage
function saveLinks() {
    const iframe1Links = Array.from(iframe1MenuContent.querySelectorAll('a')).map(link => ({
        text: link.textContent,
        href: link.href
    }));
    const linksData = {
        iframe1Links
    };

    localStorage.setItem('menuLinks', JSON.stringify(linksData));
}

// Función para cargar los enlaces desde localStorage
function loadLinks() {
    const linksData = JSON.parse(localStorage.getItem('menuLinks'));

    if (linksData) {
        // Limpiar menús y lista existentes
        iframe1MenuContent.innerHTML = '';
        iframe2MenuContent.innerHTML = '';
        linkList.innerHTML = '';

        // Cargar enlaces en los menús y en la lista
        linksData.iframe1Links.forEach(linkData => {
            // Agregar a los menús
            const link1 = document.createElement('a');
            link1.href = linkData.href;
            link1.textContent = linkData.text;
            iframe1MenuContent.appendChild(link1);

            const link2 = document.createElement('a');
            link2.href = linkData.href;
            link2.textContent = linkData.text;
            iframe2MenuContent.appendChild(link2);

            // Agregar a la lista
            addLinkToList(linkData.text, linkData.href);
        });

        // Actualizar event listeners
        updateMenuEventListeners();
    }
}

// Llamar a loadLinks() al cargar la página
loadLinks();
