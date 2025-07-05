const key = process.env.PINATA_API_KEY;
const secret = process.env.PINATA_API_SECRET;
const jwt = process.env.PINATA_JWT;

import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: "example-gateway.mypinata.cloud",
});

export const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    // return fetch(url, {
    //     method: "POST",
    //     headers: {
    //         Authorization: `Bearer ${jwt}`,
    //         'Content-Type': 'application/json'
    //     },
    //     // headers: {
    //     // "Content-Type": "application/json",
    //     // pinata_api_key: key,
    //     // pinata_secret_api_key: secret,
    //     // },
    //     body: JSONBody,
    // })
    // .then(async (response) => {
    //     if (!response.ok) {
    //         // Handle HTTP errors
    //         const errorData = await response.json();
    //         throw new Error(errorData.error || "Upload failed");
    //     }
    //     const data = await response.json();
    //     return {
    //         success: true,
    //         pinataURL: "https://gateway.pinata.cloud/ipfs/" + data.IpfsHash,
    //     };
    // })
    // .catch((error) => {
    //     console.log(error);
    //     return {
    //         success: false,
    //         message: error.message,
    //     };
    // });

    try {
        const file = new File([JSON.stringify(JSONBody)], "proposal.txt", { type: "text/plain" });
        const upload = await pinata.upload.public.file(file);
        console.log(upload);
        return upload;
    } 
    catch (error) {
        console.log(error);
    }
};

// export const uploadFileToIPFS = async(file) => {
//     const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//     //making axios POST request to Pinata ⬇️

//     let data = new FormData();
//     data.append('file', file);

//     const metadata = JSON.stringify({
//         name: 'testname',
//         keyvalues: {
//             exampleKey: 'exampleValue'
//         }
//     });
//     data.append('pinataMetadata', metadata);

//     //pinataOptions are optional
//     const pinataOptions = JSON.stringify({
//         cidVersion: 0,
//         customPinPolicy: {
//             regions: [
//                 {
//                     id: 'FRA1',
//                     desiredReplicationCount: 1
//                 },
//                 {
//                     id: 'NYC1',
//                     desiredReplicationCount: 2
//                 }
//             ]
//         }
//     });
//     data.append('pinataOptions', pinataOptions);

//     return axios
//         .post(url, data, {
//             maxBodyLength: 'Infinity',
//             headers: {
//                 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//                 pinata_api_key: key,
//                 pinata_secret_api_key: secret,
//             }
//         })
//         .then(function (response) {
//             console.log("image uploaded", response.data.IpfsHash)
//             return {
//                success: true,
//                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//            };
//         })
//         .catch(function (error) {
//             console.log(error)
//             return {
//                 success: false,
//                 message: error.message,
//             }

//     });
// };
