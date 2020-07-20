import JSencrypt from 'node-jsencrypt';
const puk = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUQ54jg+rRCne4AKQj2prTcBGKBYCd/NMaDbvR/r6SyjI+NypUFlTW4rwSadJjYimACtyddKae461zFQQOBIBnjPy8hyTzEBMCeD+ZNAX30wk6kj6rdsit/oaEG8CVGBrvY6tQOjAnoDDVlHIX+N3KqFckmpVbmLZW+MFrzXrG4QIDAQAB";
export default function dick(quer) {
    let RSAEncrypt = new JSencrypt();
    RSAEncrypt.setPublicKey(puk);
    return RSAEncrypt.encrypt(quer);
}