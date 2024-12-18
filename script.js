// Obtener elementos de inicio de sesión
const loginOverlay = document.getElementById('loginOverlay');
const authForm = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Variable para almacenar el usuario autenticado
let loggedInUser = null;

// Variables para recordar el estado previo
let previouslyVisibleForm = null;

// Variable global para almacenar los usuarios en memoria
let usersData = [];

// Función para cargar los usuarios desde localStorage
function loadUsers() {
    usersData = JSON.parse(localStorage.getItem('userList')) || [];
    renderUserList();
}

// Función para renderizar la lista de usuarios en la interfaz
function renderUserList() {
    userList.innerHTML = '';
    usersData.forEach((userData, index) => {
        // Agregar a la lista
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${userData.username} (${userData.email}) - ${userData.role}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-user-button');
        editButton.addEventListener('click', () => editUser(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteUser(index));

        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        userList.appendChild(li);
    });
}

// Manejar el envío del formulario de autenticación
authForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Buscar el usuario en la lista
    const user = usersData.find(u => u.username === username && u.password === password);

    if (user) {
        // Establecer el usuario autenticado
        loggedInUser = user.username;

        // Ocultar la pantalla de inicio de sesión
        loginOverlay.style.display = 'none';

        // Mostrar u ocultar los botones según el rol del usuario
        if (user.role === 'administrador') {
            toggleFormButton.style.display = 'block';
            // Los botones están ocultos por defecto
        } else {
            toggleFormButton.style.display = 'none';
            toggleUploadFormButton.style.display = 'none';
            toggleManageFormButton.style.display = 'none';
            toggleUserFormButton.style.display = 'none';
            toggleIssueFormButton.style.display = 'none'; // Ocultar el nuevo botón para miembros
        }
    } else if ((username === 'ADM' || username === 'deloitte') && password === '1234') {
        // Usuarios predefinidos
        loggedInUser = username;

        // Ocultar la pantalla de inicio de sesión
        loginOverlay.style.display = 'none';

        // Mostrar botones de administrador
        toggleFormButton.style.display = 'block';
    } else {
        // Mostrar mensaje de error
        errorMessage.textContent = 'Usuário ou senha incorretos.';
        errorMessage.style.display = 'block';
    }
});

// Obtener referencias a los elementos principales
const toggleButton = document.getElementById('toggleButton');
const iframe1 = document.getElementById('iframe1');
const iframe2 = document.getElementById('iframe2');
const pdfViewer = document.getElementById('pdfViewer');
const togglePdfButton = document.getElementById('togglePdfButton');
const toggleFormButton = document.getElementById('toggleFormButton');
const toggleUploadFormButton = document.getElementById('toggleUploadFormButton');
const toggleManageFormButton = document.getElementById('toggleManageFormButton');
const toggleUserFormButton = document.getElementById('toggleUserFormButton');
const toggleIssueFormButton = document.getElementById('toggleIssueFormButton');
const iframe1Menu = document.getElementById('iframe1Menu');
const iframe2Menu = document.getElementById('iframe2Menu');
const iframe1MenuButton = document.getElementById('iframe1MenuButton');
const iframe2MenuButton = document.getElementById('iframe2MenuButton');
const iframe1MenuContent = document.getElementById('iframe1MenuContent');
const iframe2MenuContent = document.getElementById('iframe2MenuContent');
const addLinkFormContainer = document.getElementById('addLinkFormContainer');
const uploadPdfFormContainer = document.getElementById('uploadPdfFormContainer');
const userFormContainer = document.getElementById('userFormContainer');
const issueFormContainer = document.getElementById('issueFormContainer');

// Inicialmente mostrar solo iframe1
iframe1.style.display = 'block';
iframe2.style.display = 'none';
pdfViewer.style.display = 'none'; // Ocultar el visor PDF por defecto

// Ocultar menú del iframe2 inicialmente
iframe2Menu.style.display = 'none';

// Ocultar los botones del formulario por defecto
toggleFormButton.style.display = 'none';
toggleUserFormButton.style.display = 'none'; // Nuevo botón
toggleUploadFormButton.style.display = 'none';
toggleManageFormButton.style.display = 'none';
toggleIssueFormButton.style.display = 'none'; // Nuevo botón

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

// Event listener para el botón 'DUP'
toggleButton.addEventListener('click', () => {
    if (window.getComputedStyle(iframe2).display === 'none') {
        iframe2.style.display = 'block';
        iframe2Menu.style.display = 'block'; // Mostrar menú del iframe2
        iframe1.style.width = '50%';
        iframe2.style.width = '50%';
        pdfViewer.style.display = 'none';
        togglePdfButton.style.display = 'none';
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

// Event listener para el botón del visor PDF
togglePdfButton.addEventListener('click', () => {
    if (window.getComputedStyle(pdfViewer).display === 'none') {
        pdfViewer.style.display = 'block';
        iframe1.style.width = '50%';
        pdfViewer.style.width = '50%';
        iframe2.style.display = 'none';
        iframe2Menu.style.display = 'none'; // Ocultar menú del iframe2
        togglePdfButton.style.display = 'block';
        document.getElementById('container').classList.add('horizontal-split');
    } else {
        pdfViewer.style.display = 'none';
        iframe1.style.width = '100%';
        togglePdfButton.style.display = 'block';
        document.getElementById('container').classList.remove('horizontal-split');
    }
    adjustLayout(); // Ajustar layout después de mostrar u ocultar el visor PDF
});

// Event listener para el botón que alterna los botones de formularios
toggleFormButton.addEventListener('click', () => {
    if (toggleUploadFormButton.style.display === 'none' && toggleManageFormButton.style.display === 'none' && toggleUserFormButton.style.display === 'none' && toggleIssueFormButton.style.display === 'none') {
        // Mostrar los botones
        toggleUploadFormButton.style.display = 'block';
        toggleManageFormButton.style.display = 'block';
        toggleUserFormButton.style.display = 'block';
        toggleIssueFormButton.style.display = 'block'; // Mostrar el nuevo botón
        // Mostrar el formulario de gestión de enlaces por defecto
        addLinkFormContainer.style.display = 'block';
        uploadPdfFormContainer.style.display = 'none';
        userFormContainer.style.display = 'none';
        issueFormContainer.style.display = 'none';
        previouslyVisibleForm = 'addLink';
    } else {
        // Ocultar los botones
        toggleUploadFormButton.style.display = 'none';
        toggleManageFormButton.style.display = 'none';
        toggleUserFormButton.style.display = 'none';
        toggleIssueFormButton.style.display = 'none'; // Ocultar el nuevo botón
        // Ocultar formularios
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
        userFormContainer.style.display = 'none';
        issueFormContainer.style.display = 'none';
        previouslyVisibleForm = null;
    }
});

// Event listener para el botón que alterna el formulario de gestionar enlaces
toggleManageFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(addLinkFormContainer).display === 'none') {
        addLinkFormContainer.style.display = 'block';
        uploadPdfFormContainer.style.display = 'none'; // Ocultar formulario de subir PDF si está visible
        userFormContainer.style.display = 'none'; // Ocultar formulario de usuarios si está visible
        issueFormContainer.style.display = 'none'; // Ocultar formulario de incidencias si está visible
        previouslyVisibleForm = 'addLink';
    } else {
        addLinkFormContainer.style.display = 'block';
        previouslyVisibleForm = 'addLink';
    }
});

// Event listener para el botón que alterna el formulario de subir PDF
toggleUploadFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(uploadPdfFormContainer).display === 'none') {
        uploadPdfFormContainer.style.display = 'block';
        addLinkFormContainer.style.display = 'none'; // Ocultar formulario de enlaces si está visible
        userFormContainer.style.display = 'none'; // Ocultar formulario de usuarios si está visible
        issueFormContainer.style.display = 'none'; // Ocultar formulario de incidencias si está visible
        previouslyVisibleForm = 'uploadPdf';
    } else {
        uploadPdfFormContainer.style.display = 'block';
        previouslyVisibleForm = 'uploadPdf';
    }
});

// Event listener para el botón que alterna el formulario de gestionar usuarios
toggleUserFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(userFormContainer).display === 'none') {
        userFormContainer.style.display = 'block';
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
        issueFormContainer.style.display = 'none'; // Ocultar formulario de incidencias si está visible
        previouslyVisibleForm = 'userForm';
    } else {
        userFormContainer.style.display = 'block';
        previouslyVisibleForm = 'userForm';
    }
});

// Event listener para el botón que alterna el formulario de gestionar incidencias
toggleIssueFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(issueFormContainer).display === 'none') {
        issueFormContainer.style.display = 'block';
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
        userFormContainer.style.display = 'none';
        previouslyVisibleForm = 'issueForm';
    } else {
        issueFormContainer.style.display = 'block';
        previouslyVisibleForm = 'issueForm';
    }
});

// Obtener elementos relacionados con el formulario de subir PDF
const uploadPdfForm = document.getElementById('uploadPdfForm');
const pdfFileInput = document.getElementById('pdfFile');
const uploadMessage = document.getElementById('uploadMessage');
const cancelUploadButton = document.getElementById('cancelUploadButton');

// Event listener para el botón de cancelar en el formulario de subir PDF
cancelUploadButton.addEventListener('click', () => {
    uploadPdfFormContainer.style.display = 'none';
    pdfFileInput.value = '';
    uploadMessage.textContent = '';
    previouslyVisibleForm = null;
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
        previouslyVisibleForm = null;
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
            iframe1.style.height = window.getComputedStyle(iframe2).display === 'block' ? '50%' : '100%';
            iframe2.style.width = '100%';
            iframe2.style.height = window.getComputedStyle(iframe2).display === 'block' ? '50%' : '0';
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

// Obtener elementos del formulario de gestionar usuarios
const userForm = document.getElementById('userForm');
const userEmailInput = document.getElementById('userEmail');
const userUsernameInput = document.getElementById('userUsername');
const userPasswordInput = document.getElementById('userPassword');
const userRoleSelect = document.getElementById('userRole');
const userMessage = document.getElementById('userMessage');
const userList = document.getElementById('userList');
const updateUserButton = document.getElementById('updateUserButton');
const cancelUserEditButton = document.getElementById('cancelUserEditButton');

let editUserIndex = null; // Variable para saber si estamos editando un usuario

// Manejar el envío del formulario de usuarios
userForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userEmail = userEmailInput.value.trim();
    const userUsername = userUsernameInput.value.trim();
    const userPassword = userPasswordInput.value.trim();
    const userRole = userRoleSelect.value;

    if (userEmail === '' || userUsername === '' || userPassword === '' || userRole === '') {
        userMessage.textContent = 'Por favor, completa todos los campos.';
        userMessage.style.color = 'red';
        return;
    }

    if (editUserIndex !== null) {
        // Actualizar el usuario existente
        updateExistingUser(userEmail, userUsername, userPassword, userRole);
    } else {
        // Agregar un nuevo usuario
        addNewUser(userEmail, userUsername, userPassword, userRole);
    }

    // Limpiar los campos del formulario
    userEmailInput.value = '';
    userUsernameInput.value = '';
    userPasswordInput.value = '';
    userRoleSelect.value = 'miembro';
    editUserIndex = null;
    updateUserButton.style.display = 'none';
    cancelUserEditButton.style.display = 'none';
    userForm.querySelector('button[type="submit"]').style.display = 'block';

    userMessage.textContent = '';
});

// Función para agregar un nuevo usuario
function addNewUser(userEmail, userUsername, userPassword, userRole) {
    // Agregar el usuario a la lista en memoria
    usersData.push({
        email: userEmail,
        username: userUsername,
        password: userPassword,
        role: userRole
    });

    // Guardar y actualizar la interfaz
    saveUsers();
    renderUserList();

    userMessage.textContent = 'Usuario agregado exitosamente.';
    userMessage.style.color = 'green';
}

// Función para editar un usuario
function editUser(index) {
    editUserIndex = index;
    const userData = usersData[index];

    userEmailInput.value = userData.email;
    userUsernameInput.value = userData.username;
    userPasswordInput.value = userData.password;
    userRoleSelect.value = userData.role;

    userForm.querySelector('button[type="submit"]').style.display = 'none';
    updateUserButton.style.display = 'block';
    cancelUserEditButton.style.display = 'block';
}

// Función para actualizar un usuario existente
function updateExistingUser(userEmail, userUsername, userPassword, userRole) {
    // Actualizar en la lista en memoria
    usersData[editUserIndex] = {
        email: userEmail,
        username: userUsername,
        password: userPassword,
        role: userRole
    };

    // Guardar y actualizar la interfaz
    saveUsers();
    renderUserList();

    userMessage.textContent = 'Usuario actualizado exitosamente.';
    userMessage.style.color = 'green';
}

// Event listener para el botón de actualizar usuario
updateUserButton.addEventListener('click', () => {
    userForm.dispatchEvent(new Event('submit'));
});

// Event listener para cancelar la edición de usuario
cancelUserEditButton.addEventListener('click', () => {
    userEmailInput.value = '';
    userUsernameInput.value = '';
    userPasswordInput.value = '';
    userRoleSelect.value = 'miembro';
    editUserIndex = null;
    updateUserButton.style.display = 'none';
    cancelUserEditButton.style.display = 'none';
    userForm.querySelector('button[type="submit"]').style.display = 'block';
    userMessage.textContent = '';
});

// Función para eliminar un usuario
function deleteUser(index) {
    // Eliminar del almacenamiento en memoria
    usersData.splice(index, 1);

    // Guardar y actualizar la interfaz
    saveUsers();
    renderUserList();

    userMessage.textContent = 'Usuario eliminado exitosamente.';
    userMessage.style.color = 'green';
}

// Función para guardar los usuarios en localStorage
function saveUsers() {
    localStorage.setItem('userList', JSON.stringify(usersData));
}

// Llamar a loadUsers() al cargar la página
loadUsers();

// Variables para gestionar incidencias
let issuesData = [];

// Función para cargar las incidencias desde localStorage
function loadIssues() {
    issuesData = JSON.parse(localStorage.getItem('issueList')) || [];
    renderIssueList();
}

// Función para renderizar la lista de incidencias en la interfaz
function renderIssueList() {
    issueList.innerHTML = '';
    issuesData.forEach((issueData, index) => {
        const li = document.createElement('li');

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('issue-details');
        detailsDiv.innerHTML = `
            <strong>${issueData.title}</strong><br>
            Tipo: ${issueData.type}<br>
            Estado: ${issueData.status}<br>
            Prioridad: ${issueData.priority}<br>
            Creador: ${issueData.creator}<br>
            Responsable: ${issueData.responsible}<br>
            Fecha de Creación: ${issueData.creationDate}<br>
            Fecha de Vencimiento: ${issueData.dueDate}<br>
            Disciplinas: ${issueData.discipline}<br>
            Causas: ${issueData.cause}<br>
            Descripción: ${issueData.description}
        `;

        if (issueData.screenshot) {
            const img = document.createElement('img');
            img.src = issueData.screenshot;
            img.alt = 'Captura de pantalla';
            img.style.maxWidth = '100%';
            img.style.marginTop = '10px';
            detailsDiv.appendChild(img);
        }

        const buttonsDiv = document.createElement('div');
        buttonsDiv.style.display = 'flex';

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-issue-button');
        editButton.addEventListener('click', () => editIssue(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteIssue(index));

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        li.appendChild(detailsDiv);
        li.appendChild(buttonsDiv);

        issueList.appendChild(li);
    });
}

// Obtener elementos del formulario de incidencias
const issueForm = document.getElementById('issueForm');
const issueTitleInput = document.getElementById('issueTitle');
const issueTypeInput = document.getElementById('issueType');
const issueStatusInput = document.getElementById('issueStatus');
const issuePriorityInput = document.getElementById('issuePriority');
const issueCreatorInput = document.getElementById('issueCreator');
const issueResponsibleInput = document.getElementById('issueResponsible');
const issueCreationDateInput = document.getElementById('issueCreationDate');
const issueDueDateInput = document.getElementById('issueDueDate');
const issueDisciplineInput = document.getElementById('issueDiscipline');
const issueCauseInput = document.getElementById('issueCause');
const issueDescriptionInput = document.getElementById('issueDescription');
const issueScreenshotInput = document.getElementById('issueScreenshot');
const issueMessage = document.getElementById('issueMessage');
const issueList = document.getElementById('issueList');
const updateIssueButton = document.getElementById('updateIssueButton');
const cancelIssueEditButton = document.getElementById('cancelIssueEditButton');

let editIssueIndex = null; // Variable para saber si estamos editando una incidencia

// Manejar el envío del formulario de incidencias
issueForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const issueData = {
        title: issueTitleInput.value.trim(),
        type: issueTypeInput.value.trim(),
        status: issueStatusInput.value.trim(),
        priority: issuePriorityInput.value.trim(),
        creator: issueCreatorInput.value.trim(),
        responsible: issueResponsibleInput.value.trim(),
        creationDate: issueCreationDateInput.value,
        dueDate: issueDueDateInput.value,
        discipline: issueDisciplineInput.value.trim(),
        cause: issueCauseInput.value.trim(),
        description: issueDescriptionInput.value.trim(),
        screenshot: null
    };

    if (issueScreenshotInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            issueData.screenshot = e.target.result;
            processIssueData(issueData);
        };
        reader.readAsDataURL(issueScreenshotInput.files[0]);
    } else {
        processIssueData(issueData);
    }
});

function processIssueData(issueData) {
    if (editIssueIndex !== null) {
        // Actualizar la incidencia existente
        issuesData[editIssueIndex] = issueData;
        issueMessage.textContent = 'Incidencia actualizada exitosamente.';
        issueMessage.style.color = 'green';
    } else {
        // Agregar una nueva incidencia
        issuesData.push(issueData);
        issueMessage.textContent = 'Incidencia agregada exitosamente.';
        issueMessage.style.color = 'green';
    }

    // Limpiar los campos del formulario
    issueForm.reset();
    editIssueIndex = null;
    updateIssueButton.style.display = 'none';
    cancelIssueEditButton.style.display = 'none';
    issueForm.querySelector('button[type="submit"]').style.display = 'block';

    // Guardar y actualizar la interfaz
    saveIssues();
    renderIssueList();
}

// Event listener para el botón de actualizar incidencia
updateIssueButton.addEventListener('click', () => {
    issueForm.dispatchEvent(new Event('submit'));
});

// Event listener para cancelar la edición de incidencia
cancelIssueEditButton.addEventListener('click', () => {
    issueForm.reset();
    editIssueIndex = null;
    updateIssueButton.style.display = 'none';
    cancelIssueEditButton.style.display = 'none';
    issueForm.querySelector('button[type="submit"]').style.display = 'block';
    issueMessage.textContent = '';
});

// Función para editar una incidencia
function editIssue(index) {
    editIssueIndex = index;
    const issueData = issuesData[index];

    issueTitleInput.value = issueData.title;
    issueTypeInput.value = issueData.type;
    issueStatusInput.value = issueData.status;
    issuePriorityInput.value = issueData.priority;
    issueCreatorInput.value = issueData.creator;
    issueResponsibleInput.value = issueData.responsible;
    issueCreationDateInput.value = issueData.creationDate;
    issueDueDateInput.value = issueData.dueDate;
    issueDisciplineInput.value = issueData.discipline;
    issueCauseInput.value = issueData.cause;
    issueDescriptionInput.value = issueData.description;

    issueForm.querySelector('button[type="submit"]').style.display = 'none';
    updateIssueButton.style.display = 'block';
    cancelIssueEditButton.style.display = 'block';

    // Mostrar el formulario si no está visible
    issueFormContainer.style.display = 'block';
    previouslyVisibleForm = 'issueForm';
}

// Función para eliminar una incidencia
function deleteIssue(index) {
    issuesData.splice(index, 1);
    saveIssues();
    renderIssueList();
    issueMessage.textContent = 'Incidencia eliminada exitosamente.';
    issueMessage.style.color = 'green';
}

// Función para guardar las incidencias en localStorage
function saveIssues() {
    localStorage.setItem('issueList', JSON.stringify(issuesData));
}

// Llamar a loadIssues() al cargar la página
loadIssues();
