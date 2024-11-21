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
            toggleTaskFormButton.style.display = 'block'; // Mostrar el botón de tareas
            // Los botones están ocultos por defecto
        } else {
            toggleFormButton.style.display = 'none';
            toggleUploadFormButton.style.display = 'none';
            toggleManageFormButton.style.display = 'none';
            toggleUserFormButton.style.display = 'none';
            toggleTaskFormButton.style.display = 'none'; // Ocultar el botón de tareas
        }
    } else if ((username === 'ADM' || username === 'deloitte') && password === '1234') {
        // Usuarios predefinidos
        loggedInUser = username;

        // Ocultar la pantalla de inicio de sesión
        loginOverlay.style.display = 'none';

        // Mostrar botones de administrador
        toggleFormButton.style.display = 'block';
        toggleTaskFormButton.style.display = 'block'; // Mostrar el botón de tareas
    } else {
        // Mostrar mensaje de error
        errorMessage.textContent = 'Usuario o contraseña incorrectos.';
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
const toggleTaskFormButton = document.getElementById('toggleTaskFormButton'); // Nuevo botón
const iframe1Menu = document.getElementById('iframe1Menu');
const iframe2Menu = document.getElementById('iframe2Menu');
const iframe1MenuButton = document.getElementById('iframe1MenuButton');
const iframe2MenuButton = document.getElementById('iframe2MenuButton');
const iframe1MenuContent = document.getElementById('iframe1MenuContent');
const iframe2MenuContent = document.getElementById('iframe2MenuContent');
const addLinkFormContainer = document.getElementById('addLinkFormContainer');
const uploadPdfFormContainer = document.getElementById('uploadPdfFormContainer');
const userFormContainer = document.getElementById('userFormContainer');
const taskFormContainer = document.getElementById('taskFormContainer'); // Nuevo contenedor

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
toggleTaskFormButton.style.display = 'none'; // Nuevo botón

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
    if (toggleUploadFormButton.style.display === 'none' && toggleManageFormButton.style.display === 'none' && toggleUserFormButton.style.display === 'none') {
        // Mostrar los botones
        toggleUploadFormButton.style.display = 'block';
        toggleManageFormButton.style.display = 'block';
        toggleUserFormButton.style.display = 'block';
        // Mostrar el formulario de gestión de enlaces por defecto
        addLinkFormContainer.style.display = 'block';
        uploadPdfFormContainer.style.display = 'none';
        userFormContainer.style.display = 'none';
        previouslyVisibleForm = 'addLink';
    } else {
        // Ocultar los botones
        toggleUploadFormButton.style.display = 'none';
        toggleManageFormButton.style.display = 'none';
        toggleUserFormButton.style.display = 'none';
        // Ocultar formularios
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
        userFormContainer.style.display = 'none';
        previouslyVisibleForm = null;
    }
});

// Event listener para el botón que alterna el formulario de gestionar tareas
toggleTaskFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(taskFormContainer).display === 'none') {
        taskFormContainer.style.display = 'block';
        // Ocultar otros formularios si es necesario
        addLinkFormContainer.style.display = 'none';
        uploadPdfFormContainer.style.display = 'none';
        userFormContainer.style.display = 'none';
        previouslyVisibleForm = 'taskForm';
    } else {
        taskFormContainer.style.display = 'none';
        previouslyVisibleForm = null;
    }
});

// Event listener para el botón que alterna el formulario de gestionar enlaces
toggleManageFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(addLinkFormContainer).display === 'none') {
        addLinkFormContainer.style.display = 'block';
        uploadPdfFormContainer.style.display = 'none'; // Ocultar formulario de subir PDF si está visible
        userFormContainer.style.display = 'none'; // Ocultar formulario de usuarios si está visible
        taskFormContainer.style.display = 'none'; // Ocultar formulario de tareas
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
        taskFormContainer.style.display = 'none'; // Ocultar formulario de tareas
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
        taskFormContainer.style.display = 'none'; // Ocultar formulario de tareas
        previouslyVisibleForm = 'userForm';
    } else {
        userFormContainer.style.display = 'block';
        previouslyVisibleForm = 'userForm';
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

// Manejo del formulario de tareas

// Variables para manejar las tareas
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskTypeInput = document.getElementById('taskType');
const taskStatusInput = document.getElementById('taskStatus');
const taskPriorityInput = document.getElementById('taskPriority');
const taskCreatorInput = document.getElementById('taskCreator');
const taskResponsibleInput = document.getElementById('taskResponsible');
const taskCreationDateInput = document.getElementById('taskCreationDate');
const taskDueDateInput = document.getElementById('taskDueDate');
const taskDisciplinesInput = document.getElementById('taskDisciplines');
const taskCausesInput = document.getElementById('taskCauses');
const taskDescriptionInput = document.getElementById('taskDescription');
const taskScreenshotInput = document.getElementById('taskScreenshot');
const taskMessage = document.getElementById('taskMessage');
const taskList = document.getElementById('taskList');
const updateTaskButton = document.getElementById('updateTaskButton');
const cancelTaskEditButton = document.getElementById('cancelTaskEditButton');

let tasksData = [];
let editTaskIndex = null;

// Función para guardar las tareas en localStorage
function saveTasks() {
    localStorage.setItem('tasksData', JSON.stringify(tasksData));
}

// Función para cargar las tareas desde localStorage
function loadTasks() {
    tasksData = JSON.parse(localStorage.getItem('tasksData')) || [];
    renderTaskList();
}

// Función para renderizar la lista de tareas
function renderTaskList() {
    taskList.innerHTML = '';
    tasksData.forEach((task, index) => {
        const li = document.createElement('li');

        const taskDetails = document.createElement('div');
        taskDetails.classList.add('task-details');
        taskDetails.innerHTML = `
            <strong>Título:</strong> ${task.title}<br>
            <strong>Tipo:</strong> ${task.type}<br>
            <strong>Estado:</strong> ${task.status}<br>
            <strong>Prioridad:</strong> ${task.priority}<br>
            <strong>Creador:</strong> ${task.creator}<br>
            <strong>Responsable:</strong> ${task.responsible}<br>
            <strong>Fecha de creación:</strong> ${task.creationDate}<br>
            <strong>Fecha de vencimiento:</strong> ${task.dueDate}<br>
            <strong>Disciplinas:</strong> ${task.disciplines}<br>
            <strong>Causas:</strong> ${task.causes}<br>
            <strong>Descripción:</strong> ${task.description}<br>
        `;

        if (task.screenshot) {
            const img = document.createElement('img');
            img.src = task.screenshot;
            img.alt = 'Captura de pantalla';
            img.style.maxWidth = '100%';
            img.style.marginTop = '10px';
            taskDetails.appendChild(img);
        }

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editTask(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-task-button');
        deleteButton.addEventListener('click', () => deleteTask(index));

        const exportButton = document.createElement('button');
        exportButton.textContent = 'Exportar a PDF';
        exportButton.classList.add('export-task-button');
        exportButton.addEventListener('click', () => exportTaskToPDF(task));

        li.appendChild(taskDetails);
        li.appendChild(exportButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Manejar el envío del formulario de tareas
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const task = {
        title: taskTitleInput.value.trim(),
        type: taskTypeInput.value.trim(),
        status: taskStatusInput.value.trim(),
        priority: taskPriorityInput.value.trim(),
        creator: taskCreatorInput.value.trim(),
        responsible: taskResponsibleInput.value.trim(),
        creationDate: taskCreationDateInput.value,
        dueDate: taskDueDateInput.value,
        disciplines: taskDisciplinesInput.value.trim(),
        causes: taskCausesInput.value.trim(),
        description: taskDescriptionInput.value.trim(),
        screenshot: null,
    };

    // Manejar la captura de pantalla
    const file = taskScreenshotInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            task.screenshot = e.target.result;
            saveOrUpdateTask(task);
        };
        reader.readAsDataURL(file);
    } else {
        saveOrUpdateTask(task);
    }
});

function saveOrUpdateTask(task) {
    if (editTaskIndex !== null) {
        // Actualizar tarea existente
        tasksData[editTaskIndex] = task;
        taskMessage.textContent = 'Tarea actualizada exitosamente.';
    } else {
        // Agregar nueva tarea
        tasksData.push(task);
        taskMessage.textContent = 'Tarea agregada exitosamente.';
    }

    taskMessage.style.color = 'green';

    // Limpiar el formulario
    taskForm.reset();
    editTaskIndex = null;
    updateTaskButton.style.display = 'none';
    cancelTaskEditButton.style.display = 'none';
    taskForm.querySelector('button[type="submit"]').style.display = 'block';

    // Guardar y actualizar la interfaz
    saveTasks();
    renderTaskList();
}

// Función para editar una tarea
function editTask(index) {
    const task = tasksData[index];
    editTaskIndex = index;

    // Cargar los datos en el formulario
    taskTitleInput.value = task.title;
    taskTypeInput.value = task.type;
    taskStatusInput.value = task.status;
    taskPriorityInput.value = task.priority;
    taskCreatorInput.value = task.creator;
    taskResponsibleInput.value = task.responsible;
    taskCreationDateInput.value = task.creationDate;
    taskDueDateInput.value = task.dueDate;
    taskDisciplinesInput.value = task.disciplines;
    taskCausesInput.value = task.causes;
    taskDescriptionInput.value = task.description;
    // Nota: No podemos cargar la captura de pantalla en el input file por seguridad

    taskForm.querySelector('button[type="submit"]').style.display = 'none';
    updateTaskButton.style.display = 'block';
    cancelTaskEditButton.style.display = 'block';
}

// Event listener para el botón de actualizar tarea
updateTaskButton.addEventListener('click', () => {
    taskForm.dispatchEvent(new Event('submit'));
});

// Event listener para cancelar la edición de tarea
cancelTaskEditButton.addEventListener('click', () => {
    taskForm.reset();
    editTaskIndex = null;
    updateTaskButton.style.display = 'none';
    cancelTaskEditButton.style.display = 'none';
    taskForm.querySelector('button[type="submit"]').style.display = 'block';
    taskMessage.textContent = '';
});

// Función para eliminar una tarea
function deleteTask(index) {
    tasksData.splice(index, 1);
    saveTasks();
    renderTaskList();
    taskMessage.textContent = 'Tarea eliminada exitosamente.';
    taskMessage.style.color = 'green';
}

// Función para exportar una tarea a PDF
function exportTaskToPDF(task) {
    // Usaremos jsPDF para generar el PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    doc.setFontSize(12);
    doc.text(`Título: ${task.title}`, 10, y);
    y += 10;
    doc.text(`Tipo: ${task.type}`, 10, y);
    y += 10;
    doc.text(`Estado: ${task.status}`, 10, y);
    y += 10;
    doc.text(`Prioridad: ${task.priority}`, 10, y);
    y += 10;
    doc.text(`Creador: ${task.creator}`, 10, y);
    y += 10;
    doc.text(`Responsable: ${task.responsible}`, 10, y);
    y += 10;
    doc.text(`Fecha de creación: ${task.creationDate}`, 10, y);
    y += 10;
    doc.text(`Fecha de vencimiento: ${task.dueDate}`, 10, y);
    y += 10;
    doc.text(`Disciplinas: ${task.disciplines}`, 10, y);
    y += 10;
    doc.text(`Causas: ${task.causes}`, 10, y);
    y += 10;
    doc.text(`Descripción:`, 10, y);
    y += 10;

    // Manejar texto largo en descripción
    const descriptionLines = doc.splitTextToSize(task.description, 180);
    doc.text(descriptionLines, 10, y);
    y += descriptionLines.length * 10;

    // Agregar captura de pantalla si existe
    if (task.screenshot) {
        y += 10;
        doc.addImage(task.screenshot, 'JPEG', 10, y, 180, 100);
    }

    // Guardar el PDF
    doc.save(`Tarea_${task.title}.pdf`);
}

// Cargar las tareas al iniciar la página
loadTasks();

// Ajustar el layout inicial
adjustLayout();
