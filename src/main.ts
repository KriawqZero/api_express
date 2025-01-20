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

app.use('/api', userRoutes);
app.use('/api', postsRoutes);

app.listen(config.port, () => {
  console.log(`Servidor rodando em ${config.server_url}:${config.port}`);
});
