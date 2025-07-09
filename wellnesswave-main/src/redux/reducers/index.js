import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import adminReducer from "./adminReducer";
import appointmentReducer from "./appointmentReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    admin: adminReducer,
    appointments: appointmentReducer
})

export default rootReducer;