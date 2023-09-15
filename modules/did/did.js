/**
 * DID関連のメソッドを実装したモジュールファイル
 */

// did用のモジュールを読み込む


const { anchor, DID, generateKeyPair, sign, verify, resolve} = require('@decentralized-identity/ion-tools');
const { webcrypto } = require('node:crypto');

if (!globalThis.crypto) globalThis.crypto = webcrypto;
// @ts-ignore

const generateDID = async() => {

      // Generate keys and ION DID
let { publicJwk, privateJwk}= await generateKeyPair();
let did = new DID({
  content: {
    publicKeys: [
      {
        id: 'key-1',
        type: 'EcdsaSecp256k1VerificationKey2019',
        publicKeyJwk: publicJwk,
        purposes: [ 'authentication' ]
      }
    ],
    services: [
      {
        id: 'domain-1',
        type: 'LinkedDomains',
        serviceEndpoint: 'https://idq-api.vercel.app'
      }
    ]
  }
});

// Generate and publish create request to an ION node
let anchorResponse;

let createRequest;
try{
    
      let uri = await did.getURI()
      createRequest = await did.generateRequest();
      
      const jws = await sign({ payload: 'hello world', privateJwk });
      const isLegit =  verify({ jws, publicJwk });
      const didDoc = await resolve(longFormDID);
      console.log('allinfpooooooooooooooo',isLegit, didDoc, createRequest)
      anchorResponse = await anchor(createRequest,{challengeEndpoint:'https://beta.ion.msidentity.com'});



} catch(err){console.log('err during register',err)}
            //console.log('req',request)
            //let response = {}//await request.submit();
      
            return{
                  createRequest,
                  did
            }

};

module.exports = {
      generateDID
}




// // Store the key material and source data of all operations that have been created for the DID
// let ionOps = await did.getAllOperations();
// await writeFile('./ion-did-ops-v1.json', JSON.stringify({ ops: ionOps }));

// /**
//  * generateDID function
//  */
// const generateDID = async() => {
//       try{
//       // create key pair
//       let authnKeys = await generateKeyPair('secp256k1');
//       // new DID
//       console.log('authkeyyyyyyyyy',authnKeys)
//       let did = new DID({
//             content: {
//                   publicKeys: [
//                         {
//                               id: 'key-1',
//                               type: 'EcdsaSecp256k1VerificationKey2019',
//                               publicKeyJwk: authnKeys.publicJwk,
//                               purposes: [ 'authentication' ]
//                         }
//                   ],
//                   services: [
//                         {
//                               id: 'idq',
//                               type: 'LinkedDomains',
//                               serviceEndpoint: 'http://localhost:3000'
//                         }
//                   ]
//             }
//       });

//       // anchor DID
      
//       const requestBody = await did.generateRequest(0);
//       console.log('DIDDDDDD',did, requestBody)
//       let response;
//       try{
//              response =  await anchor(requestBody)
//       } catch(err){}
//       //console.log('req',request)
//       //let response = {}//await request.submit();

//          return{
//             response,
//             did
//          }
   
//       } catch(err) {console.log(err)}
// };

// module.exports = {
//       generateDID
// }