<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Plataforma de Gestión</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- Overlay de inicio de sesión -->
    <div id="loginOverlay">
        <form id="authForm">
            <h2>Iniciar Sesión</h2>
            <input type="text" id="username" placeholder="Usuario" required>
            <input type="password" id="password" placeholder="Contraseña" required>
            <button type="submit">Ingresar</button>
            <div id="errorMessage"></div>
        </form>
    </div>

    <!-- Contenedor principal -->
    <div id="container">

        <!-- Botones superiores -->
        <button id="toggleButton">DUP</button>
        <button id="togglePdfButton">PDF</button>

        <!-- Botones de administración (solo para administradores) -->
        <button id="toggleFormButton">Admin</button>
        <button id="toggleManageFormButton" style="display: none;">Gestionar Enlaces</button>
        <button id="toggleTaskFormButton" style="display: none;">Gestionar Tareas</button>
        <button id="toggleUploadFormButton" style="display: none;">Subir PDF</button>
        <button id="toggleUserFormButton" style="display: none;">Gestionar Usuarios</button>

        <!-- Formularios de administración -->
        <!-- Formulario de agregar enlaces -->
        <div id="addLinkFormContainer" style="display: none;">
            <h3>Gestión de Enlaces</h3>
            <form id="addLinkForm">
                <label for="linkText">Texto del Enlace:</label>
                <input type="text" id="linkText" name="linkText" required>

                <label for="linkURL">URL del Enlace:</label>
                <input type="text" id="linkURL" name="linkURL" required>

                <button type="submit">Agregar Enlace</button>
                <button type="button" id="updateLinkButton" style="display: none;">Actualizar Enlace</button>
                <button type="button" id="cancelEditButton" style="display: none;">Cancelar</button>
            </form>
            <div id="addLinkMessage"></div>
            <ul id="linkList"></ul>
        </div>

        <!-- Formulario de subir PDF -->
        <div id="uploadPdfFormContainer" style="display: none;">
            <h3>Subir PDF</h3>
            <form id="uploadPdfForm">
                <label for="pdfFile">Seleccionar archivo PDF:</label>
                <input type="file" id="pdfFile" name="pdfFile" accept="application/pdf" required>

                <button type="submit">Subir PDF</button>
                <button type="button" id="cancelUploadButton">Cancelar</button>
            </form>
            <div id="uploadMessage"></div>
        </div>

        <!-- Formulario de gestión de usuarios -->
        <div id="userFormContainer" style="display: none;">
            <h3>Gestión de Usuarios</h3>
            <form id="userForm">
                <label for="userEmail">Correo Electrónico:</label>
                <input type="email" id="userEmail" name="userEmail" required>

                <label for="userUsername">Nombre de Usuario:</label>
                <input type="text" id="userUsername" name="userUsername" required>

                <label for="userPassword">Contraseña:</label>
                <input type="password" id="userPassword" name="userPassword" required>

                <label for="userRole">Rol:</label>
                <select id="userRole" name="userRole">
                    <option value="miembro">Miembro</option>
                    <option value="administrador">Administrador</option>
                </select>

                <button type="submit">Agregar Usuario</button>
                <button type="button" id="updateUserButton" style="display: none;">Actualizar Usuario</button>
                <button type="button" id="cancelUserEditButton" style="display: none;">Cancelar</button>
            </form>
            <div id="userMessage"></div>
            <ul id="userList"></ul>
        </div>

        <!-- Nuevo formulario de gestión de tareas -->
        <div id="taskFormContainer" style="display: none;">
            <h3>Gestión de Tareas</h3>
            <form id="taskForm">
                <label for="taskTitle">Título:</label>
                <input type="text" id="taskTitle" name="taskTitle" required>

                <label for="taskType">Tipo:</label>
                <input type="text" id="taskType" name="taskType" required>

                <label for="taskStatus">Estado:</label>
                <input type="text" id="taskStatus" name="taskStatus" required>

                <label for="taskPriority">Prioridad:</label>
                <input type="text" id="taskPriority" name="taskPriority" required>

                <label for="taskCreator">Creador:</label>
                <input type="text" id="taskCreator" name="taskCreator" required>

                <label for="taskResponsible">Responsable:</label>
                <input type="text" id="taskResponsible" name="taskResponsible" required>

                <label for="taskCreationDate">Fecha de Creación:</label>
                <input type="date" id="taskCreationDate" name="taskCreationDate" required>

                <label for="taskDueDate">Fecha de Vencimiento:</label>
                <input type="date" id="taskDueDate" name="taskDueDate">

                <label for="taskDisciplines">Disciplinas:</label>
                <input type="text" id="taskDisciplines" name="taskDisciplines">

                <label for="taskCauses">Causas:</label>
                <input type="text" id="taskCauses" name="taskCauses">

                <label for="taskDescription">Descripción:</label>
                <textarea id="taskDescription" name="taskDescription" rows="4"></textarea>

                <label for="taskScreenshot">Captura de Pantalla:</label>
                <input type="file" id="taskScreenshot" name="taskScreenshot" accept="image/*">

                <button type="submit">Agregar Tarea</button>
                <button type="button" id="updateTaskButton" style="display: none;">Actualizar Tarea</button>
                <button type="button" id="cancelTaskEditButton" style="display: none;">Cancelar</button>
            </form>
            <div id="taskMessage"></div>

            <!-- Lista de tareas -->
            <div id="taskListContainer">
                <h4>Tareas</h4>
                <ul id="taskList"></ul>
            </div>
        </div>

        <!-- Menús de los iframes -->
        <div id="iframe1Menu">
            <button id="iframe1MenuButton">Menú</button>
            <div id="iframe1MenuContent" class="menu-content">
                <!-- Enlaces dinámicos -->
            </div>
        </div>

        <div id="iframe2Menu" style="display: none;">
            <button id="iframe2MenuButton">Menú</button>
            <div id="iframe2MenuContent" class="menu-content">
                <!-- Enlaces dinámicos -->
            </div>
        </div>

        <!-- Iframes -->
        <iframe id="iframe1" src=""></iframe>
        <iframe id="iframe2" src="" style="display: none;"></iframe>
        <iframe id="pdfViewer" style="display: none;"></iframe>

    </div>

    <!-- Archivo JavaScript -->
    <script src="script.js"></script>
</body>
</html>
