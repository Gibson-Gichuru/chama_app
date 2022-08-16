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
            <GridItem xs={12} md={5} sx={{display:"flex", flexDirection:"column",width:"90%", justifySelf:"center"}}>
                <Box sx={{display:"flex"}}>
                    <Card variant="outlined" sx={{maxWidth:400}}>
                        <CardHeader 
                        title="Account Info"
                        subheader="Savings"
                        action={
                            <Tooltip title="more action">
                                <IconButton>
                                    <MoreVertIcon/>
                                </IconButton>
                            </Tooltip>
                        }/>
                        <CardContent>
                            <Typography variant="body1">
                                2000
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    {homeTabItems.map((item,index)=>(<TabPanel value={index.toString()}>{item.panelUi}</TabPanel>))}
                </Box>
            </GridItem>
            <GridItem md={3} sx={{display:{xs:"none", md:"block"}}}>
                <Box sx={{height:"100vh"}}>
                <List sx={{height:"100%"}}>
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