const initialState = {
    appointments: [],
    userAppointments: [],
    counsellorAppointments: [],
    isLoading: false,
    error: null,
  };
  
export default (state = initialState, action) => 
{
    switch (action.type) {
        // Appointment Cases
        case "APPOINTMENTS_REQUEST":
        state = {
            ...state,
            isLoading: true,
        };
        break;

        case "APPOINTMENTS_SUCCESS":
        state = {
            ...state,
            appointments: action.payload.appointments,
            userAppointments: action.payload.userAppointments,
            isLoading: false,
        };
        break;

        case "APPOINTMENTS_FAILURE":
        state = {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
        break;
        
        case "COUNSELLOR_APPOINTMENTS_REQUEST":
        state = {
            ...state,
            isLoading: true,
        };
        break;

        case "COUNSELLOR_APPOINTMENTS_SUCCESS":
        state = {
            ...state,
            counsellorAppointments: action.payload.counsellorAppointments,
            isLoading: false,
        };
        break;

        case "COUNSELLOR_APPOINTMENTS_FAILURE":
        state = {
            ...state,
            isLoading: false,
            error: action.payload.error,
        };
        break;
    }    
    return state;
}