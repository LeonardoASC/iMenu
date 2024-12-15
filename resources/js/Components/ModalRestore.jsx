import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { FaTrashRestore } from "react-icons/fa";

export function ModalRestore({ isOpen, onClose, name, onConfirm }) {
    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader className="gap-2">
                <div className="bg-green-100 rounded-full p-2.5"><FaTrashRestore className="h-4 w-4 text-green-700" /></div>
                Reativar Registro
            </DialogHeader>
            <DialogBody>
                <div className="py-2 flex flex-col gap-2">
                    <p>Tem certeza de que deseja reativar este registro?</p>
                    {name && <p className="font-bold">{name}</p>}
                </div>
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
