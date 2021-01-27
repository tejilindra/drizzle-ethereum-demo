import React from "react"
import { render, screen } from "@testing-library/react"
import { drizzleReactHooks } from "@drizzle/react-plugin"
import AllCategory from "./index"
import sinon from "sinon"
import { MemoryRouter } from "react-router"

describe("All Category Render Test", () => {
  let sinons, drizzlestate
  beforeAll(() => {
    sinons = sinon.stub(drizzleReactHooks, "useDrizzle").returns({
      useCacheCall: (...args) => 2,
      drizzle: {
        contracts: {
          Category: {
            methods: {
              getCategoryListItem: {
                cacheCall: (...args) => 0,
              },
            },
          },
        },
      },
    })

    drizzlestate = sinon.stub(drizzleReactHooks, "useDrizzleState").callsFake((...args) => {
      return {
        accounts: ["0x000000000000AAAAAAAA00"],
        contracts: {
          Category: {
            getCategoryListItem: [
              {
                value: ["1234567", "true", "active"],
              },
            ],
          },
        },
      }
    })
  })

  afterAll(() => {
    sinons.restore()
    drizzlestate.restore()
  })

  test("renders all Category component successfully", () => {
    render(
      <MemoryRouter initialEntries={["/category/all"]}>
        <AllCategory />
      </MemoryRouter>
    )
  })
})
