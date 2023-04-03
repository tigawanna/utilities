import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { caclulatePeriod } from '../../components/bills/bill_utils'
import { BillsPeriod } from '../../components/bills/PeriodPicker'

interface BillsState {

    period:BillsPeriod
    updatePeriod: (period:BillsPeriod) => void
}

export const useBillsStore = create<BillsState>()(
    devtools(
        persist(
            (set) => ({
          
                period: caclulatePeriod(new Date().getMonth() + 1, new Date().getFullYear()),
                updatePeriod: (period) => set((state) => ({period}))
            }),
            {
                name: 'bills-storage',
            }
        )
    )
)
