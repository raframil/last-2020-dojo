const https = require('https');

class MessagesServices {

    constructor(options) {
        this.options = {
            'hostname': 'dojo-api.gateway.linkapi.com.br',
            'path': '/v1/simulate',
            'headers': {
                'Authorization': `Basic ${process.env.AUTH}`
            },
            'maxRedirects': 20
        }
    }

    async create(methodReq, reqBody) {
        return new Promise((resolve, reject) => {
            this.options.method = methodReq;
            try {
                const request = https.request(this.options, (response) => {
                    console.log('http request')
                    const chunks = []
        
                    response.on("data", (chunk) => {
                        chunks.push(chunk)
                    })
        
                    response.on("end", async () => {
                        const responseBody = JSON.parse(Buffer.concat(chunks).toString())
                        
                        console.log(responseBody)
        
                        const requestResponse = responseBody.approved ? await this.approvedRequest(reqBody, responseBody) : await this.reprovedRequest(reqBody);
                        resolve(requestResponse)
                    })
        
                    response.on("error", (error) => {
                        console.error(error)
                        reject(error)
                    })
                })
                
                request.on("error", (error) => {
                    reject(error)
                })

                //request.write(reqBody)
                request.end()
            } catch (error) {
                console.error(error)
            }
        })
    }

    async approvedRequest(reqBody, responseBody) {
        this.options.method = 'POST';
        this.options.path = '/v1/message';

        reqBody.simulationId = responseBody.id

        const request  = https.request(this.options, (response) => {
            const chunks = []

            response.on("data", (chunk) => {
                chunks.push(chunk)
            })

            response.on("end", () => {
                const body = JSON.parse(Buffer.concat(chunks).toString())
                return JSON.stringify(body, null, 2)
            })

            response.on("error", (error) => {
                console.error(error)
            })
        })
        
        request.write(JSON.stringify(reqBody))
        request.end()
        return reqBody;
    }

    async reprovedRequest(reqBody, responseBody) {
        this.options.method = 'POST';
        this.options.path = '/v1/error-stack';

        reqBody = { id: reqBody.codigo }

        const request  = https.request(this.options, (response) => { 
            const chunks = []

            response.on("data", (chunk) => {
                chunks.push(chunk)
            })

            response.on("end", () => {
                const body = JSON.parse(Buffer.concat(chunks).toString())
                return JSON.stringify(body, null, 2)
            })

            response.on("error", (error) => {
                console.error(error)
            })
        })
        request.write(JSON.stringify(reqBody))
        request.end()
        return reqBody;
    }
}

module.exports = MessagesServices;