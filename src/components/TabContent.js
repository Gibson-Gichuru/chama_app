import {Box, Paper} from "@mui/material";


const TabContent = ({children})=>{


    return (

        <Box sx={{my:3,display:"flex", flexDirection:"column",width:"100%"}}>
            <Paper variant="outlined" style={{maxHeight: 430, overflow:"auto",maxWidth:550, width:"100%", margin:"auto"}}>
                {children}
            </Paper>
        </Box>
    )
};

export default TabContent;
