// import React, { useEffect, useState } from 'react';
// import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
// import '@zegocloud/zimkit-react/index.css'
// import { CHAT_APP_ID, CHAT_APP_SECRET } from '../../../ServerLink';

// const id = Math.floor(Math.random()*1000)
// const ChatsPage = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = localStorage.getItem("token");

//     const [appConfig,setAppConfig] = useState({
//         appID: CHAT_APP_ID,
//         serverSecret: CHAT_APP_SECRET
//     })

//     const [userInfo, setUserInfo] = useState({
//         userID: `${user.name.split[' '][0]}${id}`,
//         userName: `${user.name.split[' '][0]}${id}`,
//         userAvatarUrl: ''
//     })

//     useEffect(() => {

//         const init = async () => {
//             const zimKit = new ZIMKitManager();
//             const chatToken = zimKit.generateKitTokenForTest(CHAT_APP_ID, CHAT_APP_SECRET, user._id);

//             console.log(chatToken);

//             await zimKit.init(appConfig.appID);
//             await zimKit.connectUser(userInfo, chatToken);
//         }
//         init()
        
//     }, [])
    

//     return (
//         <div >
//             <Common></Common>
//         </div>
//     );
// };

// export default ChatsPage;
