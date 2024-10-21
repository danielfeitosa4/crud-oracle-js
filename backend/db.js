const oracledb = require('oracledb');

async function initialize() {
    try {
        await oracledb.createPool({
            user: 'sys',
            password: 'root123',
            connectString: 'localhost/XEPDB1', // Ajuste conforme sua configuração
            privilege: oracledb.SYSDBA // Adicione esta linha
        });
        console.log('Pool de conexões Oracle criado.');
    } catch (err) {
        console.error('Erro ao conectar no Oracle', err);
    }
}

async function close() {
    await oracledb.getPool().close(0);
}

async function executeQuery(query, binds = [], opts = {}) {
    let conn;
    opts.outFormat = oracledb.OUT_FORMAT_OBJECT;

    try {
        conn = await oracledb.getConnection();
        const result = await conn.execute(query, binds, opts);
        await conn.commit();
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        if (conn) {
            await conn.close();
        }
    }
}

module.exports = { initialize, close, executeQuery };
