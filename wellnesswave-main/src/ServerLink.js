const deployStatus = "local"
const localUrl =  "http://localhost:3002"
const deployedUrl = "https://wellnesswave-backend.onrender.com"
export const serverUrl = deployStatus === "local"?  localUrl: deployedUrl;
export const CHAT_APP_ID = 203798814;
export const CHAT_APP_SECRET = "24954da6977c65393836e89baef8264a";