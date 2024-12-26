import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
} from "@material-tailwind/react";
import { FiAlertOctagon } from "react-icons/fi";

export function AlertItemModal() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <IconButton
                variant="text"
                size="sm"
                color="gray"
                onClick={handleOpen}
            >
                <FiAlertOctagon className="h-5 w-5" />
            </IconButton>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Pedido 5: Hamburguer.</DialogHeader>
                <DialogBody>|detalhes do pedido|,
                    Ocorreu algum erro com este pedido ?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Nao</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Chamar um atendente</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
