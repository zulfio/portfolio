"use client";

import MediaItems from '@/components/fileManager/MediaItems'
import React from 'react'

function Attachments({ data }) {
    data = JSON.parse(data)

    return (
        <MediaItems media={data || []} selectMultiple={false} onSelected={(selected) => {
            const ahref = document.createElement('a');
            ahref.href = `/api/static/${selected[0]?.path}`;
            ahref.download = selected[0]?.fileName;
            ahref.click();
            ahref.remove();
        }} />
    )
}

export default Attachments