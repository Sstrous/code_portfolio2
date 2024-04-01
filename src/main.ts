import { config } from 'dotenv';
config();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { urlencoded, json } from 'express';
import * as fs from "fs";

async function bootstrap() {
	const httpsOptions = {
		key: fs.readFileSync('./localhost-key.pem'),
		cert: fs.readFileSync('./localhost.pem'),
	};
	const app = await NestFactory.create(AppModule, { cors: true });
	const globalPrefix = 'api';

	const port = process.env.PORT || 3333;

	app.setGlobalPrefix(globalPrefix);
	app.use(json({ limit: '50mb' }));
	app.use(urlencoded({ extended: true, limit: '50mb' }));
	await app.listen(port);

	Logger.log(
		`🚀 ${process.env.PROJECT_NAME
		} API is running on: ${await app.getUrl()}`,
	);
}
bootstrap();
