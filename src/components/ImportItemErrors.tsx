import React from 'react'
import Stack from "react-bootstrap/Stack";

export default function ImportItemErrors({errors}: {errors?: string|null}) {
    if (!errors) {
        return (
            <div className="text-success">Valid</div>
        )
    }
    return (
        <Stack direction="vertical" gap={1}>
            {errors.split(';').map((err, index) => (<div key={index} className="text-danger">{err}</div>))}
        </Stack>
    )
}
