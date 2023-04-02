import shops_json from '../data/shops.json'
import pb_tenants from '../data/pb-tenants.json'
import bills_json from  '../data/bills.json'
import pb_shops from '../data/pb_shops.json'
import tenants_json from '../data/tenants.json'
import full_supa_bills_json from '../data/full_supa_bills.json'

import shops_with_supaid from '../data/shop_with_supaid.json'
import { addShop, ShopMutationFields, ShopResponse } from './shops';
import { addTenant } from './tenant';
import { addBill, BillMutationFields } from './bills'
import { pb } from '../pb/config'


interface OldShop {
    id: string;
    created_at: string;
    tenant: string;
    shop_number: string;
    order: number;
    has_water: boolean;
    has_elec: boolean;
    is_vacant: boolean;
}

interface OldBill {
    id: string;
    created_at: string;
    shop: {
        id: string;
        shop_number: string;
        tenant: {
            id: string;
            tenant_name: string;
        };
    };
    elec_readings: number;
    water_readings: number;
    month: number;
    year: number;
}

function matchTeanatToShop(a_shop: OldShop) {
    const pb_tenant = pb_tenants.find(tenant => {
        return (tenant.supa_id === a_shop.tenant)
    })


    const genUtils = () => {
        if (a_shop.has_water && a_shop.has_elec) {
            return "both"
        }
        if (a_shop.has_elec) {
            return "elec"
        }
        return "water"
    }
    // console.log("pb_tenant",pb_tenant)
    return {
        tenant: pb_tenant?.id,
        shop_number: a_shop.shop_number,
        utils: genUtils(),
        order: a_shop.order,
        supa_id: a_shop.id
    }
}

function matchPbShopToShop(pb_shop:ShopResponse) {
    return  shops_json.find(shop => (shop.shop_number === pb_shop.shop_number))
}

export function addSupaIdtopbShops(){
return pb_shops.map(pb_shop => {
    // @ts-expect-error
    pb_shop['supa_shop_id']=matchPbShopToShop(pb_shop)?.id
    return pb_shop
})
}
// ^(G-[0-9][1-9]|G-[1-9][0-9]|M[1-9]-[0-9][1-9]|M[1-9]-[1-9][0-9]|BASEMENT|NIBS)$



export async function migrateShops() {
    for await (const a_shop of shops_json) {
        const shop = matchTeanatToShop(a_shop)
        // @ts-ignore
    return await addShop(shop)
    }
}


export async function migrateTenantdtae() {
    for await (const a_tenant of tenants_json) {
        const tenant = {
            name: a_tenant.tenant_name,
            supa_id: a_tenant.id,
        }
        return await addTenant(tenant)
    }
}



function matchshopToBill(bill:OldBill){
    return pb_shops.find(shop => (shop.shop_number === bill.shop.shop_number))
}


// elec_readings
// :
// 39526.8
// month
// :
// 1
// water_readings
// :
// 39526.8
// year
// :
// 2022

export async function migrateBills() {

    
    for await (const a_bill of full_supa_bills_json) {
        console.log("a_bill",a_bill)
        const shop = matchshopToBill(a_bill)?.id as string
        const new_bill:BillMutationFields = {
            elec_readings:a_bill.elec_readings,
            water_readings:a_bill.water_readings,
            month:a_bill.month,
            year:a_bill.year,
            shop
        }
        if(!shop){
            console.log("shop not found",a_bill)
            return
        }
       
        return await addBill(new_bill)


    }
}



export async function migrateAllBills() {
    pb.autoCancellation(false);
    const promises = full_supa_bills_json.map(async (a_bill) => {
        console.log("a_bill", a_bill)
        const shop = matchshopToBill(a_bill)?.id as string
        const new_bill: BillMutationFields = {
            elec_readings: a_bill.elec_readings,
            water_readings: a_bill.water_readings,
            month: a_bill.month,
            year: a_bill.year,
            shop
        }
        if (!shop) {
            console.log("shop not found", a_bill)
            return
        }

        return await addBill(new_bill)
    })
    return Promise.all(promises)
}
