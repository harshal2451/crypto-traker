import express, { Router } from "express";
import { ServiceContainer } from "../../container";
import status from 'http-status-codes';
import { ResponseFormat } from "../../core/responseFormat";
import Boom from "boom";
import { messages } from "../constants";

const response = new ResponseFormat();

export const configure = (app: Router, container: ServiceContainer) => {
    const group = express.Router();

    group.get('/:id', (req, res) => {
        container.cryptoService.getCryptoDetail(req.params.id as string).then(cryptoDetail => {
            response.handleSuccess(res, {
                type: messages.SUCCESS,
                code: status.OK,
                content: cryptoDetail
            });
        }).catch((err) => {
            const { output } = Boom.badRequest(err.message);
            return response.handleError(res, output);
        });
    });

    group.get('/', (req, res) => {
        container.cryptoService.getCryptoCurrencies().then(currencies => {
            response.handleSuccess(res, {
                type: messages.SUCCESS,
                code: status.OK,
                content: currencies
            });
        }).catch((err) => {
            const { output } = Boom.badRequest(err.message);
            return response.handleError(res, output);
        });
    });


    app.use('/crypto', group);

}