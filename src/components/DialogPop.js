import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";
import {connect} from "react-redux";

import {closeDialog} from "../redux/Dialog/DialogActions"; 

const DialogPop =({PopState, PopClose, PopFeatures})=>{

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

const mapStateToProp = state=>{

    return {
        PopState: state.dialog.open,
        PopFeatures: state.dialog.features
    }
}

const mapDispatchToProp = dispatch=>{

    return {
        PopClose: ()=> dispatch(closeDialog)
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(DialogPop)