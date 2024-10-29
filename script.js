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

// Resto del código existente
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

// Event listener para el botón del menú del iframe2
iframe2MenuButton.addEventListener('click', () => {
    iframe2Menu.classList.toggle('show');
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

// Obtener elementos del formulario de agregar enlaces
const addLinkForm = document.getElementById('addLinkForm');
const menuSelect = document.getElementById('menuSelect');
const linkTextInput = document.getElementById('linkText');
const linkURLInput = document.getElementById('linkURL');
const addLinkMessage = document.getElementById('addLinkMessage');

// Manejar el envío del formulario
addLinkForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const selectedMenuId = menuSelect.value;
    const linkText = linkTextInput.value.trim();
    const linkURL = linkURLInput.value.trim();

    if (linkText === '' || linkURL === '') {
        addLinkMessage.textContent = 'Por favor, completa todos los campos.';
        addLinkMessage.style.color = 'red';
        return;
    }

    // Crear un nuevo elemento de enlace
    const newLink = document.createElement('a');
    newLink.href = linkURL;
    newLink.textContent = linkText;

    // Agregar el enlace al menú seleccionado
    const selectedMenu = document.getElementById(selectedMenuId);
    selectedMenu.appendChild(newLink);

    // Limpiar los campos del formulario
    linkTextInput.value = '';
    linkURLInput.value = '';

    addLinkMessage.textContent = 'Enlace agregado exitosamente.';
    addLinkMessage.style.color = 'green';

    // Actualizar los event listeners después de agregar el nuevo enlace
    updateMenuEventListeners();

    // Guardar los enlaces en localStorage
    saveLinks();
});

// Función para guardar los enlaces en localStorage
function saveLinks() {
    const iframe1Links = Array.from(iframe1MenuContent.querySelectorAll('a')).map(link => ({
        text: link.textContent,
        href: link.href
    }));
    const iframe2Links = Array.from(iframe2MenuContent.querySelectorAll('a')).map(link => ({
        text: link.textContent,
        href: link.href
    }));

    const linksData = {
        iframe1Links,
        iframe2Links
    };

    localStorage.setItem('menuLinks', JSON.stringify(linksData));
}

// Función para cargar los enlaces desde localStorage
function loadLinks() {
    const linksData = JSON.parse(localStorage.getItem('menuLinks'));

    if (linksData) {
        // Limpiar menús existentes
        iframe1MenuContent.innerHTML = '';
        iframe2MenuContent.innerHTML = '';

        // Cargar enlaces en iframe1MenuContent
        linksData.iframe1Links.forEach(linkData => {
            const link = document.createElement('a');
            link.href = linkData.href;
            link.textContent = linkData.text;
            iframe1MenuContent.appendChild(link);
        });

        // Cargar enlaces en iframe2MenuContent
        linksData.iframe2Links.forEach(linkData => {
            const link = document.createElement('a');
            link.href = linkData.href;
            link.textContent = linkData.text;
            iframe2MenuContent.appendChild(link);
        });

        // Actualizar event listeners
        updateMenuEventListeners();
    }
}

// Llamar a loadLinks() al cargar la página
loadLinks();
