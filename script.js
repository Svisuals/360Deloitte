// Elementos de inicio de sesión
const loginOverlay = document.getElementById('loginOverlay');
const authForm = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Manejar el envío del formulario de inicio de sesión
authForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Verificar las credenciales
    if (username === 'ADM' && password === '1234') {
        // Ocultar la pantalla de inicio de sesión
        loginOverlay.style.display = 'none';

        // Llamar a adjustLayout para ajustar el diseño
        adjustLayout();
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

// Mostrar la página de ajustes al hacer clic en el botón
settingsButton.addEventListener('click', () => {
    settingsOverlay.style.display = 'flex';
});

// Cerrar la página de ajustes
closeSettingsButton.addEventListener('click', () => {
    settingsOverlay.style.display = 'none';
});

// Almacenar enlaces personalizados
let customLinks = JSON.parse(localStorage.getItem('customLinks')) || [];

// Función para añadir el enlace a los menús
function addLinkToMenus(linkData) {
    const newLink1 = document.createElement('a');
    newLink1.href = linkData.url;
    newLink1.textContent = linkData.title;
    iframe1MenuContent.appendChild(newLink1);

    const newLink2 = document.createElement('a');
    newLink2.href = linkData.url;
    newLink2.textContent = linkData.title;
    iframe2MenuContent.appendChild(newLink2);
}

// Al inicio, cargar los enlaces personalizados
customLinks.forEach(linkData => {
    addLinkToMenus(linkData);
});

// Manejar el envío del formulario de ajustes
settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const linkTitle = document.getElementById('linkTitle').value.trim();
    const linkURL = document.getElementById('linkURL').value.trim();

    if (linkTitle && linkURL) {
        const newLinkData = { title: linkTitle, url: linkURL };

        // Añadir el enlace a la lista de enlaces personalizados
        customLinks.push(newLinkData);

        // Guardar en el localStorage
        localStorage.setItem('customLinks', JSON.stringify(customLinks));

        // Añadir el enlace a los menús
        addLinkToMenus(newLinkData);

        // Cerrar la página de ajustes
        settingsOverlay.style.display = 'none';

        // Limpiar el formulario
        settingsForm.reset();
    }
});

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

// Event listener para el botón del menú del iframe2
iframe2MenuButton.addEventListener('click', () => {
    iframe2Menu.classList.toggle('show');
});

// Función para manejar clics en los menús desplegables
function handleMenuClick(event, iframe) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        iframe.src = event.target.href;
        // Cerrar el menú correspondiente
        if (iframe === iframe1) {
            iframe1Menu.classList.remove('show');
        } else if (iframe === iframe2) {
            iframe2Menu.classList.remove('show');
        }
    }
}

// Event listeners para los menús
iframe1MenuContent.addEventListener('click', (event) => {
    handleMenuClick(event, iframe1);
});

iframe2MenuContent.addEventListener('click', (event) => {
    handleMenuClick(event, iframe2);
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
    adjustLayout();
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
    adjustLayout();
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
            // En orientación horizontal, mostrar u ocultar iframe2
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
        // En modo escritorio
        iframe1.style.height = '100%';
        toggleIframe3Button.style.display = 'block';

        if (window.getComputedStyle(iframe2).display === 'block') {
            iframe1.style.width = '50%';
            iframe2.style.width = '50%';
            iframe2.style.height = '100%';
            iframe3.style.display = 'none';
        } else if (window.getComputedStyle(iframe3).display === 'block') {
            iframe1.style.width = '50%';
            iframe3.style.width = '50%';
            iframe2.style.height = '0';
        } else {
            iframe1.style.width = '100%';
            iframe2.style.height = '0';
        }
    }

    // Asegurar que los menús no afecten la posición de los botones
    iframe1Menu.style.position = 'fixed';
    iframe2Menu.style.position = 'fixed';
}

window.addEventListener('resize', adjustLayout);
window.addEventListener('orientationchange', adjustLayout);
adjustLayout();

// Cerrar los menús si el usuario hace clic fuera de ellos
window.onclick = function(event) {
    if (!event.target.closest('#iframe1MenuButton')) {
        iframe1Menu.classList.remove('show');
    }
    if (!event.target.closest('#iframe2MenuButton')) {
        iframe2Menu.classList.remove('show');
    }
};
