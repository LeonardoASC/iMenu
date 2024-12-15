import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { PencilIcon, UserPlusIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/solid";
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

const TABLE_HEAD = ["Comanda", "Pedido", "Produto", "Quantidade", "Preço", "Status", "created_at", ""];

export function TableOrderProducts({ orderProducts }) {
    const orderData = orderProducts || [];
    console.log(orderData);

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
                            Itens da comanda
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all orderProducts
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            view all
                        </Button>

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
                        {orderData.map(({ id, order_id, product, quantity, price, status, created_at, order }, index) => {
                            const isLast = index === orderData.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={id}>
                                    <td className={classes}>
                                    <Tooltip content={order.user.name}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {order_id} - {order.user.name.split(' ').slice(0, 2).join(' ')}
                                        </Typography>
                                    </Tooltip>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {id}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {product.name}
                                        </Typography>
                                    </td>

                                    {/* Quantidade */}
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {quantity}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            ${price}
                                        </Typography>
                                    </td>

                                    <td className={classes}>
                                        <Chip
                                            variant="ghost"
                                            size="sm"
                                            value={status === 'preparing' ? 'preparing' : status === 'ready' ? 'ready' : 'delivered'}
                                            color={status === 'preparing' ? 'yellow' : status === 'ready' ? 'green' : 'red'}
                                        />
                                    </td>

                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {new Date(created_at).toLocaleDateString()}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 ">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {orderProducts.current_page} of {orderProducts.last_page}
                </Typography>
                <div className="flex gap-2">
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={!orderProducts.prev_page_url}
                        onClick={() => {
                            if (orderProducts.prev_page_url) {
                                router.visit(orderProducts.prev_page_url);
                            }
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={!orderProducts.next_page_url}
                        onClick={() => {
                            if (orderProducts.next_page_url) {
                                router.visit(orderProducts.next_page_url);
                            }
                        }}
                    >
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
