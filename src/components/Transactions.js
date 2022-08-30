import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

import TabContent from "./TabContent";

import { green, red } from '@mui/material/colors'



function Transactions({table_data}) {
  return (
    <TabContent>
      <List sx={{height:"100%"}} >
            {table_data.map((item, index)=>(
              <ListItem divider button dense key={index} alignItems="flex-start">
              <ListItemText sx={{color:item.type === "service"? red[500]:green[500]}} 
              primary={
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:1}}>
                  <Box sx={{display:"flex", alignItems:"center",gap:2}}>
                    <CalendarMonthRoundedIcon/>
                    <Typography variant="body1">{item.date}</Typography>
                  </Box>
                  <Typography>{`Ksh ${item.Amount}`}</Typography>
                </Box>
              } secondary={
                <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Typography variant="subtittle2">{`recept: ${item.recept}`}</Typography>
                    <Typography variant="subtittle2">{item.type}</Typography>
                </Box>
              }/>
            </ListItem>

            ))}
        </List>
    </TabContent>
  )
}

export default Transactions