import { tryCatchWrapper } from "@/utils/async"
import { numberToArray } from "@/utils/helpers/others";
import { useSearchWithQuery } from "@/utils/hooks/search";
import { useQuery } from "@tanstack/react-query"
import { navigate, usePageContext } from "rakkasjs"

interface UseTenantsListProps {
    page_size?: number;
}

export function useTenantsList({page_size = 12}: UseTenantsListProps) {
    const page_ctx = usePageContext()
    const searchQuery = useSearchWithQuery();
    const page_number = parseInt(page_ctx.url.searchParams.get("p") ?? "1") ?? 1;
    const query = useQuery({
        queryKey: ["utility_tenants"],
        queryFn: () => tryCatchWrapper(page_ctx.locals.pb?.
            collection("utility_tenants").getList(page_number,page_size,{
                sort: "-created",
                filter: `name~"${searchQuery.debouncedValue}"`,
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
