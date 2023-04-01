import { pb } from "../pb/config";
import { TenantResponse } from "./tenant";


export interface ShopExpand{
    tenant:TenantResponse
}

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
    expand:ShopExpand
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

export type ShopMutationFields = Omit<ShopResponse,"collectionId"|"collectionName"|"created"|"update"|"id">


export async function addShop(shop:ShopMutationFields) {
    try {
        const record = await pb.collection('shops').create<ShopResponse>(shop,{
            expand: 'tenant',
        });
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateShop(shop:ShopResponse) {
    try {
        const record = await pb.collection('shops').update<ShopResponse>(shop.id,shop,{
            expand: 'tenant',
        });
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}


export async function getShops() {
    try {
        const records = await pb.collection('shops').getFullList<ShopResponse>({
            sort: '-created',
            expand: 'tenant',
        });
        return records
    } catch (error) {
        console.log("error loading shops",error)
        throw error
    }
}

export async function getShop(id:string) {
    try {
        const record = await pb.collection('shops').getFirstListItem<ShopResponse>(`id="${id}"`, {
            expand: 'tenant',
        });
        return record
    } catch (error) {
        console.log("error loading one shop", error)
        throw error 
    }
}
