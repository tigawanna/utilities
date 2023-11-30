import { tryCatchWrapper } from "@/utils/async"
import { numberToArray } from "@/utils/helpers/others";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { useQuery } from "@tanstack/react-query"
import { navigate, usePageContext } from "rakkasjs"
import { expand, like } from "typed-pocketbase";


interface UseShopsListProps {
    page_size?: number;
}

export function useShopsList({page_size = 12}: UseShopsListProps) {
    const page_ctx = usePageContext()
    const searchQuery = useSearchWithQuery();
    const page_number = parseInt(page_ctx.url.searchParams.get("p") ?? "1") ?? 1;
    const query = useQuery({
        queryKey: ["utility_shops", searchQuery?.debouncedValue],
        queryFn: () => tryCatchWrapper(page_ctx.locals.pb?.
            collection("utility_shops").getList(page_number,page_size,{
                sort: "-created",
                filter: `shop_number~"${searchQuery.debouncedValue}"`,
                expand:expand({"tenant":true}),
                // filter:like("tenant.username",searchQuery.debouncedValue),
            })),
    })
    function handleChange(e: any) {
        searchQuery.setKeyword(e.target.value);
    }
    const total_pages = query?.data?.data?.totalPages;
    const pages_arr = numberToArray(total_pages!);
    function goToPage(page: number) {
        page_ctx.url.searchParams.set("p", page.toString());
        navigate(page_ctx.url);
    }
    return {query,searchQuery,page_ctx,handleChange,goToPage,pages_arr}
}
