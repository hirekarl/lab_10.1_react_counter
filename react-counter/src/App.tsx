import "./App.css"

import Counter from "./components/Counter/Counter"

const App = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
            <h1 className="my-4 text-center">
              Lab 10.1: React Counter with <code>useEffect</code>
            </h1>
          </div>
          <div className="col-lg-4 offset-lg-4 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
            <Counter />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
