#!/usr/bin/env node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm

import DescopeClient from '@descope/node-sdk';
import express from 'express';
// eslint-disable-next-line import/default
import ViteExpress from 'vite-express';
import type { Response, Request, NextFunction } from 'express';
import type { Params, ParamsDictionary } from 'express-serve-static-core';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

type RequestHandler<ReqParams, ResBody, ReqBody> = (
  req: Request<ReqParams, ResBody, ReqBody>,
  res: Response,
  next: NextFunction,
) => Promise<void>;

// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const { auth } = require('express-oauth2-jwt-bearer');
// const authConfig = require('./src/auth_config.json');

// const app = express();

// const port = process.env.API_PORT || 3001;
// const appPort = process.env.SERVER_PORT || 3000;
// const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

// eslint-disable-next-line max-len
// if (!authConfig.domain || !authConfig.audience || authConfig.audience === 'YOUR_API_IDENTIFIER') {
//   console.log(
// eslint-disable-next-line max-len
//     'Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values',
//   );

//   process.exit();
// }

// app.use(morgan('dev'));
// app.use(helmet());
// app.use(cors({ origin: appOrigin }));

// const checkJwt = auth({
//   audience: authConfig.audience,
//   issuerBaseURL: `https://${authConfig.domain}/`,
//   algorithms: ['RS256'],
// });

// app.get('/api/external', checkJwt, (req, res) => {
//   res.send({
//     msg: 'Your access token was successfully validated!',
//   });
// });

// app.listen(port, () => console.log(`API Server listening on port ${port}`));

export const asyncRoute =
  <
    ReqParams extends Params = ParamsDictionary,
    ResBody = Record<string, unknown>,
    ReqBody = Record<string, unknown>,
  >(
    fn: RequestHandler<ReqParams, ResBody, ReqBody>,
  ) =>
  (req: Request<ReqParams, ResBody, ReqBody>, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const authenticate = async (req: Request, _res: Response) => {
  const authHeader = req.headers.authorization;
  const sessionToken = authHeader?.split(` `)[1] ?? ``;

  let descopeClient;
  let isAuthenticated = false;

  try {
    descopeClient = DescopeClient({ projectId: `P2ViY8BGoztZ1BiDPinPsOWSdvDQ` });
  } catch (error) {
    if (typeof error === `string`) {
      console.log(`failed to initialize: ${error}`);
    }
  }

  try {
    const authInfo = await descopeClient?.validateSession(sessionToken);
    console.log(`Successfully validated user session:`);
    console.log(authInfo);
    isAuthenticated = true;
  } catch (error) {
    if (typeof error === `string`) {
      console.log(`Could not validate user session ${error}`);
    }
  }

  return isAuthenticated;
};

const numbers = async (req: Request, res: Response) => {
  if (!(await authenticate(req, res))) {
    res.status(401).send({ error: `Access denied` });
    return;
  }

  res.status(200).send({ number: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] });
};

const app = express();

app.use(logger(`dev`));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(__dirname));

app.get(`/numbers`, asyncRoute(numbers));

ViteExpress.listen(app, 5173, () => console.log(`Server is listening...`));
