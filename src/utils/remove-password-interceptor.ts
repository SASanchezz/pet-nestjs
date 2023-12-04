import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { removeKey } from './utils';

export interface Response<T> {
  data: T;
}

@Injectable()
export class RemovePasswordInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map((data) => removeKey(data, 'password')));
  }
}
