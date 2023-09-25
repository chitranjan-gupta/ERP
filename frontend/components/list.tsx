"use client";
import React, { useState } from "react";
import { List, ListItem, IconButton, ListItemPrefix, ListItemSuffix, Checkbox } from "@material-tailwind/react";
import {
    TrashIcon
} from "@heroicons/react/24/outline";
export function Listbar() {
    const [selected, setSelected] = useState<Number>(1);
    const setSelectedItem = (value: Number) => setSelected(value);
    return (
        <div className="w-96">
            <List>
                <a href="#" className="text-initial">
                    <ListItem selected={selected === 1} onClick={() => setSelectedItem(1)}>
                        <ListItemPrefix>
                            <Checkbox color="green" defaultChecked crossOrigin="" />
                        </ListItemPrefix>
                        Inbox
                        <ListItemSuffix>
                            <IconButton variant="text" color="blue-gray">
                                <TrashIcon color="blue-gray" className="h-5 w-5"/>
                            </IconButton>
                        </ListItemSuffix>
                    </ListItem>
                </a>
                <a href="#" className="text-initial">
                    <ListItem selected={selected === 2} onClick={() => setSelectedItem(2)} disabled={true}>
                        <ListItemPrefix>
                            <Checkbox color="green" defaultChecked crossOrigin="" />
                        </ListItemPrefix>
                        Trash
                        <ListItemSuffix>
                            <IconButton variant="text" color="blue-gray">
                                <TrashIcon color="blue-gray" className="h-5 w-5"/>
                            </IconButton>
                        </ListItemSuffix>
                    </ListItem>
                </a>
                <a href="#" className="text-initial">
                    <ListItem selected={selected === 3} onClick={() => setSelectedItem(3)}>
                        <ListItemPrefix>
                            <Checkbox color="green" defaultChecked crossOrigin="" />
                        </ListItemPrefix>
                        Settings
                        <ListItemSuffix>
                            <IconButton variant="text" color="blue-gray">
                                <TrashIcon color="blue-gray" className="h-5 w-5"/>
                            </IconButton>
                        </ListItemSuffix>
                    </ListItem>
                </a>
            </List>
        </div>
    );
}