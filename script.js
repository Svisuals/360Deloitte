/* Estilos generales */
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

#container {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    flex-direction: row;
}

iframe, embed {
    width: 100%;
    height: 100%;
    border: none;
    display: none;
}

#iframe1 {
    display: block;
}

#iframe2, #pdfViewer {
    display: none;
}

/* Botones */
#toggleButton {
    position: fixed;
    top: 10px;
    left: 10px;
    width: 32px;
    height: 32px;
    background: url('DUP.png') no-repeat center center;
    background-size: cover;
    border: none;
    cursor: pointer;
    z-index: 1000;
}

#togglePdfButton {
    position: fixed;
    top: 10px;
    left: 55px;
    width: 32px;
    height: 32px;
    background: url('PDF.png') no-repeat center center; /* Debes proporcionar esta imagen */
    background-size: cover;
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: none; /* Oculto por defecto */
}

#toggleFormButton {
    position: fixed;
    top: 10px;
    left: 100px;
    width: 32px;
    height: 32px;
    background: url('FORM.png') no-repeat center center; /* Debes proporcionar esta imagen */
    background-size: cover;
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: none; /* Oculto por defecto */
}

#toggleUploadFormButton {
    position: fixed;
    top: 10px;
    left: 145px;
    width: 32px;
    height: 32px;
    background: url('UPLOAD.png') no-repeat center center; /* Debes proporcionar esta imagen */
    background-size: cover;
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: none; /* Oculto por defecto */
}

#toggleManageFormButton {
    position: fixed;
    top: 10px;
    left: 190px; /* Posicionado a la derecha de UPLOAD.png */
    width: 32px;
    height: 32px;
    background: url('MANAGE.png') no-repeat center center; /* Debes proporcionar esta imagen */
    background-size: cover;
    border: none;
    cursor: pointer;
    z-index: 1000;
    display: none; /* Oculto por defecto */
}

/* Menús desplegables */
.dropdown {
    position: fixed;
    top: 10px;
    z-index: 1001;
}

#iframe1Menu {
    left: 10px;
}

#iframe2Menu {
    right: 10px;
    left: auto;
}

.dropdown button {
    background-color: #0c7a20;
    color: white;
    padding: 8px;
    font-size: 16px;
    border: none;
    cursor: pointer;
}

.dropdown button::after {
    content: '';
    display: inline-block;
    margin-left: 5px;
    vertical-align: middle;
    border-width: 5px;
    border-style: solid;
    border-color: white transparent transparent transparent;
}

/* Estilo mejorado para los menús desplegables */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #ffffff;
    min-width: 200px;
    max-width: 300px;
    width: 60%;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    z-index: 1;
    padding: 10px 0;

    /* Añadido para scrollbar vertical */
    max-height: 300px;
    overflow-y: auto;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 5px;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
    color: #0c7a20;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
}

/* Mostrar el menú al agregar la clase 'show' */
.dropdown.show .dropdown-content {
    display: block;
}

/* Alinear el menú de iframe2 hacia la izquierda */
#iframe2Menu .dropdown-content {
    right: 0;
    left: auto;
}

/* Media Queries */

/* Orientación vertical en dispositivos móviles */
@media (max-width: 1300px) and (orientation: portrait) {
    #container {
        flex-direction: column;
    }

    #iframe1,
    #iframe2 {
        width: 100%;
    }

    #iframe1 {
        height: 50%;
    }

    #iframe2 {
        height: 50%;
    }

    /* Posicionar menú del iframe2 */
    #iframe2Menu {
        top: calc(50% + 10px);
        left: 10px;
    }

    /* Ajustar dimensiones del botón del menú del iframe2 */
    #iframe2Menu button {
        padding: 8px;
        font-size: 16px;
    }

    /* Ajustar posición del contenido del menú del iframe2 */
    #iframe2Menu .dropdown-content {
        left: 0;
        right: auto;
    }

    /* Posicionar botones */
    #toggleButton,
    #togglePdfButton,
    #toggleFormButton,
    #toggleUploadFormButton,
    #toggleManageFormButton {
        top: 10px;
        left: auto;
        right: 10px;
    }

    #toggleButton {
        left: auto;
    }
}

/* Orientación horizontal en dispositivos móviles */
@media (max-width: 1300px) and (orientation: landscape) {
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #container {
        height: 100%;
        width: 100%;
        flex-direction: row;
    }

    #iframe1, #iframe2 {
        width: 50%;
        height: 100%;
        display: block;
    }

    #togglePdfButton {
        display: none;
    }

    #pdfViewer {
        display: none;
    }

    /* Posicionar menús */
    #iframe1Menu {
        top: 10px;
        left: 10px;
    }

    #iframe2Menu {
        top: 10px;
        right: 10px;
        left: auto;
    }

    /* Posicionar botones */
    #toggleButton {
        top: 10px;
        right: 10px;
        left: calc(49%);
    }
}

/* Estilos para la pantalla de inicio de sesión */
#loginOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.7);
}

#loginContent {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#loginLogo {
    max-width: 360px;
    height: auto;
    margin-bottom: 20px;
    margin-left: 5%;
}

/* Estilos para el formulario de inicio de sesión */
#loginForm {
    background-color: transparent;
    border: none;
    box-shadow: none;
    padding: 20px 30px;
    max-width: 350px;
    width: 100%;
    font-family: 'Open Sans', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#loginForm h2 {
    margin-bottom: 20px;
    color: white;
    font-size: 1.5em;
    font-weight: bold;
}

#loginForm label {
    display: block;
    margin: 10px 0 5px;
    text-align: left;
    color: white;
    font-size: 0.95em;
}

#loginForm input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 0.95em;
    background-color: #f5f5f5;
    color: #000000;
}

#loginForm input::placeholder {
    color: #a9a9a9;
}

#loginForm button {
    width: 100%;
    max-width: 200px;
    padding: 10px;
    background-color: #0c7a20;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    text-align: center;
}

#loginForm button:hover {
    background-color: #095c16;
}

#errorMessage {
    color: red;
    margin-top: 10px;
    display: none;
}

/* Media Query para pantallas más pequeñas */
@media (max-width: 768px), (max-height: 768px) {
    #loginForm {
        padding: 10px 15px;
        max-width: 300px;
    }

    #loginForm h2 {
        font-size: 1.2em;
    }

    #loginForm label,
    #loginForm input,
    #loginForm button {
        font-size: 0.9em;
    }

    #loginForm input {
        padding: 4px;
    }

    #loginForm button {
        padding: 5px;
    }

    /* Media Query para pantallas más pequeñas en orientación vertical */
    @media (max-width: 768px) and (orientation: portrait) {
        #loginForm button {
            width: 100%;
            max-width: 200px;
            margin-top: 10px;
            margin-left: 10%;
            text-align: center;
        }
    }
}

/* Estilos para el formulario de agregar enlaces */
#addLinkFormContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    z-index: 2001;
    max-width: 400px;
    width: 90%;
    display: none;

    /* Añadido para scrollbar vertical */
    max-height: 80vh;
    overflow-y: auto;
}

#addLinkFormContainer h3 {
    margin-top: 0;
    text-align: center;
    color: #0c7a20;
}

#addLinkForm label {
    display: block;
    margin: 10px 0 5px;
    font-size: 0.9em;
    color: #333;
}

#addLinkForm input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 0.9em;
}

#addLinkForm button {
    width: 100%;
    padding: 10px;
    background-color: #0c7a20;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;
}

#addLinkForm button:hover {
    background-color: #095c16;
}

#addLinkMessage {
    margin-top: 10px;
    font-size: 0.9em;
    text-align: center;
}

/* Estilos para la lista de enlaces */
#linkListContainer {
    margin-top: 20px;

    /* Añadido para scrollbar vertical */
    max-height: 200px;
    overflow-y: auto;
}

#linkListContainer h4 {
    margin-bottom: 10px;
    color: #0c7a20;
}

#linkList {
    list-style-type: none;
    padding: 0;
}

#linkList li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    background-color: #f9f9f9;
    padding: 8px;
    border-radius: 6px;
}

#linkList li span {
    flex-grow: 1;
    margin-right: 10px;
}

#linkList li button {
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 5px;
}

#linkList li button.edit-button {
    background-color: #3498db;
}

#linkList li button:hover {
    opacity: 0.8;
}

/* Estilos para el formulario de subir PDFs */
#uploadPdfFormContainer {
    /* Mismos estilos que #addLinkFormContainer */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    z-index: 2001;
    max-width: 400px;
    width: 90%;
    display: none;
    max-height: 80vh;
    overflow-y: auto;
}

#uploadPdfFormContainer h3 {
    margin-top: 0;
    text-align: center;
    color: #0c7a20;
}

#uploadPdfForm label {
    display: block;
    margin: 10px 0 5px;
    font-size: 0.9em;
    color: #333;
}

#uploadPdfForm input[type="file"] {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 0.9em;
}

#uploadPdfForm button {
    width: 100%;
    padding: 10px;
    background-color: #0c7a20;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    margin-top: 10px;
}

#uploadPdfForm button:hover {
    background-color: #095c16;
}

#uploadMessage {
    margin-top: 10px;
    font-size: 0.9em;
    text-align: center;
}
