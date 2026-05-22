const db = require('./database/db');

const insertarUsuario = db.prepare(`
    INSERT INTO users (name, email, password_hash)
    VALUES (?, ?, ?)
`);

try {
    insertarUsuario.run('Nery Lazarini', 'neryjlc@gmail.com', '1234');
} catch (error) {
    if (error.code !== 'SQLITE_CONSTRAINT_UNIQUE') {
    console.error(error);
    }
}

const leerUsuarios = db.prepare('SELECT * FROM users');
const usuariosGuardados = leerUsuarios.all();

console.table(usuariosGuardados);