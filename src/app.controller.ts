import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('penjumlahan')
  getPenjumlahan(): number {
    return this.appService.getPenjumlahan();
  }

  @Get('penjumlahanParameter')
  getwithParamerterPenjumlahan(): number {
    return this.appService.getwithParamerterPenjumlahan(2,5);
  }
}
