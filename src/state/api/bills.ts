import { pb } from "../pb/config";
import { ShopResponse } from "./shops";

export interface BillExpand {
    shop:ShopResponse
}
export interface BillResponse {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    shop: string
    elec_readings: number
    water_readings: number
    month: number
    year: number
    expand:BillExpand 
}

export type BillMutationFields = Pick<BillResponse,"elec_readings"|"water_readings"|"month"|"year"|"shop">

export async function getBills(filter?:string){
try {
    const records = await pb.collection('bills').getFullList<BillResponse>({

        expand:'shop,shop.tenant',
        filter
    });
    return records
} catch (error) {
    console.log("error getting bills  === ",error)
    throw error
}
}



export async function addBill(bills: BillMutationFields) {
    try {
        const record = await pb.collection('bills').create<BillResponse>(bills, {
            expand: 'shop',
        });
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateShop(bill_id: string, bill: BillMutationFields) {
    try {
        const record = await pb.collection('bills').update<BillResponse>(bill_id, bill, {
            expand: 'shop',
        });
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}
