import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, router, useForm } from "@inertiajs/react";
import { ModalDelete } from "../../../../Components/ModalDelete";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import moment from "moment";

const TABS = [
    {
        label: "Todos",
        value: "all",
    },
    {
        label: "Ativos",
        value: "Enable",
    },
    {
        label: "Desativados",
        value: "Disable",
    },
];

const TABLE_HEAD = ["Nome", "Email", "Telefone", "Cargo", "Cadastrado em", ""];

export function TableUser({ users }) {
    const tableData = users.data || [];

    const { delete: forceDelete } = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTablesId, setSelectedTablesId] = useState(null);

    const handleDelete = (id) => {
        setSelectedTablesId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        forceDelete(route("table.forceDelete", selectedTablesId));
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTablesId(null);
    };
    console.log('tableData', tableData);
    return (
        <Card className="w-full max-h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none min-h-fit">
                <div className="mb-4 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Lista de usuários
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Veja informações sobre todos os usuários
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            visualizar todos
                        </Button>
                        <Link href={route('table.create')}>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                        <Input
                            label="Pesquisar"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
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
                            ({ id, name, last_name, email, phone, roles, status, created_at }, index) => {
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
                                                        {name} {last_name}
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
                                                        {email}
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
                                                        {phone}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={roles[0]?.name === 'admin' ? 'Administrador' : roles[0]?.name === 'waiter' ? 'Garçom' : 'Sem cargo'}
                                                    color={roles[0]?.name === 'admin' ? 'yellow' : roles[0]?.name === 'waiter' ? 'green' : 'red'}
                                                />
                                                {/* <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                    {roles[0]?.title ?? 'Sem cargo'}
                                                </Typography> */}
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {moment(created_at).format('DD/MM/YYYY')}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Visualizar">
                                                <Link href={route('table.show', id)}>
                                                    <IconButton variant="text">
                                                        <EyeIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Editar">
                                                <Link href={route('table.edit', id)}>
                                                    <IconButton variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Excluir">
                                                <IconButton
                                                    variant="text"
                                                    onClick={() => handleDelete(id)}
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
                    Página {users.current_page} of {users.last_page}
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={!users.prev_page_url}
                        onClick={() => {
                            if (users.prev_page_url) {
                                router.visit(users.prev_page_url);
                            }
                        }}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={!users.next_page_url}
                        onClick={() => {
                            if (users.next_page_url) {
                                router.visit(users.next_page_url);
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
            />
        </Card>
    );
}
