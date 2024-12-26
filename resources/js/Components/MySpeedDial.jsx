import {
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
} from "@material-tailwind/react";
import {
    PlusIcon,
    HomeIcon,
    CogIcon,
    Square3Stack3DIcon,
} from "@heroicons/react/24/outline";
import { LuMessageSquareShare } from "react-icons/lu";

export default function MySpeedDial({ readyMsg }) {
    console.log(readyMsg);

    return (
        <div className="relative h-14 w-full">
        <div className="absolute top-0 right-0">
            <SpeedDial placement="left">
                <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full">
                        <LuMessageSquareShare  className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent className="flex-row overflow-x-auto max-w-sm">
                    {readyMsg.map((msg, index) => (
                        <SpeedDialAction key={index} className="truncate max-w-full">
                            {msg.text}
                        </SpeedDialAction>
                    ))}
                </SpeedDialContent>
            </SpeedDial>
        </div>
    </div>
    );
}

