import { Injectable } from '@angular/core';
import {AuthorizationService as Client} from "../generated/authorization_pb_service";
import {LoginRequest, RegistrationRequest, TokenReply} from "../generated/authorization_pb";
import {Login} from "../models/Account/Login";
import {Registration} from "../models/Account/Registration";
import {GrpcClientService} from "./grpc-client.service";
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends GrpcClientService{


  async Login(login : Login)  {
    let request = new LoginRequest();
    request.setEmail(login.Email);
    request.setPassword(login.Password);
    try {
      let reply : TokenReply = await this.Send(request, Client.Login);
      let result= reply.toObject() as TokenReply.AsObject;
      if(!result.error)
        this.jwtToken = result.jwttoken;
      else
        console.warn(result.error)
    }
    catch (e){
      console.error(`Ошибка входа: ${e}`);
    }
  }

  async Registration(registration : Registration)  {
    let request = new RegistrationRequest();
    request.setName(registration.Name)
    request.setEmail(registration.Email);
    request.setPassword(registration.Password)
    try {
      let reply = await this.Send(request, Client.Registration);
      let result = reply.toObject() as TokenReply.AsObject;
      if(!result.error)
        this.jwtToken = result.jwttoken;
      else
        console.warn(result.error)
    }
    catch (e){
      console.error(`Ошибка входа: ${e}`);
    }
  }
}
