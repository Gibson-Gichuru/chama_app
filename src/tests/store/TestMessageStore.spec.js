import {addMessage, markMessageRead, deleteMessage} from "../../redux/Message/MessageActions";

import store from "../../redux/store";


describe("Tests message store functionality", ()=>{

    let message;

    beforeEach(()=> message = {id:1,text:"some testing message", read:false})


    it("Should save a message to the store", ()=>{

       
        store.dispatch(addMessage(message))

        const state = store.getState()

        // expect the message to be stored on the state store

        const availableMessages = state.messages.availableMessages.filter(msg=>msg.id===1);


        expect(availableMessages.length).toEqual(1)

    })

    it("Should enable a message to be marked as read", ()=>{

        store.dispatch(markMessageRead(1))

        const state = store.getState()
        
        const availableMessages = state.messages.availableMessages.filter(msg=>msg.id===1);

        expect(availableMessages[0].read).toBeTruthy()
    })

    it("Should enable a message to be deleted", ()=>{

        store.dispatch(deleteMessage(1))

        const state = store.getState()

        const availableMessages = state.messages.availableMessages.filter(msg=>msg.id===1);

        expect(availableMessages.length).toEqual(0)


    })
})