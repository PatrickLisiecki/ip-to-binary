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
    // Store each octet as its own element
    const bytes = []

    // Keep track of the current octet
    let currentNum = ""

    for (let i = 0; i < ipString.length; i++) {
      const currentChar = ipString.charAt(i)

      // If we reach the end of an octet
      if (currentChar === ".") {
        bytes.push(Number(currentNum))
        currentNum = ""
      } else {
        currentNum += currentChar
      }
    }

    // Push the last octet into the array
    bytes.push(Number(currentNum))

    console.log(bytes)

    // Store the final binary strings
    const finalBinary = []

    // Convert each octet to binary
    for (let i = 0; i < bytes.length; i++) {
      let binaryString = ""
      let quotient = bytes[i]
      let valid = true

      // While the quotient > 0
      while (valid) {
        let remainder = quotient % 2;

        // console.log("Remainder: ", remainder)

        // Append the correct bit (0 or 1)
        switch (remainder) {
          case 0:
            binaryString += "0"
            break
          case 1:
            binaryString += "1"
            break
          default:
            console.log("Error")
            break
        }

        // console.log("Quotient: ", quotient)

        // quotient = 192
        // quotient = 192 / 2
        // quotient = 96
        quotient = Math.floor(quotient / 2)

        // Check if we can't divide any further
        if (quotient == 0) {
          valid = false
        }
      }

      // Add zeros to ensure the binary string is byte size
      if (binaryString.length != 8) {
        while (binaryString.length < 8) {
          binaryString += "0"
        }
      }

      // Reverse the byte
      let reversedString = binaryString.split("").reverse().join("")

      // Push the byte to final binary
      finalBinary.push(reversedString)
    }

    console.log(finalBinary)

    // Convert final binaries to a string
    let finalBinaryString = finalBinary.join(".")

    setBinary(finalBinaryString)
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
          {binary.length > 0 &&
            <div className="w-full flex flex-col justify-center items-center gap-y-2">
              <h2 className="text-white text-xl uppercase font-semibold">Binary</h2>
              <span className="text-white text-lg font-semibold tracking-[6px]">{binary}</span>
            </div>
          }
        </div>
      </div>
    </main >
  )
}

export default App
