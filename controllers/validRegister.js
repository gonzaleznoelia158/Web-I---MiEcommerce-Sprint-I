const nombre_sitio = "miecommerce";
const caract_especiales = /[!@#$%^&*()\,.?:{}|<>]/;
const pwd = ["password", "1234", "querty"];

//validaciones del regisro
function validarNombre(value) {
    if (!value) 
        return "El nombre no puede ser nulo.";

    if (value !== value.trim())
        return "El nombre no puede tener espacios en blanco al inicio o final.";
    }

    //validar correo
    function validarCorreo(value) {
        if (!value)
            return "El correo no puede ser nulo.";

        if (value != value.trim())
        return "El correo no puede tener espacios en blanco al inicio o final.";
        
        const ce = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!ce.test(value))
            return "El correo no es valido.";
    }

    //requerimientos de contraseña y correo
    function requerimientos(pwd, correoVal) {
        const nombre = document.getElementById("nombre").value.trim().toLowerCase();
        const apellido = document.getElementById("apellido").value.trim().toLowerCase();
        const c = pwd.toLowerCase();
        const pwdBanned = [...nombre_sitio, nombre, apellido].filter(Boolean);
        return {
            len: pwd.length >8, letter: /[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(pwd),
            num: /\d/.test(pwd), special: caract_especiales.test(pwd), 
            noBanned: !pwdBanned.some(b => b && b.includes(c)),
            noCorreo: correoVal ? pwd.toLowerCase() !== correoVal.toLowerCase() : true,
        };
    }

    //validar contraseña correo
    function validarContrasenia(value) {
        if (!pwd) return "La contraseña no puede estar en blanco.";
        const r = requerimientos(pwd, correoVal);
        if (!r.len) return "La contraseña debe tener más de 8 caracteres.";
        if (!r.letter) return "La contraseña debe contener al menos una letra.";
        if (!r.num) return "La contraseña debe contener al menos un número.";
        if (!r.special) return "La contraseña debe contener al menos un carácter especial.";
        if (!r.noBanned) return "La contraseña no puede contener el nombre del sitio, ni tu nombre o apellido.";
        if (!r.noCorreo) return "La contraseña no puede ser igual a tu correo.";
    }

    //interfaz de usuario para validar en tiempo real
    function validarEnTiempoReal(pwd, correoVal) {
        const r = requerimientos(pwd, correoVal);
        const map = {
            "r-len": r.len,
            "r-letter": r.letter,
            "r-num": r.num,
            "r-special": r.special,
            "r-noban": r.noBanned,
            "r-noemail": r.noCorreo,
        };
        for (const [id, ok] of Object.entries(map)) {
            const li = document.getElementById(id);
            const icon = li.querySelector("i");
            li.className = pwd.length ? (ok ? "ok" : "error") : "";
            icon.className = pwd.length ? (ok ? "ti ti-circle-check" : "ti ti-circle-x") : "ti ti-circle";
        }
    }

    function setField(inputEl, errEl, msg) {
        const hasValue = inputEl.value.length > 0;
        inputEl.className = hasValue ? (msg ? "invalid" : "valid") : "";
        errEl.textContent = msg;
        errEl.className = "error-msg" + (msg ? "show" : "");
    }

    function validarTodo() {
        const n = document.getElementById("nombre").value;
        const a = document.getElementById("apellido").value;
        const c = document.getElementById("correo").value;
        const p =document.getElementById("password").value;
        const allOk = !validarNombre(n) && !validarApellido(a) && !validarCorreo(c) && !validarContrasenia(p);
        document.getElementById("submit-btn").disabled = !allOk;
    }

    //eventos

    document.getElementById("nombre").addEventListener("input", function () {
        setField(this, document.getElementById("err-nombre"), validarNombre(this.value));
        validarTodo();
    });

    document.getElementById("apellido").addEventListener("input", function () {
        setField(this, document.getElementById("err-apellido"), validarApellido(this.value));
        validarTodo();
    });

    document.getElementById("correo").addEventListener("input", function () {
        setField(this, document.getElementById("err-correo"), validarCorreo(this.value));
        validarEnTiempoReal(document.getElementById("password").value, this.value);
        const pwd = document.getElementById("password").value;
        if (pwd) setReqs(pwd, this.value);
        validarTodo();
    });

    document.getElementById("password").addEventListener("input", function () {
        const correoVal = document.getElementById("correo").value;
        setReqs(this.value, correoVal);
        setField(this, document.getElementById("err-password"), validarContrasenia(this.value));
        validarTodo();
    });

    document.getElementById("submit-btn").addEventListener("click", function() {
        document.getElementById("success-banner").className = "success-banner show";
        this.disabled = true;
    })