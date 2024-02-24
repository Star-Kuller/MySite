import { Injectable } from '@angular/core';
import {grpc} from "@improbable-eng/grpc-web";
import ProtobufMessage = grpc.ProtobufMessage;
import {UnaryMethodDefinition} from "@improbable-eng/grpc-web/dist/typings/service";

@Injectable({
  providedIn: 'root'
})
export class GrpcClientService {
  get jwtToken(): string {
    return `Bearer ${this._jwtToken}`;
  }

  set jwtToken(value: string) {
    this._jwtToken = value;
  }

  private _jwtToken : string = '';

  protected async Send<
    TRequest extends ProtobufMessage,
    TResponse extends ProtobufMessage,
    M extends UnaryMethodDefinition<TRequest, TResponse>>(
    request: TRequest,
    clientMethod: M
  ): Promise<TResponse> {
    console.log(`Запрос: ${typeof(clientMethod)} Данные: ${request} Токен: ${this.jwtToken}`)
    return new Promise((resolve, reject) => {
      grpc.unary(clientMethod, {
        request: request,
        host: "http://localhost:5001",
        metadata: this._jwtToken ? { 'Authorization': this.jwtToken } : {},
        onEnd: res => {
          const { status, message } = res;
          console.log(res)
          if (status === grpc.Code.OK && message) {
            resolve(message as TResponse);
          } else {
            reject(new Error(`gRPC request failed with status ${status}`));
          }
        }
      });
    });
  }
  constructor() { }
}
