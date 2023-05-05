/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

async function getCollectionName(ctx) {
    //const mspid = ctx.clientIdentity.getMSPID();
    const collectionName = 'CollectionOrder';
    return collectionName;
}

class OrderContract extends Contract {

    async orderExists(ctx, orderId) {
        const collectionName = await getCollectionName(ctx);
        const data = await ctx.stub.getPrivateDataHash(collectionName, orderId);
        return (!!data && data.length > 0);
    }

    async createOrder(ctx, orderId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'customer-auto-com') {
            const exists = await this.orderExists(ctx, orderId);
            if (exists) {
                throw new Error(`The asset order ${orderId} already exists`);
            }

            const orderAsset = {};

            const transientData = ctx.stub.getTransient();
            if (transientData.size === 0 ||
                !transientData.has('productType') ||
                !transientData.has('productName') ||
                !transientData.has('quantity') ) {
                throw new Error('The private data was not specified in transient data. Please try again.');
            }
            orderAsset.productType = transientData.get('productType').toString();
            orderAsset.productName = transientData.get('productName').toString();
            orderAsset.quantity = transientData.get('quantity').toString();
            orderAsset.approved = 'false';
            orderAsset.assetType = 'order';

            const collectionName = await getCollectionName(ctx);
            await ctx.stub.putPrivateData(collectionName, orderId, Buffer.from(JSON.stringify(orderAsset)));
        }

        else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }

    }

    async readOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The asset order ${orderId} does not exist`);
        }
        let privateDataString;
        const collectionName = await getCollectionName(ctx);
        const privateData = await ctx.stub.getPrivateData(collectionName, orderId);
        privateDataString = JSON.parse(privateData.toString());
        return privateDataString;
    }

    async approveOrder(ctx, orderId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'retailer-auto-com') {
            let privateDataString;
            const collectionName = await getCollectionName(ctx);
            console.log(collectionName);
            // eslint-disable-next-line no-undef
            const privateData = await ctx.stub.getPrivateData(collectionName, orderId);
            console.log('***************');
            console.log('private Data', privateData);
            privateDataString = JSON.parse(privateData.toString());
            console.log('privatestring', privateDataString);
            privateDataString.approved = 'true';
            // eslint-disable-next-line no-undef
            console.log('privatestring', privateDataString);
            await ctx.stub.putPrivateData(collectionName, orderId, Buffer.from(JSON.stringify(privateDataString)));

        } else {
            throw new Error(
                `This user ${mspID} is not able to perform this action`
            );
        }
    }

    async deleteOrder(ctx, orderId) {
        const mspID = ctx.clientIdentity.getMSPID();
        if (mspID === 'customer-auto-com') {
            const exists = await this.orderExists(ctx, orderId);
            if (!exists) {
                throw new Error(`The asset order ${orderId} does not exist`);
            }
            const collectionName = await getCollectionName(ctx);
            await ctx.stub.deletePrivateData(collectionName, orderId);
        }

        else {
            return `User under the following MSP: ${mspID} cannot perform this action`;
        }
    }


    async queryAllOrders(ctx){
        const queryString={
            selector:{
                assetType:'order'
            }
        };
        let collectionName=await getCollectionName(ctx);
        let resultIterator=await ctx.stub.getPrivateDataQueryResult(collectionName,JSON.stringify(queryString));
        let result=await this.getAllResults(resultIterator.iterator);
        return JSON.stringify(result);
    }
    async getAllResults(iterator){
        let allResult=[];
        for(let res=await iterator.next();!res.done;res=await iterator.next()){
            let jsonRes={};
            jsonRes.Key=res.value.key ;
            jsonRes.Record=JSON.parse(res.value.value.toString());
            allResult.push(jsonRes);
        }
        await iterator.close();
        return allResult;

    }
}

module.exports = OrderContract;
