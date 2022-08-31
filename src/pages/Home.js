import { 
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Box,
    Tab,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Paper,
    TextField,
    InputAdornment,
} from "@mui/material";


import Avatar from '@mui/material/Avatar';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { GridContainer, GridItem } from "../components/Containers";
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import {homeTabItems} from "../data/navdata";
import { green, red } from '@mui/material/colors'
import {useState} from "react";
import {sampleMessages} from "../data/DammyData";

import {useDialog} from "../context/DialogProvider";


const Home = ()=>{

    // Dialog state

    const {PopOpen, PopSetUp} = useDialog();

    // tabs state
    const [tab, setTab] = useState("0")

    const handleTabChange = (currentTab)=> setTab(currentTab);


    function handleDepositCash (){

        let dialogFeatures = {
            title:"Make a Deposit",
            description:"Please enter your amount to initiate a transaction",
            callback: function example(){ console.log("making a deposite")},
            components: <TextField 
            variant="standard" 
            autoFocus 
            fullWidth 
            label="Amount"
            InputProps= {{startAdornment:<InputAdornment position="start">Ksh</InputAdornment>}}/>
        }

        PopSetUp(dialogFeatures)
        PopOpen()
    }

    function handleRequestLoan() {
        
        let dialogFeatures = {
            title:"Request a Loan",
            description:"Please enter your amount to initiate a transaction",
            callback: function example(){ console.log("Requesting a Loan")},
            components: <TextField 
            variant="standard" 
            autoFocus 
            fullWidth 
            label="Amount"
            InputProps= {{startAdornment:<InputAdornment position="start">Ksh</InputAdornment>}}/>
        }

        PopSetUp(dialogFeatures)
        PopOpen()
    }

  
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
            <GridItem xs={12} sm={7} md={5} 
            sx={{display:"flex", flexDirection:"column",width:"90%",alignItems:"center", justifySelf:"center"}}>
                <Box sx={{display:"flex", width:"100%"}}>

                    <Card variant="outlined" sx={{maxWidth:{sm:550,}, width:"100%", mx:"auto"}}>
                        <CardHeader 
                        title="Account Info"
                        subheader={`As at ${new Date().toLocaleTimeString()}`}/>
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
                        <CardActions>
                            <Button onClick={handleDepositCash} variant="outlined" size="small">Make A Deposit</Button>
                            <Button onClick={handleRequestLoan} variant="outlined" color="error" size="small">Request Loan</Button>
                        </CardActions>
                    </Card>
                </Box>
                
                {homeTabItems.map((item,index)=>(<TabPanel sx={{p:0, width:"100%"}} value={index.toString()}>{item.panelUi}</TabPanel>))}
            </GridItem>
            <GridItem sm={4} md={3}  sx={{display:{xs:"none", sm:"block"}}}>
                <Paper variant="outlined" style={{maxHeight:"80vh", overflow:"auto", position:"relative"}}>
                    <Paper sx={{display:"flex", justifyContent:"center", position:"sticky", top:0, zIndex: 10, background:"#FFF", p:1, borderRadius:0}}>                         
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
                            
                <Box sx={{ display:{xs:"flex",md:"none"}, justifyContent:"center", position:"fixed", width:"100%", bottom:0, mt:1,
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