import React, { useState } from "react"
import { Formik, Form } from "formik"
import { drizzleReactHooks } from "@drizzle/react-plugin"
import SimpleAlerts from "../../alert"
import MyTextInput from "../../textInput"
import * as Yup from "yup"
import DashBoardLayout from "../../layout/dashboardLayout"
import "./index.css"

const CategoryType = () => {
  const [stackId, setStackId] = useState(null)
  const { useDrizzle, useDrizzleState } = drizzleReactHooks
  const { drizzle } = useDrizzle()
  const state = useDrizzleState((state) => state)

  const { transactions, transactionStack } = state
  const getTxStatus = () => {
    const txHash = transactionStack[stackId]
    if (!txHash) return null
    return (
      transactions[txHash] && (
        <div>
          <SimpleAlerts
            severity={transactions[txHash].status}
            message={`transaction ${transactions[txHash].status}`}
          ></SimpleAlerts>
        </div>
      )
    )
  }

  const submitCategory = (name) => {
    const contract = drizzle.contracts.Category
    const Id = contract.methods["addCategoryType"].cacheSend(name, {
      from: state.accounts[0],
    })
    setStackId(Id)
  }

 
  const CategoryForm = () => {
    return (
      <section className="category__container">
        <Formik
          initialValues={{
            categoryType: "",
          }}
          validationSchema={Yup.object({
            categoryType: Yup.string()
              .max(15, "Must be 15 characters or less")
              .min(2, "minimum of two char")
              .required("category Type is Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            submitCategory(values.categoryType)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <MyTextInput label="CategoryType" name="categoryType" type="text" placeholder="active" />
              <button type="submit" className="submit__active" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </section>
    )
  }

  return (
    <section>
      <DashBoardLayout>
        <div>{getTxStatus()}</div>
        <CategoryForm />
      </DashBoardLayout>
    </section>
  )
}

export default CategoryType