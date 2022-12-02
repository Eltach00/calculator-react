import { useReducer } from 'react'
import './App.css'
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  ADD_OPERATION: 'add-operation',
  EVALUATE: 'evaluate',
  DELETE_DIGIT: 'delete-digit',
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOper: payload.digit,
        }
      }
      if (payload.digit === '0' && state.currentOper === '0') {
        return state
      }
      if (payload.digit === '.' && state.currentOper.includes('.')) {
        return state
      }
      return {
        ...state,
        currentOper: `${state.currentOper || ''}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.ADD_OPERATION:
      if (state.currentOper == null && state.prevOper == null) {
        return state
      }
      if (state.prevOper == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOper: state.currentOper,
          currentOper: null,
        }
      }
      if (state.currentOper == null) {
        return { ...state, operation: payload.operation }
      }
      return {
        ...state,
        prevOper: evalute(state),
        operation: payload.operation,
        currentOper: null,
      }
    case ACTIONS.EVALUATE:
      if (
        state.currentOper == null &&
        state.prevOper == null &&
        state.operation == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        currentOper: evalute(state),
        prevOper: null,
        operation: null,
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOper: null,
        }
      }
      if (state.currentOper == null) {
        return state
      }
      return {
        ...state,
        currentOper: state.currentOper.slice(0, -1),
      }
    default:
      break
  }
}

function evalute({ currentOper, prevOper, operation }) {
  const current = parseFloat(currentOper)
  const prev = parseFloat(prevOper)
  if (isNaN(current) || isNaN(prev)) {
    return ''
  }
  let result = ''
  switch (operation) {
    case '+':
      result = current + prev
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '/':
      result = prev / current
      break
  }

  return result.toString()
}

const App = () => {
  const [{ currentOper, prevOper, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  return (
    <div className="calculator">
      <div className="output">
        <div className="pr-oper">
          {prevOper} {operation}
        </div>
        <div className="cur-oper">{currentOper} </div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation={'/'} dispatch={dispatch} />
      <DigitButton digit={'1'} dispatch={dispatch} />
      <DigitButton digit={'2'} dispatch={dispatch} />
      <DigitButton digit={'3'} dispatch={dispatch} />
      <OperationButton operation={'*'} dispatch={dispatch} />
      <DigitButton digit={'4'} dispatch={dispatch} />
      <DigitButton digit={'5'} dispatch={dispatch} />
      <DigitButton digit={'6'} dispatch={dispatch} />
      <OperationButton operation={'+'} dispatch={dispatch} />
      <DigitButton digit={'7'} dispatch={dispatch} />
      <DigitButton digit={'8'} dispatch={dispatch} />
      <DigitButton digit={'9'} dispatch={dispatch} />
      <OperationButton operation={'-'} dispatch={dispatch} />
      <DigitButton digit={'.'} dispatch={dispatch} />
      <DigitButton digit={'0'} dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  )
}

export default App
