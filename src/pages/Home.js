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
    ListItemAvatar,
    Paper,
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
import {sampleMessages} from "../utilities/DammyData";


const Home = ()=>{

    const [tab, setTab] = useState("0")

    const handleTabChange = (event, currentTab)=> setTab(currentTab)

    
    return (
        <GridContainer sx={{py:3, px:1, marginTop:7}} justifyContent="space-around">
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
            sx={{display:"flex", flexDirection:"column",width:"90%",alignItems:"center", justifySelf:"center"}}>
                <Box sx={{display:"flex", width:"100%"}}>
                    <Card variant="outlined" sx={{maxWidth:{sm:550}, width:"100%", mx:"auto"}}>
                        <CardHeader 
                        title="Account Info"
                        subheader={`As at ${new Date().toLocaleTimeString()}`}
                        action={
                            <Tooltip title="Action">
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
                <Paper variant="outlined" style={{maxHeight:"80vh", overflow:"auto", position:"relative"}}>
                    <Paper 
                    sx={{
                        display:"flex",
                        justifyContent:"center",
                        position:"sticky", 
                        top:0, zIndex: 10,
                        background:"#FFF",
                        p:1, borderRadius:0}}>                         
                            <Typography>Notifications</Typography>
                        </Paper>
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
                </Paper>
            </GridItem>
                            
                <Box 
                sx={{ display:{xs:"flex",md:"none"}, 
                justifyContent:"center",
                position:"fixed", 
                width:"100%", 
                bottom:0, 
                mt:1,
                zIndex: (theme)=> theme.zIndex.appBar,
                background: (theme)=> theme.palette.primary.main}}>
                    <TabList textColor="secondary" onChange={handleTabChange}>
                            {homeTabItems.map((item,index)=>(
                                <Tab value={index.toString()}
                                icon={item.avatorIcon}
                                sx={{display:"flex", justifyContent:"center", alignItems:"center"}}
                                />
                            ))}
                        </TabList>
                </Box>
            </TabContext>
        </GridContainer>
    )
}

export default Home