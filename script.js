const inputArea = document.querySelector('.encriptador__input__textarea');
const outputArea = document.querySelector('.encriptador__output__respuesta');
const noMensaje = document.querySelector('.encriptador__output__mensaje__no__encontrado');
const descripcionMensaje = document.querySelector('.encriptador__output__mensaje__descripcion');
const btnCopiar = document.querySelector('.encriptador__output__boton__copiar');
const avisoTexto = document.querySelector('.encriptador__input__aviso');

function validarTexto() {
    const regex = /^[a-z\s]*$/;
    
    if (!regex.test(inputArea.value)) {
        avisoTexto.style.display = 'block';
        inputArea.value = inputArea.value.replace(/[^a-z\s]/g, '');
    } else {
        avisoTexto.style.display = 'none';
    }
}

function encriptar() {

    let texto = inputArea.value.toLowerCase();
    if (texto.trim() === "") {
        restaurarEstadoInicial();
        return;
    }
    let textoEncriptado = encriptarTexto(texto);

    ocultarElemento(noMensaje);
    ocultarElemento(descripcionMensaje);

    outputArea.style.backgroundImage = "none";
    outputArea.value = textoEncriptado;
    btnCopiar.style.display = 'block';

    inputArea.value = "";
}

function ocultarElemento(elemento) {
    if (elemento) {
        elemento.style.display = "none";
    }
}

function mostrarElemento(elemento) {
    if (elemento) {
        elemento.style.display = "block";
    }
}

function desencriptar() { 

    let texto = inputArea.value.toLowerCase();
    if (texto.trim() === "") {
        restaurarEstadoInicial();
        return;
    }
    let textoDesencriptado = desencriptarTexto(texto);

    ocultarElemento(noMensaje);
    ocultarElemento(descripcionMensaje);

    outputArea.style.backgroundImage = "none";
    outputArea.value = textoDesencriptado;
    btnCopiar.style.display = 'block';

    inputArea.value = "";
}
function restaurarEstadoInicial() {
    mostrarElemento(noMensaje);
    mostrarElemento(descripcionMensaje);

    // Ocultar el área de salida y el botón de copiar
    outputArea.style.backgroundImage = "url('assets/Muñeco.png')";
    outputArea.value = "";
    btnCopiar.style.display = 'none';
}

function encriptarTexto(texto) {
    return texto
        .replace(/a/g, 'ai')
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
}

function desencriptarTexto(texto) {
    return texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
}

async function copiarTexto() {
    try {
        await navigator.clipboard.writeText(outputArea.value);
    } catch (error) {
        console.error('No se pudo copiar el texto: ', error);
    }
}

// Event Listeners
document.querySelector('.encriptador__input__boton__encriptar').addEventListener('click', encriptar);
document.querySelector('.encriptador__input__boton__desencriptar').addEventListener('click', desencriptar);
document.querySelector('.encriptador__output__boton__copiar').addEventListener('click', copiarTexto);
inputArea.addEventListener('input', validarTexto);  