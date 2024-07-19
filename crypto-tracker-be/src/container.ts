
import { CryptoDao } from "./buisness/CryptoService/CryptoDao";
import {CryptoDaoMongo} from "./buisness/CryptoService/CryptoDaoMongo";
import { CryptoDataDao } from "./buisness/CryptoService/CryptoDataDao";
import { CryptoDataDaoMongo } from "./buisness/CryptoService/CryptoDataDaoMongo";
import { CryptoService } from "./buisness/CryptoService/CryptoService";
import { getMongo } from "./clients/mongodb/mongo";

export interface ServiceContainer {

    // daos
    cryptoDao: CryptoDao,
    cryptoDataDao: CryptoDataDao,

    // service
    cryptoService: CryptoService
}


export const createService = () => {

    // daos
    const cryptoDao = new CryptoDaoMongo(getMongo());
    const cryptoDataDao = new CryptoDataDaoMongo(getMongo());

    // services
    const cryptoService = new CryptoService(cryptoDao, cryptoDataDao);

    const services: ServiceContainer = {

        // daos
        cryptoDao,
        cryptoDataDao,
    
        // service
        cryptoService,
    
    }

    return services;
};


const service = createService();

//for quick use anywhere out of service context
export const getService = () => {
    return service;
}