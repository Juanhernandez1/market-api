const ErrorMessage = {
  ER500: {
    error: {
      status: 500,
      message: "Error Interno Del Servidor \u{2757} ",
      sugerencia: "Intentar mas tarde \u{1F550} o Notifique al encargado de Soporte \u{1F514}"
    }
  },
  ER404: {
    error: {
      status: 404,
      message: "Solicitud No encontrad \u{1F50D} \u{26A0}"
    }
  },
  ER401: {
    error: {
      status: 401,
      message: "Acceso Denegado",
      otros: "No Esta autorizado  \u{1F512}",
      sugerencia: "Notifique a Su Superior"
    }
  },
  ER403: {
    error: {
      status: 403,
      message: "Acceso Denegado",
      otros: "No pose permisos para esta petición  \u{1F512}"
    }
  },
  ER405: {
    error: {
      status: 405,
      message: "Método no Permitido",
      otros: "No esta Permitido Eliminar Datos De Forma Directa \u{1F6D1}"
    }
  },
  ERDB01: {
    error: {
      message: "Error de La base de datos \u{26A0}",
      otros: "puede estar ingresando un identificador existente",
      sugerencia: "cambie el identificador"
    }
  },
  ERDB02: {
    error: {
      message: "Error  La base de datos \u{26A0}",
      otros: "El identificador no existe ",
      sugerencia: "verifique el identificador que ingresa este correctamente escrito"
    }
  },
  ERDB404: {
    message: "No se Encontraron Registros \u{1F50D}",
    otros: "No Se Pude Acceder A La Base De Datos \u{1F6A7}"
  },
  ERDB404LIKE: {
    message: "No se Encontraron Coincidencias En los registros \u{1F50D}",
    otros: "No Se Pude Acceder A La Base De Datos \u{1F6A7}"
  },
  ERDBLOGIN: {
    error: {
      message: "Error de Acceso No existe Usuario con Las Credenciales dadas"
    }
  },
  ERMET_PATH: {
    error: {
      message: "El Método No Es el Correcto para La Petición"
    }
  },
  ERREMP: {
    error: {
      message: "No se puede Registrar El usuario \u{26A0}",
      otros: "Es Posible Que Exista Un Registro Con El Email Ingresado",
      sugerencias: "Cambie El Email o Restablesca Su Contraseña Si la a Olvidado"
    }
  }
};

module.exports = ErrorMessage;
