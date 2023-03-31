import { pb } from "../pb/config";


export interface ShopResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    tenant: string
    shop_number: string
    supa_tenant: string
    utils: string
    order: number
    supa_id: string
}

interface OldShop{
    id: string;
    created_at: string;
    tenant: string;
    shop_number: string;
    order: number;
    has_water: boolean;
    has_elec: boolean;
    is_vacant: boolean;
}



export async function addShop(tenant: Partial<ShopResponse>) {
    try {
        const record = await pb.collection('shops').create<ShopResponse>(tenant);
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}
