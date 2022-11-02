import {createContext, useState, useContext} from "react";


const DialogContext = createContext()


const DialogContextProvider = ({children})=>{

    const [openDialog, setOpenDialog] = useState(false)

    const [dialogFeatures, setDialogFeatures] = useState({})

    const handleCloseDialog = ()=>setOpenDialog(false)
    const handleOpenDialog = ()=>setOpenDialog(true)

    const setupDialog = (newFeatures)=> setDialogFeatures({...newFeatures})

    let contextData = {

        PopOpen:handleOpenDialog,
        PopClose:handleCloseDialog,
        PopState:openDialog,
        PopFeatures:dialogFeatures,
        PopSetUp:setupDialog
    }

    return (
        <DialogContext.Provider value={contextData}>
            {children}
        </DialogContext.Provider>
    )

}

const useDialog = ()=> useContext(DialogContext)

export {useDialog, DialogContextProvider}