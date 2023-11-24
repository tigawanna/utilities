import { PocketBaseClient } from "@/lib/pb/client";
import { UtilityShopsResponse } from "@/lib/pb/db-types";


interface BillsPeriod {
    curr_month: number;
    curr_year: number;
    prev_month: number;
    prev_year: number;
}
export interface BillExpand {
    shop:UtilityShopsResponse
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

export interface MonthlyBills {
    shop_id: string;
    curr_bill_id: string;
    prev_bill_id: string;
    shop_number: string;
    shop_name: string;
    curr_year: string;
    curr_month: string;
    prev_year: string;
    prev_month: string;
    list_order: string;
    current_elec: string;
    previous_elec: string;
    elec_diff: string;
    current_water: string;
    previous_water: string;
    water_diff: string;
}


export type BillMutationFields = Pick<BillResponse,"elec_readings"|"water_readings"|"month"|"year"|"shop">
export type BillUpdateFields = Pick<BillResponse, "elec_readings" | "water_readings" | "month" | "year" | "shop"|"id">

export async function getBills(pb:PocketBaseClient,filter?:string){
try {
    const records = await pb.collection("utility_bills").getFullList({
        expand:'shop,shop.tenant',
        filter
    });
    return records
} catch (error) {
    console.log("error getting bills  === ",error)
    throw error
}
}


export async function getOneBill(pb: PocketBaseClient,filter:string){
try {
    const record = await pb.collection("utility_bills").getFirstListItem(filter, {
        expand: 'shop,shop.tenant',
    });
    return record
} catch (error) {
    console.log("error getting bill  === ", error)
    throw error
}
}

export async function getMonthlyBills(pb: PocketBaseClient,period:BillsPeriod){
try {
    const records = await pb.send<{result:MonthlyBills[]}>('/custom_utility_bills',{params:period})
    return records
} catch (error) {
    console.log("error getting monthly bills  === ", error)
    throw error
}
}

export async function addBill(pb: PocketBaseClient,bill: BillMutationFields) {
    // console.log("creating bill ", bill)
    try {
        const record = await pb.collection("utility_bills").create(bill, {
            expand: 'shop',
        });
        return record
    } catch (error) {
        console.log("error adding bills ",error)
        throw error
    }
}

export async function updateBill(pb: PocketBaseClient,bill: BillUpdateFields) {
    // console.log("updating bill ",bill)
    try {
        const record = await pb.collection("utility_bills").update(bill.id, bill, {
            expand: 'shop',
        });
        return record
    } catch (error) {
        console.log(error)
        throw error
    }
}
