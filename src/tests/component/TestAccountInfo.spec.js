import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";

import { faker } from '@faker-js/faker';

import AccountInfo from "../../components/AccountInfo";

import configureStore from "redux-mock-store";

import {Provider} from "react-redux";


const mockStore = configureStore([])

const fname = faker.name.fullName()

const date = faker.date.month() 

const refNumber = faker.datatype.uuid()

const amount = faker.finance.amount()


beforeEach(()=>render(

    <Provider store={store}>
        <AccountInfo/>
    </Provider>
))

const store = mockStore({
    alerts:{},
    messages:{},
    user:{}
})

describe("Account Info Card Component testing", ()=>{

    it("Should display loan amount and deposite amount from the store", ()=>{


    })

    it("Should pop a dialog once the deposit button is pressed", ()=>{

    })

    it("Should send an stk push to the user if deposit button is pressed", ()=>{

    })

    it ("Should make a loan request once the loan button is pressed",()=>{

    })
})

function generateFakeTransactionData (){

    let transactions;

    

    return transactions
}