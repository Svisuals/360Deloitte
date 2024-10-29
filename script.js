// Obtener elementos de inicio de sesión
const loginOverlay = document.getElementById('loginOverlay');
const authForm = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Manejar el envío del formulario de autenticación
authForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Verificar las credenciales
    if (username === 'ADM' && password === '1234') {
        // Ocultar la pantalla de inicio de sesión
        loginOverlay.style.display = 'none';
    } else {
        // Mostrar mensaje de error
        errorMessage.textContent = 'Usuário ou senha incorretos.';
        errorMessage.style.display = 'block';
    }
});

// Elementos principales
const toggleButton = document.getElementById('toggleButton');
const iframe1 = document.getElementById('iframe1');
const iframe2 = document.getElementById('iframe2');
const iframe3 = document.getElementById('iframe3');
const toggleIframe3Button = document.getElementById('toggleIframe3Button');
const iframe1Menu = document.getElementById('iframe1Menu');
const iframe2Menu = document.getElementById('iframe2Menu');
const iframe1MenuButton = document.getElementById('iframe1MenuButton');
const iframe2MenuButton = document.getElementById('iframe2MenuButton');
const iframe1MenuContent = document.getElementById('iframe1MenuContent');
const iframe2MenuContent = document.getElementById('iframe2MenuContent');

// Elementos para la página de ajustes
const settingsButton = document.getElementById('settingsButton');
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsForm = document.getElementById('settingsForm');
const closeSettingsButton = document.getElementById('closeSettings');

// Inicialmente mostrar solo iframe1
iframe1.style.display = 'block';
iframe2.style.display = 'none';
iframe3.style.display = 'none';

// Ocultar menú del iframe2 inicialmente
iframe2Menu.style.display = 'none';

// Event listener para el botón del menú del iframe1
iframe1MenuButton.addEventListener('click', () => {
    iframe1Menu.classList.toggle('show');
});

// Event listener para los enlaces del menú del iframe1
iframe1MenuContent.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        iframe1.src = event.target.href;
        iframe1Menu.classList.remove('show');
        event.preventDefault();
    }
});

// Event listener para el botón del menú del iframe2
iframe2MenuButton.addEventListener('click', () => {
    iframe2Menu.classList.toggle('show');
});

// Event listener para los enlaces del menú del iframe2
iframe2MenuContent.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        iframe2.src = event.target.href;
        iframe2Menu.classList.remove('show');
        event.preventDefault();
    }
});

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

// Función para ajustar el layout
function adjustLayout() {
    const isMobile = window.innerWidth <= 1300;
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isMobile) {
        // En modo móvil, ocultamos iframe3 y su botón
        iframe3.style.display = 'none';
        toggleIframe3Button.style.display = 'none';
        settingsButton.style.display = 'none';

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
        // En modo desktop, los iframes ocupan toda la altura y se distribuyen por el ancho
        iframe1.style.height = '100%';
        toggleIframe3Button.style.display = 'block';
        settingsButton.style.display = 'block';

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

// Lógica para la página de ajustes

// Mostrar la página de ajustes al hacer clic en el botón
settingsButton.addEventListener('click', () => {
    settingsOverlay.style.display = 'flex';
});

// Cerrar la página de ajustes al hacer clic en el botón "Cerrar"
closeSettingsButton.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
});

// Manejar el envío del formulario de ajustes
settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const linkText = document.getElementById('linkText').value.trim();
    const linkURL = document.getElementById('linkURL').value.trim();
    const iframeTarget = document.getElementById('iframeTarget').value;

    // Validación básica
    if (linkText && linkURL && iframeTarget) {
        // Crear nuevo elemento de enlace
        const newLink = document.createElement('a');
        newLink.href = linkURL;
        newLink.textContent = linkText;

        // Agregar evento al nuevo enlace
        newLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (iframeTarget === 'iframe1') {
                iframe1.src = linkURL;
                iframe1Menu.classList.remove('show');
            } else if (iframeTarget === 'iframe2') {
                iframe2.src = linkURL;
                iframe2Menu.classList.remove('show');
            }
        });

        // Agregar el nuevo enlace al menú correspondiente
        if (iframeTarget === 'iframe1') {
            iframe1MenuContent.appendChild(newLink);
        } else if (iframeTarget === 'iframe2') {
            iframe2MenuContent.appendChild(newLink);
        }

        // Guardar el enlace en localStorage
        saveLinkToLocalStorage({ text: linkText, url: linkURL, target: iframeTarget });

        // Limpiar el formulario
        settingsForm.reset();

        // Cerrar la página de ajustes
        settingsOverlay.style.display = 'none';
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Función para guardar enlaces en localStorage
function saveLinkToLocalStorage(link) {
    let savedLinks = JSON.parse(localStorage.getItem('customLinks')) || [];
    savedLinks.push(link);
    localStorage.setItem('customLinks', JSON.stringify(savedLinks));
}

// Función para cargar enlaces desde localStorage al iniciar
function loadLinksFromLocalStorage() {
    let savedLinks = JSON.parse(localStorage.getItem('customLinks')) || [];
    savedLinks.forEach(link => {
        const newLink = document.createElement('a');
        newLink.href = link.url;
        newLink.textContent = link.text;

        // Agregar evento al nuevo enlace
        newLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (link.target === 'iframe1') {
                iframe1.src = link.url;
                iframe1Menu.classList.remove('show');
            } else if (link.target === 'iframe2') {
                iframe2.src = link.url;
                iframe2Menu.classList.remove('show');
            }
        });

        // Agregar el nuevo enlace al menú correspondiente
        if (link.target === 'iframe1') {
            iframe1MenuContent.appendChild(newLink);
        } else if (link.target === 'iframe2') {
            iframe2MenuContent.appendChild(newLink);
        }
    });
}

// Cargar los enlaces al iniciar la página
loadLinksFromLocalStorage();
