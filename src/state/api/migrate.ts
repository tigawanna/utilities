import shops_json from '../data/shops.json'
import pb_tenants from '../data/pb-tenants.json'
import tenants_json from '../data/tenants.json'
import { addShop } from './shops';
import { addTenant } from './tenant';


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
        await addTenant(tenant)
    }
}
