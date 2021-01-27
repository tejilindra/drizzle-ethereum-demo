import React from "react"
import { render, screen } from "@testing-library/react"
import { drizzleReactHooks } from "@drizzle/react-plugin"
import Category from "./index"
import sinon from "sinon"
import { MemoryRouter } from "react-router"

describe("Category Type Render Test", () => {
  let sinons
  let drizzlestate
  beforeAll(() => {
    sinons = sinon.stub(drizzleReactHooks, "useDrizzle").returns({
      drizzle: {
        contracts: {
          Category: {
            methods: {
              addCategory: {
                cacheSend: (...args) => {},
              },
            },
          },
        },
      },
    })

    drizzlestate = sinon.stub(drizzleReactHooks, "useDrizzleState").callsFake((...args) => {
      return {
        accounts: ["0x000000000000AAAAAAAA00"],
        transactions: {
          key: true,
        },
        transactionStack: ["key"],
      }
    })
  })

  afterAll(() => {
    sinons.restore()
    drizzlestate.restore()
  })

  test("renders Category Type component successfully", () => {
    render(
      <MemoryRouter initialEntries={["/category/type"]}>
        <Category />
      </MemoryRouter>
    )
    expect(screen.getByText("CategoryType")).toBeInTheDocument()
  })
})
