// package: v1
// file: authorization.proto

import * as authorization_pb from './authorization_pb';
import { grpc } from '@improbable-eng/grpc-web';

var AuthorizationService = (function () {
  function AuthorizationService() {}
  AuthorizationService.serviceName = "v1.AuthorizationService";
  return AuthorizationService;
}());

AuthorizationService.Login = {
  methodName: "Login",
  service: AuthorizationService,
  requestStream: false,
  responseStream: false,
  requestType: authorization_pb.LoginRequest,
  responseType: authorization_pb.TokenReply
};

AuthorizationService.Registration = {
  methodName: "Registration",
  service: AuthorizationService,
  requestStream: false,
  responseStream: false,
  requestType: authorization_pb.RegistrationRequest,
  responseType: authorization_pb.TokenReply
};

exports.AuthorizationService = AuthorizationService;

function AuthorizationServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AuthorizationServiceClient.prototype.login = function login(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AuthorizationService.Login, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

AuthorizationServiceClient.prototype.registration = function registration(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AuthorizationService.Registration, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.AuthorizationServiceClient = AuthorizationServiceClient;

