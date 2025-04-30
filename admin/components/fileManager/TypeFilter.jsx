"use client";

import React from "react";
import { Select, SelectItem } from "@tremor/react";
import { DocumentTextIcon, PhotoIcon, SpeakerWaveIcon, VideoCameraIcon } from "@heroicons/react/20/solid";

function TypeFilter({ value = "", onChange = () => {} }) {
    return (
        <div className="max-w-sm">
            <Select value={value} onValueChange={onChange} placeholder="All media items" enableClear>
                <SelectItem value="image" icon={PhotoIcon} className="cursor-pointer">
                    Image
                </SelectItem>
                <SelectItem value="audio" icon={SpeakerWaveIcon} className="cursor-pointer">
                    Audio
                </SelectItem>
                <SelectItem value="video" icon={VideoCameraIcon} className="cursor-pointer">
                    Video
                </SelectItem>
                <SelectItem value="document" icon={DocumentTextIcon} className="cursor-pointer">
                    Document
                </SelectItem>
            </Select>
        </div>
    );
}

export default TypeFilter;
