import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon, EyeIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import { Link, router, useForm } from "@inertiajs/react";
import { ModalDelete } from "../../../../Components/ModalDelete";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";

const TABLE_HEAD = ["ID", "Cargo", ""];

export function Table({ roles }) {
    const tableData = roles || [];
    const searchParam = new URLSearchParams(window.location.search).get('search')

    const { delete: deleteMethod } = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTablesId, setSelectedTablesId] = useState(null);
    const [selectedTableName, setSelectedTableName] = useState(null);
    const [search, setSearch] = useState(searchParam || '');

    const handleDelete = (id, name) => {
        setSelectedTablesId(id);
        setIsModalOpen(true);
        setSelectedTableName(name);
    };

    const handleConfirmDelete = () => {
        deleteMethod(route("admin.roles.destroy", selectedTablesId));
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTablesId(null);
        setSelectedTableName(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.roles.index'), { search: search });
    };

    return (
        <Card className="w-full max-h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none min-h-fit">
                <div className="mb-4 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Lista de cargos e permissões
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Veja informações sobre todos os cargos e permissões
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            visualizar todos
                        </Button>
                        <Link href={route('admin.roles.create')}>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <form onSubmit={(e) => handleSearch(e)} className="w-full ml-auto md:w-72">
                        <Input
                            label="Pesquisar"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            onChange={(e) => setSearch(e.target.value)}
                            value={search  || ''}
                        />
                    </form>
                </div>
            </CardHeader>
            <CardBody className="mt-2 px-0 overflow-y-auto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(
                            ({ id, title, name }, index) => {
                                const isLast = index === tableData.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {id}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">

                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {title}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        <td className={`${classes} text-end`}>
                                            <Tooltip content="Visualizar">
                                                <Link href={route('admin.roles.show', id)}>
                                                    <IconButton variant="text">
                                                        <EyeIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Editar permissões">
                                                <Link href={route('admin.roles.editAbilities', id)}>
                                                    <IconButton variant="text">
                                                        <Squares2X2Icon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Editar cargo">
                                                <Link href={route('admin.roles.edit', id)}>
                                                    <IconButton variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Excluir">
                                                <IconButton
                                                    variant="text"
                                                    onClick={() => handleDelete(id, title)}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Página {roles.current_page} of {roles.last_page}
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={!roles.prev_page_url}
                        onClick={() => {
                            if (roles.prev_page_url) {
                                router.visit(roles.prev_page_url);
                            }
                        }}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={!roles.next_page_url}
                        onClick={() => {
                            if (roles.next_page_url) {
                                router.visit(roles.next_page_url);
                            }
                        }}
                    >
                        Próximo
                    </Button>
                </div>
            </CardFooter>
            <ModalDelete
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                name={selectedTableName}
            />
        </Card>
    );
}
