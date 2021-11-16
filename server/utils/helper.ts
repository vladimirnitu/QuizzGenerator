import _ from "lodash"
var url = require('url')

export const returnResponse = (res:any, err:any, data:any, next:any) => {
    if(res && res.req && res.req.probe )
    {
        var urlParts = url.parse(res.req.originalUrl) || {}
        res.req.probe.stop('Send response' + urlParts.pathname) 
    }

    if(!err) {
        res.status(200)
        console.log(res);
        console.log(data)
        return res.send(data)
    }
    else {
        console.log(err)
        next(err)
    }
}