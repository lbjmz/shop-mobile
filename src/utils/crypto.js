import { Date } from "core-js";
import CryptoJS from "crypto-js";
const keyword = "shopkey-password";

export const encrypto = (word) => {
  const time = Date.now();
  //转码
  const wordStr = CryptoJS.enc.Utf8.parse(time + "" + word);
  const key = CryptoJS.enc.Utf8.parse(keyword);
  //加密
  const cryptoStr = CryptoJS.AES.encrypt(wordStr, key, {
    mode: CryptoJS.mode.ECB, //模式
    padding: CryptoJS.pad.Pkcs7, //补零
  });
  return cryptoStr.toString();
};

export const decrypto = (word) => {
  const key = CryptoJS.enc.Utf8.parse(keyword);
  //加密
  const cryptoStr = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB, //模式
    padding: CryptoJS.pad.Pkcs7, //补零
  }); 
  return CryptoJS.enc.Utf8.stringify(cryptoStr).toString();
};
