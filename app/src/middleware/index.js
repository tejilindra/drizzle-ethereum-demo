import { toast } from "react-toastify"
import { generateStore, EventActions } from "@drizzle/store"
import drizzleOptions from "../drizzle"

const contractEventNotifier = (store) => (next) => (action) => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    const contractEvent = action.event.event
    const data = action.event.returnValues
    const display = `${contract}(${contractEvent})`
    toast.success(display, { position: toast.POSITION.TOP_RIGHT })
  }
  return next(action)
}

const appMiddlewares = [contractEventNotifier]

const store = generateStore({
  drizzleOptions,
  appMiddlewares,
  disableReduxDevTools: false, // enable ReduxDevTools!
})

export default store
