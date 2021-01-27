import React, { useState } from "react"
import { Formik, Form } from "formik"
import { drizzleReactHooks } from "@drizzle/react-plugin"
import MyTextInput from "../../textInput"
import * as Yup from "yup"
import DashBoardLayout from "../../layout/dashboardLayout"

const Category = () => {
  const { useDrizzle, useDrizzleState } = drizzleReactHooks
  const { drizzle } = useDrizzle()
  const state = useDrizzleState((state) => state)

  const submitCategory = (values) => {
    const contract = drizzle.contracts.Category
    const Id = contract.methods["addCategory"].cacheSend(values.address, values.categoryType, {
      from: state.accounts[0],
    })
  }
  const CategoryForm = () => {
    return (
      <section className="category__container">
        <Formik
          initialValues={{
            categoryType: 0,
            address: "",
          }}
          validationSchema={Yup.object({
            categoryType: Yup.number().min(0).required("category Type index is Required"),
            address: Yup.string().min(42, "address not valid").required(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            submitCategory(values)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <MyTextInput
                label="CategoryType Index"
                name="categoryType"
                type="number"
                placeholder="0"
              />
              <MyTextInput
                label="Category address"
                name="address"
                type="text"
                placeholder="address"
              />
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
        <CategoryForm></CategoryForm>
      </DashBoardLayout>
    </section>
  )
}

export default Category
