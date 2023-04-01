import { pb } from "../pb/config";
import { ShopResponse } from "./shops";


export interface TenantResponse {
    id: string
    supa_id:string;
    collectionId: string
    collectionName: string
    created: string
    updated: string
    name: string
    contact: string
    email: string
    details: string
    expand: TenantExpand
}

export interface TenantExpand {
    "shops(tenant)": Omit<ShopResponse,"expand">[]
}


export async function addTenant(tenant:Partial<TenantResponse>) {
    try {
    const record = await pb.collection('tenants').create<TenantResponse>(tenant);
    return record
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getTenant(id:string) {
    try {
        // or fetch only the first record that matches the specified filter
        const record = await pb.collection('tenants').getFirstListItem<TenantResponse>( `id="${id}"`, {});
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getTenants() {
    try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection('tenants').getFullList<TenantResponse>({
            // sort: '-created',
            expand:'shops(tenant)'
        });
    return records
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateTenant(id:string, tenant:TenantResponse) {
    try {
    const record = await pb.collection('tenants').update<TenantResponse>(id,tenant);
    return record
    } catch (error) {
        console.log(error)
        throw error
    }
}
