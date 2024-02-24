// package: v1
// file: authorization.proto

import * as authorization_pb from "./authorization_pb";
import {grpc} from "@improbable-eng/grpc-web";

type AuthorizationServiceLogin = {
  readonly methodName: string;
  readonly service: typeof AuthorizationService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof authorization_pb.LoginRequest;
  readonly responseType: typeof authorization_pb.TokenReply;
};

type AuthorizationServiceRegistration = {
  readonly methodName: string;
  readonly service: typeof AuthorizationService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof authorization_pb.RegistrationRequest;
  readonly responseType: typeof authorization_pb.TokenReply;
};

export class AuthorizationService {
  static readonly serviceName: string;
  static readonly Login: AuthorizationServiceLogin;
  static readonly Registration: AuthorizationServiceRegistration;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class AuthorizationServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  login(
    requestMessage: authorization_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: authorization_pb.TokenReply|null) => void
  ): UnaryResponse;
  login(
    requestMessage: authorization_pb.LoginRequest,
    callback: (error: ServiceError|null, responseMessage: authorization_pb.TokenReply|null) => void
  ): UnaryResponse;
  registration(
    requestMessage: authorization_pb.RegistrationRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: authorization_pb.TokenReply|null) => void
  ): UnaryResponse;
  registration(
    requestMessage: authorization_pb.RegistrationRequest,
    callback: (error: ServiceError|null, responseMessage: authorization_pb.TokenReply|null) => void
  ): UnaryResponse;
}

