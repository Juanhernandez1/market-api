class ConnectionDb {
  static instance;

  constructor(Sequelize, Config, test) {
    if (ConnectionDb.instance) {
      return ConnectionDb.instance;
    }
    this.InitializeConnectionDb(Sequelize, Config);
    this.TestConnectionDb();
    this.state = test;
    ConnectionDb.instance = this;
  }

  InitializeConnectionDb(Sequelize, Config) {
    const { url, nombreDb, usuarioDb, claveDb, configuracionCnUrl, configuracionCnlocal } = Config;

    if (url != null) {
      this.conexion = new Sequelize(url, configuracionCnUrl);
      console.log("Configurando conexion a la Base de Datos.");
    } else {
      this.conexion = new Sequelize(nombreDb, usuarioDb, claveDb, configuracionCnlocal);
      console.log("Configurando conexion a la Base de Datos.");
    }
  }

  TestConnectionDb() {
    (async () => {
      try {
        await this.conexion.authenticate();
        console.log("Conexión Establecida Satisfactoriamente.");
      } catch (error) {
        console.error("No se puede conectar a la base de datos.");
      }
    })();
  }
}

module.exports = ConnectionDb;
