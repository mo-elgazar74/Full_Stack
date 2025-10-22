import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return { message: '✅ Hello M4kode Team' };
  }
}
