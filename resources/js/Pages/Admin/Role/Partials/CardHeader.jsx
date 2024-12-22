import { Link } from "@inertiajs/react";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

export default function CardHeader({ title, description }) {
    return (
        <>
            <div className="flex justify-between  items-center">
                <div>
                    <Typography variant="h4" color="blue-gray">
                        {title}
                    </Typography>
                    {description && <Typography color="gray" className="mt-1 font-normal">
                        {description}
                    </Typography>}
                </div>
            </div>
        </>
    );
}
