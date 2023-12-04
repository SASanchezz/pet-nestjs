import { LoggerService } from '@nestjs/common';
import fs from 'fs';

export class MyLogger implements LoggerService {
  log(message: string) {
    this.writeToFile('📢 ' + message);
  }

  error(message: string, trace: string) {
    this.writeToFile('❌ ' + message);
    this.writeToFile('🔍 Stack Trace: ' + trace);
  }

  warn(message: string) {
    this.writeToFile('⚠️ ' + message);
  }

  debug(message: string) {
    this.writeToFile('🐞 ' + message);
  }

  private writeToFile(message: string) {
    console.log(process.cwd() + '/logs/app.log');

    if (!fs.existsSync(process.cwd() + '/logs/app.log')) {
      fs.writeFileSync(process.cwd() + '/logs/app.log', '');
    }

    fs.appendFileSync(process.cwd() + '/logs/app.log', message + '\n\n');
    console.log(message);
  }
}
