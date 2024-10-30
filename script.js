<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Acompanhamento de Obra 360</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Enlace al archivo CSS -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Pantalla de inicio de sesión -->
    <div id="loginOverlay">
        <div id="loginContent">
            <img src="DT.png" alt="Logo da Deloitte 360" id="loginLogo">
            <div id="loginForm">
                <h2>Iniciar Sessão</h2>
                <form id="authForm">
                    <label for="username">Usuário:</label>
                    <input type="text" id="username" name="username" required autocomplete="off">

                    <label for="password">Senha:</label>
                    <input type="password" id="password" name="password" required autocomplete="off">

                    <button type="submit">Entrar</button>
                    <p id="errorMessage" class="error"></p>
                </form>
            </div>
        </div>
    </div>

    <!-- Botón para dispositivos de escritorio -->
    <div id="toggleButton"></div>
    <!-- Botón para dispositivos móviles -->
    <div id="toggleIframe2ButtonMobile"></div>
    <div id="container">
        <iframe id="iframe1" src="https://momento360.com/e/uc/e39b5e2ef7864507b34ca0ee97cebca3?utm_campaign=embed&utm_source=other&size=large&display-plan=true"></iframe>
        <iframe id="iframe2" src="https://momento360.com/e/uc/e0e6b60410484a949026c3aec52ef112?utm_campaign=embed&utm_source=other&size=large&display-plan=true"></iframe>
        <!-- Reemplazamos iframe3 por un visor PDF -->
        <embed id="pdfViewer" src="CRONOGRAMA.pdf" type="application/pdf" />
        <!-- Botón para el cronograma (PDF) -->
        <div id="togglePdfButton"></div>
        <!-- Botón para mostrar/ocultar el formulario -->
        <div id="toggleFormButton"></div>
    </div>

    <!-- Menú desplegable para iframe1 -->
    <div id="iframe1Menu" class="dropdown" role="menu" aria-label="Menú desplegable del iframe1">
        <button id="iframe1MenuButton">▼</button>
        <div id="iframe1MenuContent" class="dropdown-content">
            <!-- Enlaces del menú -->
            <a href="https://momento360.com/e/uc/e39b5e2ef7864507b34ca0ee97cebca3?utm_campaign=embed&utm_source=other&size=large&display-plan=true">Modelo 3D Silicato</a>
            <a href="https://momento360.com/e/uc/e0e6b60410484a949026c3aec52ef112?utm_campaign=embed&utm_source=other&size=large&display-plan=true">Real Capture Silicato</a>
            <a href="https://momento360.com/e/uc/51c95022f269476289cc23adc2a69b03?utm_campaign=embed&utm_source=other&size=large&display-plan=true">Modelo 3D Virador de Vagões</a>
        </div>
    </div>

    <!-- Menú desplegable para iframe2 -->
    <div id="iframe2Menu" class="dropdown" role="menu" aria-label="Menú desplegable del iframe2">
        <button id="iframe2MenuButton">▼</button>
        <div id="iframe2MenuContent" class="dropdown-content">
            <!-- Enlaces del menú -->
            <a href="https://momento360.com/e/uc/e39b5e2ef7864507b34ca0ee97cebca3?utm_campaign=embed&utm_source=other&size=large&display-plan=true">Modelo 3D Silicato</a>
            <a href="https://momento360.com/e/uc/e0e6b60410484a949026c3aec52ef112?utm_campaign=embed&utm_source=other&size=large&display-plan=true">Real Capture Silicato</a>
            <a href="https://momento360.com/e/uc/51c95022f269476289cc23adc2a69b03?utm_campaign=embed&utm_source=other&size=large&display-plan=true">Modelo 3D Virador de Vagões</a>
        </div>
    </div>

    <!-- Formulario para agregar, editar y eliminar enlaces -->
    <div id="addLinkFormContainer">
        <!-- Contenedor para los botones A y B -->
        <div id="sideButtons">
            <button id="buttonA"></button>
            <button id="buttonB"></button>
        </div>

        <!-- Contenido del formulario -->
        <div id="formContent">
            <h3>Gestionar Enlaces</h3>
            <form id="addLinkForm">
                <label for="linkText">Texto del Enlace:</label>
                <input type="text" id="linkText" name="linkText" required>

                <label for="linkURL">URL del Enlace:</label>
                <input type="url" id="linkURL" name="linkURL" required>

                <button type="submit">Agregar Enlace</button>
                <button type="button" id="updateLinkButton" style="display: none;">Actualizar Enlace</button>
                <button type="button" id="cancelEditButton" style="display: none;">Cancelar</button>
            </form>
            <p id="addLinkMessage"></p>

            <!-- Lista de enlaces existentes -->
            <div id="linkListContainer">
                <h4>Enlaces Existentes</h4>
                <ul id="linkList"></ul>
            </div>
        </div>
    </div>

    <!-- Cargar el script al final del body -->
    <script src="script.js"></script>
</body>
</html>
