import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
config()

async function bootstrap() {
  
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
          .setTitle('nestjs-app')
          .setDescription('documentation rest api')
          .setVersion("1.0.0")
          .addTag("api")
          .build()
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("/api/docs",app,document)
  
  await app.listen(PORT, ()=> {
    console.log(`Server is listen at ${PORT }`)
  });
}
bootstrap();
