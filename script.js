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
const iframe3 = document.getElementById('iframe3');
const toggleIframe3Button = document.getElementById('toggleIframe3Button');
const toggleFormButton = document.getElementById('toggleFormButton');
const iframe1Menu = document.getElementById('iframe1Menu');
const iframe2Menu = document.getElementById('iframe2Menu');
const iframe1MenuButton = document.getElementById('iframe1MenuButton');
const iframe2MenuButton = document.getElementById('iframe2MenuButton');
const iframe1MenuContent = document.getElementById('iframe1MenuContent');
const iframe2MenuContent = document.getElementById('iframe2MenuContent');

// Inicialmente mostrar solo iframe1
iframe1.style.display = 'block';
iframe2.style.display = 'none';
iframe3.style.display = 'none';

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
        link.addEventListener('click', (event) => {
            event.preventDefault();
            iframe1.src = event.target.href;
            iframe1Menu.classList.remove('show');
        });
    });

    iframe2MenuContent.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            iframe2.src = event.target.href;
            iframe2Menu.classList.remove('show');
        });
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
        iframe3.style.display = 'none';
        toggleIframe3Button.style.display = 'none';
        document.getElementById('container').classList.remove('horizontal-split');
    } else {
        iframe2.style.display = 'none';
        iframe2Menu.style.display = 'none'; // Ocultar menú del iframe2
        iframe1.style.width = '100%';
        toggleIframe3Button.style.display = 'block';
        document.getElementById('container').classList.remove('horizontal-split');
    }
    adjustLayout(); // Ajustar layout después de mostrar u ocultar iframe2
});

// Event listener para el botón del cronograma
toggleIframe3Button.addEventListener('click', () => {
    if (window.getComputedStyle(iframe3).display === 'none') {
        iframe3.style.display = 'block';
        iframe1.style.width = '50%';
        iframe3.style.width = '50%';
        iframe2.style.display = 'none';
        iframe2Menu.style.display = 'none'; // Ocultar menú del iframe2
        toggleIframe3Button.style.display = 'block';
        document.getElementById('container').classList.add('horizontal-split');
    } else {
        iframe3.style.display = 'none';
        iframe1.style.width = '100%';
        toggleIframe3Button.style.display = 'block';
        document.getElementById('container').classList.remove('horizontal-split');
    }
    adjustLayout(); // Ajustar layout después de mostrar u ocultar iframe3
});

// Event listener para el botón que alterna el formulario
toggleFormButton.addEventListener('click', () => {
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
        // En modo móvil, ocultamos iframe3 y su botón
        iframe3.style.display = 'none';
        toggleIframe3Button.style.display = 'none';

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
        // En modo escritorio, los iframes ocupan toda la altura y se distribuyen por el ancho
        iframe1.style.height = '100%';
        toggleIframe3Button.style.display = 'block';

        if (window.getComputedStyle(iframe2).display === 'block') {
            iframe1.style.width = '50%';
            iframe2.style.width = '50%';
            iframe2.style.height = '100%';  // Asegurar que iframe2 ocupe toda la altura
            iframe3.style.display = 'none';
        } else if (window.getComputedStyle(iframe3).display === 'block') {
            iframe1.style.width = '50%';
            iframe3.style.width = '50%';
            iframe2.style.height = '0';  // Asegurar que iframe2 esté oculto correctamente
        } else {
            iframe1.style.width = '100%';
            iframe2.style.height = '0';  // Asegurar que iframe2 esté oculto correctamente
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
window.onclick = function(event) {
    if (!event.target.closest('#iframe1MenuButton')) {
        iframe1Menu.classList.remove('show');
    }
    if (!event.target.closest('#iframe2MenuButton')) {
        iframe2Menu.classList.remove('show');
    }
};

// (El resto del código para el manejo del formulario y enlaces permanece igual)

// Asegúrate de que todo el código relacionado con el formulario y la gestión de enlaces esté presente aquí.
