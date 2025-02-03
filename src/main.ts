import express from "express";
import { config } from "./config";
import userRoutes from "./routes/userRoutes";
import postsRoutes from "./routes/postsRoutes";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', postsRoutes);
app.use('/api', userRoutes);

app.listen(config.port, () => {
  console.clear();
  console.log(`Servidor rodando em ${config.server_url}:${config.port}`);
  console.log(`Documentação em ${config.server_url}:${config.port}/api-docs`);
  console.log(`API em ${config.server_url}:${config.port}/api`);
});
