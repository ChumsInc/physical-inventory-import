import type {PhysInvImportValidation} from "../types";
import Stack from "react-bootstrap/Stack";

export default function ItemStatusIcons({entryId, item}: {
    entryId?: number;
    item: PhysInvImportValidation | null
}) {
    return (
        <Stack direction="vertical" gap={1}>
            {!entryId && !!item && !!item.warehouseCode && item.inactiveItem !== 'Y' && item.productType !== 'D' &&
                <span className="bi-flag text-success"/>}
            {!!entryId && <span className="bi-cloud-arrow-up text-success" title="Imported"/>}
            {!item && <span className="bi-exclamation-triangle-fill text-danger" title="Item not found"/>}
            {!item?.warehouseCode && <span className="bi-building-exclamation text-warning" title="Not in Warehouse"/>}
            {item?.inactiveItem === 'Y' && <span className="bi-toggle2-off text-danger" title="Inactive Item"/>}
            {item?.productType === 'D' &&
                <span className="bi-slash-circle-fill text-danger" title="Discontinued Item"/>}
        </Stack>
    )
}
