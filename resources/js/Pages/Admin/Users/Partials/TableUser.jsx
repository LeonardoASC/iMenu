import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { FaTrashRestore } from "react-icons/fa";
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
import { useEffect, useState } from "react";
import moment from "moment";
import { ModalRestore } from "@/Components/ModalRestore";

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

const TABLE_HEAD = ["Nome", "Cargo", "Email", "Telefone", "Status", ""];

export function TableUser({ users }) {
    const tableData = users.data || [];

    const deletedAtParam = new URLSearchParams(window.location.search).get('deleted_at')
    const searchParam = new URLSearchParams(window.location.search).get('search')

    const { post, delete: deleteMethod } = useForm();

    const [currentTab, setCurrentTab] = useState(!deletedAtParam ? 'all' : deletedAtParam === 'false' ? 'Enable' : 'Disable');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTablesId, setSelectedTablesId] = useState(null);
    const [selectedTableName, setSelectedTableName] = useState(null);
    const [isSoftDelete, setIsSoftDelete] = useState(false);
    const [isOpenModalRestore, setIsOpenModalRestore] = useState(false);
    const [search, setSearch] = useState(searchParam || '');

    const handleDelete = (id, deletedAt, name) => {
        setSelectedTablesId(id);
        setIsModalOpen(true);
        setSelectedTableName(name);
        setIsSoftDelete(deletedAt == null);
    };

    const handleRestore = (id, name) => {
        setSelectedTablesId(id);
        setIsOpenModalRestore(true);
        setSelectedTableName(name);
    };

    const handleConfirmDelete = () => {
        if(isSoftDelete) deleteMethod(route("admin.users.destroy", selectedTablesId));
        else deleteMethod(route("admin.users.forceDelete", selectedTablesId));
        setCurrentTab('all')
        handleCloseModal();
    };

    const handleConfirmRestore = () => {
        post(route("admin.users.restore", selectedTablesId));
        setCurrentTab('all')
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTablesId(null);
        setSelectedTableName(null);
        setIsSoftDelete(false);
        setIsOpenModalRestore(false);
    };

    const handleTabSwitch = (tab) => {
        switch (tab) {
            case "all":
                router.get(route('admin.users.index'));
                break;
            case "Enable":
                router.get(route('admin.users.index'), { deleted_at: false })
                break;
            case "Disable":
                router.get(route('admin.users.index'), { deleted_at: true })
                break;
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search: search });
    };

    useEffect(() => {
        setCurrentTab(!deletedAtParam ? 'all' : deletedAtParam === 'false' ? 'Enable' : 'Disable')
    }, [deletedAtParam]);
    console.log('users', users);
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
                        <Link href={route('admin.users.create')}>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <Tabs value={currentTab || 'all'} className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => handleTabSwitch(value)}>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                    <form onSubmit={(e) => handleSearch(e)} className="w-full md:w-72">
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
                            ({ id, name, last_name, email, phone, roles, created_at, deleted_at }, index) => {
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
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={roles[0]?.name === 'admin' ? 'Administrador' : roles[0]?.name === 'waiter' ? 'Garçom' : 'Sem cargo'}
                                                    color={roles[0]?.name === 'admin' ? 'blue' : roles[0]?.name === 'waiter' ? 'purple' : 'gray'}
                                                />
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

                                        {/* <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {moment(created_at).format('DD/MM/YYYY')}
                                            </Typography>
                                        </td> */}
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value={deleted_at ? 'Desativado' : 'Ativo'}
                                                        color={deleted_at ? 'red' : 'green'}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Visualizar">
                                                <Link href={route('admin.users.show', id)}>
                                                    <IconButton variant="text">
                                                        <EyeIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            {!deleted_at
                                                ? <Tooltip content="Editar">
                                                    <Link href={route('admin.users.edit', id)}>
                                                        <IconButton variant="text">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                :
                                                <Tooltip content="Reativar">
                                                    <IconButton
                                                        variant="text"
                                                        onClick={() => handleRestore(id, `${name} ${last_name}`)}
                                                    >
                                                        <FaTrashRestore className="h-3.5 w-3.5" />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            <Tooltip content={deleted_at ? 'Desativar' : 'Excluir'}>
                                                <IconButton
                                                    variant="text"
                                                    onClick={() => handleDelete(id, deleted_at, `${name} ${last_name}`)}
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
                name={selectedTableName}
                softDelete={isSoftDelete}
            />
            <ModalRestore
                isOpen={isOpenModalRestore}
                onClose={handleCloseModal}
                onConfirm={handleConfirmRestore}
                name={selectedTableName}
            />
        </Card>
    );
}
