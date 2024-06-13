import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // route " " /=> API (restful)
  @Render("home")
  getHello() {
    const message = this.appService.getHello();
    return {
      massage : message
    }
    // return "this.appService.getHello()";
  }
}
