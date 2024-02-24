import { Injectable } from '@angular/core';
import {grpc} from "@improbable-eng/grpc-web";
import {AuthorizationService as Client} from "../generated/authorization_pb_service";
import {LoginRequest, RegistrationRequest, TokenReply} from "../generated/authorization_pb";
import {Login} from "../models/Account/Login";
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {


  Login(login : Login)  {

    let request = new LoginRequest()
    request.setEmail(login.Email)
    request.setPassword(login.Password)

    grpc.unary(Client.Login, {
      request: request,
      host: "http://localhost:5001",
      onEnd: res => {
        const { status, statusMessage, headers, message, trailers } = res;
        if (status === grpc.Code.OK && message) {
          console.log(message.toObject() as TokenReply.AsObject);
        }
      }
    })
  }

}
