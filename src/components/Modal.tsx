import React from 'react'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core'

interface ModalOptions {
    text: string
    title?: string
    icon?: React.FC
    showCancelButton?: boolean
    confirmButtonText?: string
    cancelButtonText?: string
}

const Modal = ({
    isOpen,
    onResolve,
    text,
    title,
    icon: Icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
}: ModalOptions & { isOpen: boolean; onResolve: (val: boolean) => void }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={() => onResolve(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            {/* {Icon && <Icon />} */}
            {title && (
                <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
            )}
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    disableElevation
                    onClick={() => onResolve(true)}
                    color='primary'
                    autoFocus
                >
                    {confirmButtonText ?? 'Confirm'}
                </Button>
                {showCancelButton && (
                    <Button
                        // variant='contained'
                        onClick={() => onResolve(false)}
                        // color='secondary'
                    >
                        {cancelButtonText ?? 'Cancel'}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default Modal
