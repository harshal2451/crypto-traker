import axios from "axios";
import { CryptoDao, Crypto } from "./CryptoDao";
import { io } from "../..";
import { CryptoDataDao } from "./CryptoDataDao";
import { getEnv } from "../../env";

export class CryptoService {
    private readonly CRYPTO_URL = getEnv().CRYPTO_URL;
    private readonly CRYPTO_API_KEY = getEnv().CRYPTO_API_KEY;
    constructor(
        
        private dao: CryptoDao,
        private cryptoDataDao: CryptoDataDao
    ) {
        // store crypto detail to db and emit in 5 seconds to front end side 
        setInterval(() => this.fetchStoreCryptoDetail(), 5000);
    }

    /**
     * Fetch crypto detail from the third party api
     * @returns 
     */
    async fetchCryptoDetail(){
    
            const API_KEY = this.CRYPTO_API_KEY;
            const endpoint = this.CRYPTO_URL
    
            const cryptoDetail = await axios.post(endpoint,{
                currency: "USD",
                sort: "rank",
                order: "ascending",
                offset: 0,
                limit: 5,
                meta: true,
            }, {
                headers: {
                    "content-type": "application/json",
                    "x-api-key": API_KEY,    
                }
            });
            return cryptoDetail.data;
    }

    /**
     * Fetch and store the crypto entity and crypto data
     */
    async fetchStoreCryptoDetail(){

        try{

            // fetch crypto detail from the third party api
            const cryptoDetail = await this.fetchCryptoDetail();
            let cryptoCurrencies: string[] = [];
            const cryptoPromises = cryptoDetail.map(async (crypto: any) => {
                
                // store crypto detail in master collection
                const cryptoExist = await this.dao.getByName(crypto.name);
                let cryptoId;
                if(!cryptoExist){
                    cryptoId = await this.dao.create({
                        name: crypto.name,
                        symbol: crypto.webp64,
                        rank: crypto.rank
                    });
                }else{
                    cryptoId = cryptoExist._id;
                }
                
                // Store crypto data with crypto id
                await this.cryptoDataDao.create({
                    crypto_id: cryptoId,
                    current_price: crypto.rate,
                    market_cap: crypto.rate * crypto.circulatingSupply,
                    volume: crypto.volume,
                    change_price: crypto.delta.hour,
                    change_price_24: crypto.delta.day,
                })

                cryptoCurrencies.push(cryptoId);
            })
    
            await Promise.all(cryptoPromises);

            // Emit the latest data for each subscribed cryptocurrency
            //fetch last 20 records from the mongodb and emit
            cryptoCurrencies.map(async (crypto: string) => {

                const cryptoDetail = await this.getCryptoDetail(crypto.toString());
                io.to(crypto.toString()).emit('cryptoData', cryptoDetail.data);
            });

            await Promise.all(cryptoDetail);
        }catch(err: any){
            console.log(err);
        }
    }
    
    /**
     * Fetch crypto detail
     * @param crypto_id 
     * @returns 
     */
    async getCryptoDetail(crypto_id: string){
        const cryptoDetail = await this.dao.getById(crypto_id);
        return cryptoDetail;
    }

    /**
     * Fetch crypto currencies
     * @returns 
     */
    async getCryptoCurrencies(){
        const cryptoDetail = await this.dao.getAllCrypto();
        return cryptoDetail;
    }


}




