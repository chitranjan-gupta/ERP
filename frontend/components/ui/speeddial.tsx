"use client";
import React from "react"
import {
    IconButton, SpeedDial, SpeedDialHandler, SpeedDialContent, SpeedDialAction, Typography
} from "@material-tailwind/react"
import {
    PlusIcon, HomeIcon, CogIcon, Square3Stack3DIcon
} from "@heroicons/react/24/outline"

export function Speeddial() {
    return (
        <div className="absolute bottom-0 right-0">
            <SpeedDial>
                <SpeedDialHandler>
                    <IconButton size="lg" className="rounded-full">
                        <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                    </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                    <SpeedDialAction className="relative">
                        <HomeIcon className="h-5 w-5" />
                        <Typography variant="small" color="blue-gray" className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal">Home</Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative">
                        <CogIcon className="h-5 w-5" />
                        <Typography variant="small" color="blue-gray" className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal">Settings</Typography>
                    </SpeedDialAction>
                    <SpeedDialAction className="relative">
                        <Square3Stack3DIcon className="h-5 w-5" />
                        <Typography variant="small" color="blue-gray" className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal">Pages</Typography>
                    </SpeedDialAction>
                </SpeedDialContent>
            </SpeedDial>
        </div>
    )
}