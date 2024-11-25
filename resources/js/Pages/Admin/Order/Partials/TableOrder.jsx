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

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Enable",
        value: "Enable",
    },
    {
        label: "Disable",
        value: "Disable",
    },
];

const TABLE_HEAD = ["Orders", "Cliente", "Status", "Notes", "Total", "created_at", ""];

export function TableOrder({ orders }) {
    const orderData = orders.data || [];

    const { delete: forceDelete } = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleDelete = (id) => {
        setSelectedOrderId(id);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = () => {
        forceDelete(route("order.forceDelete", selectedOrderId));
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId(null);
    };

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none h-[15%] ">
                <div className="mb-4 flex items-center justify-between gap-8 ">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Orders list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all orders
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            view all
                        </Button>
                        <Link href={route('order.create')}>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Order
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
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
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardBody className="mt-2 overflow-scroll px-0 h-[75%] ">
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
                        {orderData.map(
                            ({ id, user, status, notes, total, created_at }, index) => {
                                const isLast = index === orderData.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                {/* <Avatar src={`/storage/${image}`} alt={name} size="sm" /> */}
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {id}°
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
                                                        {user.name}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={status === 'preparing' ? 'preparing' : status === 'delivered' ? 'delivered' : 'canceled'}
                                                    color={status === 'preparing' ? 'yellow' : status === 'delivered' ? 'green' : 'red'}

                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Tooltip content={notes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal truncate max-w-[200px]"
                                                        >
                                                            {notes}
                                                        </Typography>
                                                    </Tooltip>
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
                                                        {total}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {created_at}
                                            </Typography>
                                        </td>
                                        <td className={classes} style={{ opacity: 0.5, pointerEvents: 'none' }}>
                                            <Tooltip content="Show order">
                                                <Link href={route('order.show', id)}>
                                                    <IconButton variant="text">
                                                        <EyeIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Edit order">
                                                <Link href={route('order.edit', id)}>
                                                    <IconButton variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip content="Delete order">
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
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 ">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {orders.current_page} of {orders.last_page}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
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
