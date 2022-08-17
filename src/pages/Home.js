import { 
    Typography,
    Card,
    CardHeader,
    CardContent,
    Tooltip,
    IconButton,
    Box,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from "@mui/material";
import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { GridContainer, GridItem } from "../components/Containers";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import {homeTabItems} from "../data/navdata";
import { green, red } from '@mui/material/colors'

import {useState} from "react";

const Home = ()=>{

    const [tab, setTab] = useState("0")

    const handleTabChange = (event, currentTab)=> setTab(currentTab)

    const sampleMessages = [
        {
            title:"Deposit",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            date:new Date().toLocaleString()
        },
        {
            title:"Loan",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            date:new Date().toLocaleString()
        }, 
        {
            title:"Deposit",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            date:new Date().toLocaleString()
        }, 
        {
            title:"Loan",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            date:new Date().toLocaleString()
        }, 
        {
            title:"AccountAction",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            date:new Date().toLocaleString()
        }, 
        {
            title:"Notification",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            date:new Date().toLocaleString()
        }, 
        {
            title:"Loan",
            body:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
            date:new Date().toLocaleString()
        },      
    ]
    return (
        <GridContainer sx={{py:3, marginTop:7}} justifyContent="space-around">
            <TabContext value={tab}>
            <GridItem md={3} sx={{display:{xs:"none", md:"block"}}}>
                
                    <TabList orientation="vertical" onChange={handleTabChange}>
                        {homeTabItems.map((item,index)=>(
                            <Tab value={index.toString()}
                            label={item.title}
                            icon={item.avatorIcon}
                            iconPosition="start"
                            sx={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}
                            />
                        ))}
                    </TabList>
               
            </GridItem>
            <GridItem 
            xs={12} md={5} 
            sx={{display:"flex", flexDirection:"column",width:"90%",alignItems:"center", justifySelf:"center",px:1}}>
                <Box sx={{display:"flex", width:"100%"}}>
                    <Card variant="outlined" sx={{maxWidth:{sm:550}, width:"100%", mx:"auto"}}>
                        <CardHeader 
                        title="Account Info"
                        subheader={`As at ${new Date().toLocaleTimeString()}`}
                        action={
                            <Tooltip>
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            </Tooltip>
                        }/>
                        <CardContent>
                            <Box sx={{display:"flex", alignItem:"center", justifyContent:"space-between",px:2}}>
                                <Box sx={{color:green[500]}}>
                                    <Typography variant="subtitle1">Savings</Typography>
                                    <Typography variant="h5">ksh 2000</Typography>
                                </Box>
                                <Box sx={{color:red[500]}}>
                                    <Typography variant="subtitle1">Loan</Typography>
                                    <Typography variant="h5">ksh 200</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                
                {homeTabItems.map((item,index)=>(<TabPanel sx={{p:0, width:"100%"}} value={index.toString()}>{item.panelUi}</TabPanel>))}
            </GridItem>
            <GridItem md={3} sx={{display:{xs:"none", md:"block"}}}>
                <Box sx={{height:"80vh"}}>
                    <Typography variant="subtitle1">Notifications updates</Typography>
                    <List sx={{height:"100%",}}>
                            {sampleMessages.map((item, index)=>(
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <NotificationsRoundedIcon/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={item.title} secondary={item.date}/>
                                </ListItem>
                            ))}
                    </List>
                </Box>
            </GridItem>
            </TabContext>
        </GridContainer>
    )
}

export default Home