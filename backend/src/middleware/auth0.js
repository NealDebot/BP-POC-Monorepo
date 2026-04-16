import { auth } from 'express-oauth2-jwt-bearer';
import {auth0Config} from '../config/auth0.js'

export const checkJwt = auth(auth0Config);