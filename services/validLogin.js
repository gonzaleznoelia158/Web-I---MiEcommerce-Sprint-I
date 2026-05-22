const caract_especiales = /[!@#$%^&*()\,.?:{}|<>]/;

//validar login
function validarCorreo(value) {
    if (!value)
        return "El correo no puede ser nulo.";

    if (value != value.trim())
        return "El correo no puede tener espacios en blanco al inicio o final.";
    
    const ce = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!ce.test(value))
        return "El correo no es valido.";
}

function validarContrasenia(value) {
    if (!value) 
        return "La contraseña no puede estar en blanco.";
    if (value != value.trim())
        return "La contraseña no puede tener espacios en blanco al inicio o final.";
}

//interfaz para mostrar errores
function setField(inputEl, errEl, msg) {
    const hasValue = inputEl.value.length > 0;
    inputEl.className = hasValue ? (msg ? "invalid" : "valid") : "";
    errEl.textContent = msg;
    errEl.className = "error-msg" + (msg ? " show" : "");
}

function validarTodo() {
    const c = document.getElementById("correo").value;
    const p = document.getElementById("password").value;
    
    //boton que se habilita solo si ambos campos pasan las validaciones básicas
    const allOk = !validarCorreo(c) && !validarContrasenia(p);
    document.getElementById("submit-btn").disabled = !allOk;
}

//eventos para validar 
document.getElementById("correo").addEventListener("input", function () {
    setField(this, document.getElementById("err-correo"), validarCorreo(this.value));
    validarTodo();
});

document.getElementById("password").addEventListener("input", function () {
    setField(this, document.getElementById("err-password"), validarContrasenia(this.value));
    validarTodo();
});