import {
    ADD_MESSAGE, 
    MARK_MESSAGE_AS_READ, 
    DELETE_MESSAGE
} from "./MessageType";

export const addMessage= (messagePayload)=>{

    return {
        type: ADD_MESSAGE,
        payload:messagePayload
    }
}

export const markMessageRead = (message_id) =>{

    return {
        type: MARK_MESSAGE_AS_READ,
        payload:message_id
    }
}

export const deleteMessage = (message_id)=>{

    return {
        type: DELETE_MESSAGE,
        payload:message_id
    }
}