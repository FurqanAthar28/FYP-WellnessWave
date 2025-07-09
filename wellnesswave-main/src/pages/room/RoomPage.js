import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const RoomPage = () => {
  const move = useNavigate();
  const { roomId, counsellorId, userId, name, contact } = useParams()
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(window.location.protocol + '//' + 
  window.location.host + window.location.pathname +
   '?roomID=' +
   roomId)

  const myMeeting = async(element) => {
    const appID = 1451585701
    const serverSecret = "10f138e60c3fe31fc4a6b25aa2346412" 
    const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), name);
    const zc = ZegoUIKitPrebuilt.create(kitToken)

    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, 
      },
      onLeaveRoom: () => {
        // Add code here to handle leaving the room
        console.log('Leaving room');
        zc.destroy() // Example: Leaving the room when the leave room event is triggered
        window.location.reload()
      },
    });
  }

  const handleBackToMeetingLounge = () => {
    move(`/meeting-lounge/${roomId}`);
  };
  
  const handleWhatsAppRedirect = () => {
    const formattedContact = `92${contact.slice(1)}`;
    const roomUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomId}`;
    const message = encodeURIComponent(`Join the room: ${roomUrl}`);
    const whatsappUrl = `https://wa.me/${formattedContact}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };
  
  return (
    <>
      <div ref={myMeeting}/> 

      {user?._id === counsellorId && (
        
        <div className="ml-[44%] w-[300px] flex flex-col relative top-[100px] justify-center p-4"> 
          <button onClick={handleWhatsAppRedirect} className='my-5 bg-green-500 hover:bg-green-700 text-white sfont-bold py-2 px-4 rounded"'>Send Meeting Link on Whatsapp.</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBackToMeetingLounge}>
            Go Back to Lounge When Meeting Completes
          </button>   
        </div>
        
      )
    }
    </>
  )
}

export default RoomPage