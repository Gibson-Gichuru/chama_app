import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper
} from "@mui/material"
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { FixedSizeList } from 'react-window';
import { green, red } from '@mui/material/colors'

const table_data = [
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"savings"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"service"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"savings"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"service"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"savings"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"savings"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"service"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"savings"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"savings"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"service"
  },
  {
    name:"Gibson",
    date: new Date().toLocaleDateString(),
    Amount:20000,
    recept:"Avu324ksfcxmn345",
    type:"savings"
  },

]

function renderLists(){

  return(
    table_data.map((item, index)=>(
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
    ))
  )
}
function Transactions() {
  return (
    <Box marginTop={2} sx={{dsplay:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}> 
      <Paper variant="outlined" sx={{maxHeight:320, overfow:"hidden",maxWidth:550, mx:"auto"}}>
      <FixedSizeList height={320} itemSize={2} itemCount={table_data.length} overscanCount={5}>
          {renderLists}
      </FixedSizeList>
      </Paper>
    </Box>
  )
}

export default Transactions