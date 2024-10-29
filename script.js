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

// Si estamos en la página principal, inicializar los iframes y menús
if (document.getElementById('iframe1')) {
    // ... (código existente para iframes y menús)

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

            // Cargar el primer enlace por defecto en iframe1
            if (linksData.iframe1Links.length > 0) {
                iframe1.src = linksData.iframe1Links[0].href;
            }

            // Si iframe2 está visible, cargar su primer enlace
            if (window.getComputedStyle(iframe2).display !== 'none' && linksData.iframe2Links.length > 0) {
                iframe2.src = linksData.iframe2Links[0].href;
            }
        }
    }

    // Llamar a loadLinks() al cargar la página
    loadLinks();
}

// Si estamos en la página de ajustes, manejar el formulario
if (document.getElementById('addLinkForm')) {
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

        // Crear un nuevo objeto de enlace
        const newLinkData = {
            text: linkText,
            href: linkURL
        };

        // Obtener los enlaces existentes del localStorage
        const linksData = JSON.parse(localStorage.getItem('menuLinks')) || {
            iframe1Links: [],
            iframe2Links: []
        };

        // Agregar el nuevo enlace al menú seleccionado
        if (selectedMenuId === 'iframe1Links') {
            linksData.iframe1Links.push(newLinkData);
        } else if (selectedMenuId === 'iframe2Links') {
            linksData.iframe2Links.push(newLinkData);
        }

        // Guardar los enlaces actualizados en localStorage
        localStorage.setItem('menuLinks', JSON.stringify(linksData));

        // Limpiar los campos del formulario
        linkTextInput.value = '';
        linkURLInput.value = '';

        addLinkMessage.textContent = 'Enlace agregado exitosamente.';
        addLinkMessage.style.color = 'green';
    });
}
