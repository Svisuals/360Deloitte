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

        // Mostrar u ocultar el botón del formulario según el usuario
        if (loggedInUser === 'deloitte') {
            toggleFormButton.style.display = 'block';
        } else {
            toggleFormButton.style.display = 'none';
        }
    } else {
        // Mostrar mensaje de error
        errorMessage.textContent = 'Usuário ou senha incorretos.';
        errorMessage.style.display = 'block';
    }
});

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

// Nuevos elementos
const leftButtons = document.getElementById('leftButtons');
const buttonA = document.getElementById('buttonA');
const buttonB = document.getElementById('buttonB');

// Inicialmente mostrar solo iframe1
iframe1.style.display = 'block';
iframe2.style.display = 'none';
pdfViewer.style.display = 'none'; // Ocultar el visor PDF por defecto

// Ocultar menú del iframe2 inicialmente
iframe2Menu.style.display = 'none';

// Ocultar el botón del formulario por defecto
toggleFormButton.style.display = 'none';

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

// Event listener para el botón que alterna los botones A y B
toggleFormButton.addEventListener('click', () => {
    if (window.getComputedStyle(leftButtons).display === 'none') {
        leftButtons.style.display = 'flex';
    } else {
        leftButtons.style.display = 'none';
    }
});

// Event listener para el botón A que alterna la visibilidad del formulario
buttonA.addEventListener('click', () => {
    const formContainer = document.getElementById('addLinkFormContainer');
    if (window.getComputedStyle(formContainer).display === 'none') {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
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

// Resto del código para el formulario y gestión de enlaces
// ... (código existente sin cambios) ...
