import { PageProps } from "rakkasjs"
import { useShopsList } from "./utils/useShopsQuery"
export default function ShopsPage({}:PageProps) {
const {query} = useShopsList({page_size: 12})
const data = query?.data?.data?.items

return (
<div className="w-full h-full min-h-screen flex items-center justify-center">
    shops
</div>
)}
