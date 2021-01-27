import React from "react"
import { render, screen } from "@testing-library/react"
import { drizzleReactHooks } from "@drizzle/react-plugin"
import Category from "./index"
import sinon from "sinon"
import { MemoryRouter } from "react-router"

describe("Status Test", () => {
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
      }
    })
  })

  afterAll(() => {
    sinons.restore()
    drizzlestate.restore()
  })

  test("renders Category component successfully", () => {
    render(
      <MemoryRouter initialEntries={["/category"]}>
        <Category />
      </MemoryRouter>
    )
    expect(screen.getByText("CategoryType Index")).toBeInTheDocument()
    expect(screen.getByText("Category address")).toBeInTheDocument()
  })
})
