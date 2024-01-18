const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chat Application API",
      version: "1.0.0",
      description: "Documentation for the chat application API",
      contact: {
        email: "degisew.mengist21@gmail.com",
      },
    },
    servers: [
      {
          url: process.env.LOCAL_HOST,
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerOptions = swaggerJsdoc(options);

module.exports = swaggerOptions;
