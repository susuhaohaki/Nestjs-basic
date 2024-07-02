import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService : ConfigService
  ) {}
  @Get() // route " " /=> API (restful)
  @Render("home")
  getHello() {
    //port from .env
    console.log("check port =", this.configService.get<string>("PORT"))
    const message = this.appService.getHello();
    return {
      massage : message
    }
    // return "this.appService.getHello()";
  }
}
