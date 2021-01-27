import React from "react"
import DashBoardLayout from "../../layout/dashboardLayout"
import { drizzleReactHooks } from "@drizzle/react-plugin"
import AllCategoryTable from "../../allCategoryTable"

const AllCategory = () => {
  const { useDrizzle, useDrizzleState } = drizzleReactHooks
  const { useCacheCall, drizzle } = useDrizzle()
  const state = useDrizzleState((state) => state)
  let count = 1
  
  const getAllCategory = () => {
    const length = useCacheCall("Category", "getCategoryListLength")
    const contract = drizzle.contracts.Category
    let itemArray = []
    for (let i = length - 1; i >= 0; i--) {
      const itemkey = contract.methods["getCategoryListItem"].cacheCall(i, {
        from: state.accounts[0],
      })
      const item = state.contracts["Category"]["getCategoryListItem"][itemkey]
      if (item?.value) {
        const data = {
          id: count++,
          activationTime: item.value[0],
          isActive: item.value[1],
          categoryType: item.value[2],
        }
        itemArray.push(data)
      }
    }
    return itemArray
  }
  return (
    <section>
      <DashBoardLayout>
        <div>
          <AllCategoryTable data={getAllCategory()}></AllCategoryTable>
        </div>
      </DashBoardLayout>
    </section>
  )
}

export default AllCategory
