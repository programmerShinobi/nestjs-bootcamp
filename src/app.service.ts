import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `hello world`;
  }

  getPenjumlahan(): number {
    let penjumlahan = 4 * 3;
    return penjumlahan;
  }

  getwithParamerterPenjumlahan(a: number,b: number): number {
    let penjumlahanParam = a * b;
    return penjumlahanParam;
  }
}
