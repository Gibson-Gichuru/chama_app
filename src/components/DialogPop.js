import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import {useDialog} from "../context/DialogProvider";


const DialogPop =({})=>{

    const {PopState, PopClose, PopFeatures} = useDialog()

    return (
        <Dialog open={PopState} onClose={()=>PopClose}>
            <DialogTitle>{PopFeatures?.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{PopFeatures?.description}</DialogContentText>
                {/* make the component dynamic and reusable */}
                {PopFeatures?.components}
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={PopClose}>Cancel</Button>
                <Button onClick={PopFeatures?.callback}>Continue</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogPop