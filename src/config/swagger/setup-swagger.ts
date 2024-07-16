import { config } from "../../common/env/environment";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: config.swagger.title,
      description: config.swagger.description,
      contact: {
        name: "Developer",
      },
    },
  },
};
