import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

export function ModalDelete({ isOpen, onClose, onConfirm }) {
    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Confirmar Exclusão</DialogHeader>
            <DialogBody>
                Tem certeza de que deseja excluir esta categoria? Esta ação não pode ser desfeita.
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={onClose}
                    className="mr-1"
                >
                    <span>Cancelar</span>
                </Button>
                <Button variant="gradient" color="green" onClick={onConfirm}>
                    <span>Confirmar</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
