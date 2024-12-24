import { useState, useCallback, useEffect, useRef} from 'react'

import './App.css'

function App() {
  const [numberallowed , setnumber] = useState(false);
  const [charallowed , setchar] = useState(false);
  const [length , setlength] = useState(8);
  const [password , setpassword] = useState("");


  //copy 
  const passwordref = useRef(null); 
 const passwordcopy = useCallback(()=>{
  passwordref.current?.select()
  passwordref.current.setSelectionRange(0 , 500)
 window.navigator.clipboard.writeText(password)
 },[password])



  const passwordgenerator = useCallback(()=>{
   let pass = ""
   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

   if (numberallowed) str += "1234567890"
   if(charallowed)  str += "!@#$%^&*()_"

for (let i = 1; i <= length; i++) {
  let char = Math.floor(Math.random() * str.length +1)

    pass += str.charAt(char)
  
}

setpassword(pass)

  }, [numberallowed, charallowed, length, setpassword ])


  useEffect(()=>{
  passwordgenerator()
  }, [numberallowed, charallowed, length , setpassword])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
     <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        type="text" 
        value={password}
        className="outline-none w-full py-1 px-3"
        placeholder="Password"
        readOnly
        ref={passwordref}
        
        />
         
         <button
        onClick={passwordcopy}
        className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min= {16}
          max = {100}
          value={length}
           className='cursor-pointer'
           onChange={(e)=>{setlength(e.target.value)}}
           
          />
          <label >length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={numberallowed}
          id="numberInput"
          onChange={() => {
              setnumber((prev) => !prev);
          }}
          />
           <label htmlFor="numberInput">Numbers</label>
        </div>
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charallowed}
              id="characterInput"
              onChange={() => {
                  setchar((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
     </div>
    </>
  )
}

export default App
