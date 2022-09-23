import {ADD_MESSAGE, MARK_MESSAGE_AS_READ, DELETE_MESSAGE} from "./MessageType";


const initialState = {

    availableMessages:[]

}

const messageReducer = (state = initialState, action)=>{

    switch(action.type){
        case ADD_MESSAGE: return {
            ...state,
            availableMessages:[...state.availableMessages, action.payload]
        }

        case MARK_MESSAGE_AS_READ: return {
            ...state,
            availableMessages:state.availableMessages.map(msg=>{

                if(msg.id !== action.payload){

                    return msg
                }

                return {
                    ...msg,
                    read: !msg.read
                }
            })
        }

        case DELETE_MESSAGE: return {
            ...state,
            availableMessages: state.availableMessages.filter(msg=> msg.id !== action.payload)
        }

        default: return state
    }
}

export default messageReducer