import {createTheme, experimental_sx as sx} from "@mui/material/styles";

export const theme = createTheme({

    // create a custom color theme for the application


    // customize specific components on the application


    components:{

        MuiToolbar:{

            styleOverrides:{
                
                root: sx({
                    height:"8vh",
                })

            }
        },

        MuiDrawer:{
            styleOverrides:{
                // override the drawer's height and color
                paper: ({theme})=>({
                    height:"92vh",
                    marginTop:"8vh",
                    //  the drawer background and color should match the appbar's
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                })

            }
        },

    },

    // zIndex configs

    zIndex:{

        appBar:1200,
        drawer:1100,
    }
})