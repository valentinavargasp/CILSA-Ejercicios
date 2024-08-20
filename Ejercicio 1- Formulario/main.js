document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario');
    const inputs = document.querySelectorAll('#formulario input');
    const selectPais = document.getElementById('pais');

    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2; 
                option.textContent = country.name.common; 
                selectPais.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los países:', error));

    const expresiones = {
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{4,12}$/, // 4 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    const campos = {
        usuario: false,
        nombre: false,
        password: false,
        correo: false,
        telefono: false,
        pais: false
    }

    const validarForm = (e) => {
        switch (e.target.name) {
            case 'usuario':
                validarCampo(expresiones.usuario, e.target, 'usuario');
                break;
            case 'nombre':
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case 'password':
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword2();
                break;
            case 'password2':
                validarPassword2();
                break;
            case 'correo':
                validarCampo(expresiones.correo, e.target, 'correo');
                break;
            case 'telefono':
                validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
            case 'pais':
                validarSelect(e.target.value, 'pais');
                break;
        }
    }

    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo${campo}`).classList.remove('formularioGrupoIncorrecto');
            document.getElementById(`grupo${campo}`).classList.add('formularioGrupoCorrecto');
            document.querySelector(`#grupo${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo${campo} .formularioInputError`).classList.remove('formularioInputError-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo${campo}`).classList.add('formularioGrupoIncorrecto');
            document.getElementById(`grupo${campo}`).classList.remove('formularioGrupoCorrecto');
            document.querySelector(`#grupo${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo${campo} .formularioInputError`).classList.add('formularioInputError-activo');
            campos[campo] = false;
        }
    }

    const validarPassword2 = () => {
        const inputPassword1 = document.getElementById('password');
        const inputPassword2 = document.getElementById('password2');

        if (inputPassword1.value !== inputPassword2.value) {
            document.getElementById('grupoPassword2').classList.add('formularioGrupoIncorrecto');
            document.getElementById('grupoPassword2').classList.remove('formularioGrupoCorrecto');
            document.querySelector('#grupoPassword2 i').classList.add('fa-times-circle');
            document.querySelector('#grupoPassword2 i').classList.remove('fa-check-circle');
            document.querySelector('#grupoPassword2 .formularioInputError').classList.add('formularioInputError-activo');
            campos['password'] = false;
        } else {
            document.getElementById('grupoPassword2').classList.remove('formularioGrupoIncorrecto');
            document.getElementById('grupoPassword2').classList.add('formularioGrupoCorrecto');
            document.querySelector('#grupoPassword2 i').classList.remove('fa-times-circle');
            document.querySelector('#grupoPassword2 i').classList.add('fa-check-circle');
            document.querySelector('#grupoPassword2 .formularioInputError').classList.remove('formularioInputError-activo');
            campos['password'] = true;
        }
    }

    const validarSelect = (value, name) => {
        if (value === "") {
            document.querySelector(`#grupo${name} .formularioInputError`).classList.add('formularioInputError-activo');
            document.querySelector(`#grupo${name} .formularioValidacionEstado`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo${name} .formularioValidacionEstado`).classList.add('fa-times-circle');
            document.querySelector(`#grupo${name}`).classList.add('formularioGrupoIncorrecto');
            document.querySelector(`#grupo${name}`).classList.remove('formularioGrupoCorrecto');
            campos[name] = false;
        } else {
            document.querySelector(`#grupo${name} .formularioInputError`).classList.remove('formularioInputError-activo');
            document.querySelector(`#grupo${name} .formularioValidacionEstado`).classList.add('fa-check-circle');
            document.querySelector(`#grupo${name} .formularioValidacionEstado`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo${name}`).classList.remove('formularioGrupoIncorrecto');
            document.querySelector(`#grupo${name}`).classList.add('formularioGrupoCorrecto');
            campos[name] = true;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarForm);
        input.addEventListener('blur', validarForm);
    });

    selectPais.addEventListener('change', validarForm);

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const terminos = document.getElementById('terminos');
        if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && campos.pais && terminos.checked) {
            formulario.reset();

            document.getElementById('formularioMensajeExito').classList.add('formularioMensajeExito-activo');
            setTimeout(() => {
                document.getElementById('formularioMensajeExito').classList.remove('formularioMensajeExito-activo');
            }, 5000);

            document.querySelectorAll('.formularioGrupoCorrecto').forEach((icono) => {
                icono.classList.remove('formularioGrupoCorrecto');
            });
        } else {
            document.getElementById('formularioMensaje').classList.add('formularioMensaje-activo');
        }
    });
});

function setStyle(style) {
    const body = document.body;
    if (style === 'highContrast') {
        body.classList.remove('normal');
        body.classList.add('highContrast');
    } else {
        body.classList.remove('highContrast');
        body.classList.add('normal');
    }
}
