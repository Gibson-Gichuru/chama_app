import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsCircleIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Transactions from "../components/Transactions";
import Account from "../components/Account";
import PublicLedger from "../components/PublicLedger";
import Settings from "../components/Settings";
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
        panelUi:<Transactions/>
    },
    {
        title:"public legder",
        avatorIcon:<MenuBookIcon/>,
        panelUi:<PublicLedger/>
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