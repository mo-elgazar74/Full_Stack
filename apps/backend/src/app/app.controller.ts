import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET /api
  @Get()
  getData() {
    return this.appService.getData();
  }

  // GET /api/hello1
  @Get('hello1')
  getHello1() {
    return { message: '👋 Hello World 1 from Backend!' };
  }

  // GET /api/hello2
  @Get('hello2')
  getHello2() {
    return { message: '🔥 Hello World 2 from Backend!' };
  }

  // GET /api/hello3
  @Get('hello3')
  getHello3() {
    return { message: '🚀 Hello World 3 from Backend!' };
  }

  // GET /api/hello4
  @Get('hello4')
  getHello4() {
    return { message: '💻 Hello World 4 from Backend!' };
  }

  // GET /api/hello5
  @Get('hello5')
  getHello5() {
    return { message: '🎯 Hello World 5 from Backend!' };
  }
}
