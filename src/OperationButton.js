import { ACTIONS } from './App'

const OperationButton = ({ dispatch, operation }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}

export default OperationButton
