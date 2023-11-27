import { PocketBaseClient } from "@/lib/pb/client";
import { UtilityShopsResponse, UtilityShopsUpdate, UtilityTenantsResponse } from "@/lib/pb/db-types";

export async function migrateTenantsToRemote(
    pb:PocketBaseClient,
    pb_tenants:UtilityTenantsResponse[]
    ) {
    pb.autoCancellation(false);
    const promises = [];
    for await (const a_tenant of pb_tenants) {
        const name = a_tenant.name.split(" ")[0]?.toLowerCase()+a_tenant.name.split(" ")[1]?.toLowerCase();
        const email = `${name}@rakkas.com`;
        const password = "pass_word";
        const data = {
            ...a_tenant,
            "username":name,
            "email":email,
            "emailVisibility": true,
            "password": "pass_word",
            "passwordConfirm": "pass_word",
            "phone": "0790000000"
        }
        promises.push(pb.collection("utility_tenant").create(data));
    }
    return await Promise.all(promises);
}
export async function switchrounTenantsInShop(
    pb:PocketBaseClient,
    pb_shops:UtilityShopsResponse[]
    ) {
    pb.autoCancellation(false);
    const promises = [];
    for await (const a_shop of pb_shops) {

        const data:UtilityShopsUpdate = {
             new_tenant: a_shop.tenant
        }
        promises.push(pb.collection("utility_shops").update(a_shop.id, data));
    }
    return await Promise.all(promises);
}
