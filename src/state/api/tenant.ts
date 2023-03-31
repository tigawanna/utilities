import { pb } from "../pb/config";
import tenants_json from '../data/tenants.json'

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
}


export async function migrateTenantdtae() {
    for await (const a_tenant of tenants_json) {
        const tenant = {
        name:a_tenant.tenant_name,
        supa_id:a_tenant.id,
        }
        await addTenant(tenant)
    }
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
