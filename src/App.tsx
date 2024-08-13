import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { decrement, increment } from './redux/counter/createSlice'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { Button } from 'react-bootstrap';

function App() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div >
        <h1>
          count is {count}
        </h1>

      </div>
      <Button onClick={() => {
        dispatch(increment())
      }}>
        Increase +1
      </Button>
      <Button onClick={() => {
        dispatch(decrement())
      }}>
        Descrease -1
      </Button>

    </>
  )
}

export default App
