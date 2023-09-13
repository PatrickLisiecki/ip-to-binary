import { useState } from 'react'

function App() {
  const [IPv4, setIPv4] = useState("")
  const [binary, setBinary] = useState("")

  const handleInputChange = (e) => {
    setIPv4(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    convertToBinary(IPv4)
  }

  const convertToBinary = (ipString) => {
    var firstNum = 0;
    var secondNum = 0;
    var thirdNum = 0;
    var fourthNum = 0;

    var currentSection = 1
    var currentNum = ""

    for (let i = 0; i < ipString.length; i++) {
      const currentChar = ipString.charAt(i)

      if (currentChar === ".") {
        switch (currentSection) {
          case 1:
            firstNum = Number(currentNum)
            currentSection = 2
            break
          case 2:
            secondNum = Number(currentNum)
            currentSection = 3
            break
          case 3:
            thirdNum = Number(currentNum)
            currentSection = 4
            break
          case 4:
            fourthNum = Number(currentNum)
            break
          default:
            console.log("Error occurred!")
            break
        }

        currentNum = ""
      } else {
        currentNum += currentChar
      }
    }

    console.log(firstNum + " " + secondNum + " " + thirdNum + " " + fourthNum)
    // setBinary(ipNum)
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-black">
      <div className="w-full text-center pt-32 pb-10"><h1 className="text-[46px] text-white font-semibold">IPv4 Address to Binary Converter</h1></div>
      <div className="min-w-[350px] sm:min-w-[500px] min-h-[300px]">
        <form className="w-full p-4 flex flex-col justify-center items-center gap-y-4">
          <div className="w-full flex flex-row gap-x-2">
            <input
              type="text"
              id="ip"
              name="ip"
              placeholder="IPv4 Address"
              value={IPv4}
              onChange={(e) => handleInputChange(e)}
              className="w-full min-h-[60px] p-2 rounded-xl border-2 focus:outline-none focus:border-blue-500"
            />
            <button onClick={(e) => handleFormSubmit(e)} className="bg-white rounded-xl px-4 py-3 text-sm uppercase font-semibold hover:bg-gray-300">
              Convert
            </button>
          </div>
        </form>
        <div className="w-full p-4 flex flex-col justify-center items-center gap-y-4">
          <h2 className="text-white text-xl uppercase font-semibold">Binary</h2>
          {binary.length > 0 && <span className="text-white text-lg font-semibold">{binary}</span>}
        </div>
      </div>
    </main >
  )
}

export default App
