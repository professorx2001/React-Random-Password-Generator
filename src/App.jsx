
import { useCallback, useEffect, useState, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumber] = useState(false)
  const [characters, setCharacter] = useState(false)
  const [password, setPassword] = useState()
  const passwordRef = useRef()

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str+= "0123456789"
    if(characters) str+= "!@#$%^&*()_+=-{}[]|\,.<>/?`~"

    for(let i = 0; i < length; i++){
      let index = Math.floor(Math.random() * str.length)
      pass += str.charAt(index)
    }
    setPassword(pass)
  }, [length, numbers, characters, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, numbers, characters, passwordGenerator])

  const copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    //for selecting specific range
    // passwordRef.current?.focus();
    // passwordRef.current?.setSelectionRange(0, 4)
    window.navigator.clipboard.writeText(password)
    
  }, [password])


  return (
    <>
      <div className='max-w-max mx-auto flex flex-col justify-center my-8 p-4 bg-gray-300 rounded-lg '>
        <h1 className='mx-auto bg-black font-bold max-w-max p-2 rounded-lg text-white'>Password Generator</h1>

        <div className='max-w-max mx-auto'>

          <input className='shadow-sm rounded-md px-2 py-2 m2' type="text" value={password} placeholder='Password' readOnly ref={passwordRef} />

          <button className='bg-gray-500 m-2 p-2 rounded-md text-white' onClick={copyToClipboard}>! Copy !</button>
        </div>
        <div>
          <input type="range" min={8} max={15} value={length} onChange={(e) =>{setLength(e.target.value)}}/>
          <label htmlFor=""> Length: {length} </label>

          <input
          type="checkbox"
          className="m-2"
          id="num"
          defaultChecked={numbers}
          onChange={(e) => setNumber((prev) => !prev)} />
          <label htmlFor="num">Num</label>

          <input type="checkbox" className='m-2' id='char' defaultChecked = {characters} onChange={() => {
            setCharacter((prev) => !prev)
          }}/>
          <label htmlFor="char">Char</label>
        </div>
      </div>
    </>
  )
}

export default App
