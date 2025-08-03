import React, { useCallback, useEffect, useState } from "react"
import { Card, Button, ButtonGroup, ListGroup } from "react-bootstrap"
import type { status } from "../../types"

const Counter = () => {
  const MIN_COUNT = 0
  const MIN_STEP_VALUE = 1
  const LOCAL_STORAGE_DELAY = 250 // ms

  const [count, setCount] = useState<number>(MIN_COUNT)
  const [stepValue, setStepValue] = useState<number>(MIN_STEP_VALUE)
  const [countHistory, setCountHistory] = useState<number[]>([MIN_COUNT])
  const [status, setStatus] = useState<status>("")

  const handleDecrement = useCallback((): void => {
    setCount((prevCount) =>
      prevCount === MIN_COUNT ? MIN_COUNT : prevCount - stepValue
    )
  }, [stepValue])

  const handleIncrement = useCallback((): void => {
    setCount((prevCount) => prevCount + stepValue)
  }, [stepValue])

  const handleReset = (): void => {
    setCount(MIN_COUNT)
    setStepValue(MIN_STEP_VALUE)
    setCountHistory([MIN_COUNT])
  }

  const handleStepValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStepValue(parseInt(event.target.value))
  }

  useEffect(() => {
    if (countHistory[countHistory.length - 1] !== count) {
      setCountHistory((prevCountHistory) => [...prevCountHistory, count])
    }
  }, [count, countHistory])

  useEffect(() => {
    setStatus("Saving to localStorage...")
    try {
      localStorage.setItem("counts", JSON.stringify(countHistory))
    } catch (error) {
      setStatus(String(error))
    }
  }, [countHistory])

  useEffect(() => {
    const localStorageCounts = localStorage.getItem("counts")
    if (localStorageCounts) {
      if (JSON.parse(localStorageCounts).length === countHistory.length) {
        setTimeout(() => {
          setStatus("Changes saved.")
        }, LOCAL_STORAGE_DELAY)
      }
    } else {
      setStatus("There was a problem saving to localStorage.")
    }
  }, [countHistory])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowUp") handleIncrement()
      else if (event.key === "ArrowDown") handleDecrement()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleIncrement, handleDecrement])

  const countHistoryList = countHistory.map((c, i) => (
    <ListGroup.Item key={i}>{c}</ListGroup.Item>
  ))

  return (
    <Card>
      <Card.Body className="text-center">
        <Card.Title className="my-3">
          <h2>Counter</h2>
        </Card.Title>
        <Card.Subtitle className="my-3">
          <h3>Current Count: {count}</h3>
        </Card.Subtitle>
        <ButtonGroup
          className="my-3"
          role="group"
          aria-label="Change Counter properties.">
          <Button
            variant="secondary"
            onClick={handleDecrement}
            disabled={count === 0}>
            - Decrement
          </Button>
          <Button variant="primary" onClick={handleIncrement}>
            Increment +
          </Button>
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
        </ButtonGroup>
        <div className="container my-3">
          <div className="row g-3 align-items-center">
            <div className="col-3 offset-3">
              <label htmlFor="step-value-input" className="col-form-label">
                Step Value:
              </label>
            </div>
            <div className="col-3">
              <input
                id="step-value-input"
                type="number"
                className="form-control"
                min={0}
                onChange={handleStepValueChange}
                value={stepValue}
              />
            </div>
          </div>
        </div>
        <div className="my-3">{status}</div>
      </Card.Body>
      <Card.Footer>
        <h3 className="mb-3 text-center">Count History</h3>
        <ListGroup className="mb-3">{countHistoryList}</ListGroup>
        <p className="text-muted text-center">
          Use ArrowUp to increment and ArrowDown to decrement.
        </p>
      </Card.Footer>
    </Card>
  )
}

export default Counter
