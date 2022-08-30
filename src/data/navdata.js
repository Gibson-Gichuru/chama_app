import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCircleIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Transactions from "../components/Transactions";
import Account from "../components/Account";
import Settings from "../components/Settings";

import {table_data} from "./DammyData";
export const navigationLinks = [
    {
        title:"Contact",
        payload:{

        }
    },
    {
        title:"About",
        payload:{
            
        }
    },
    {
        title:"Faqs",
        payload:{
            
        }
    },
]

export const homeTabItems =[
  
     {
        title:"transactions",
        avatorIcon:<AccountBalanceWalletIcon/>,
        panelUi:<Transactions table_data = {table_data}/>
    },
    {
        title:"public legder",
        avatorIcon:<MenuBookIcon/>,
        panelUi:<Transactions table_data = {table_data}/>
    },
    {
        title:"account",
        avatorIcon:<AccountCircleIcon/>,
        panelUi:<Account/>
    },
    {
        title:"settings",
        avatorIcon:<SettingsCircleIcon/>,
        panelUi: <Settings/>
    },
    
]