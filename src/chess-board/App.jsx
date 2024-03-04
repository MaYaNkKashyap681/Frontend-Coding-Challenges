import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [boardWidth, setBoardWidth] = useState(null);
  const [boardHeight, setBoardHeight] = useState(null);
  const [chessArray, setChessArray] = useState([
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
  ]);

  const contRef = useRef(null);

  const handleColorChange = (boardI, boardJ) => {
    const newArray = 
    [[1, 0, 1, 0, 1, 0, 1, 0],
     [0, 1, 0, 1, 0, 1, 0, 1],
     [1, 0, 1, 0, 1, 0, 1, 0],
     [0, 1, 0, 1, 0, 1, 0, 1],
     [1, 0, 1, 0, 1, 0, 1, 0],
     [0, 1, 0, 1, 0, 1, 0, 1],
     [1, 0, 1, 0, 1, 0, 1, 0],
     [0, 1, 0, 1, 0, 1, 0, 1]]
     
     newArray[boardI][boardJ] = 2;
     let i = boardI;
     let j = boardJ;
     while(i >= 0 && j >= 0) {
        newArray[i][j] = 2;
        i--;j--;
     }
     i = boardI;
     j = boardJ;
     while(i >= 0 && j < 8) {
        newArray[i][j] = 2;
        i--;j++;
     }
     i = boardI;
     j = boardJ;
     while(i < 8 && j < 8) {
        newArray[i][j] = 2;
        i++;j++;
     }
     i = boardI;
     j = boardJ;
     while(i < 8 && j >= 0) {
        newArray[i][j] = 2;
        i++;j--;
     }
     setChessArray(newArray);
  }

  useEffect(() => {
    if (contRef && contRef.current) {
      const dims = contRef.current.getBoundingClientRect();
      setBoardWidth(dims.width);
      setBoardHeight(dims.height);
    }
  }, []);

  const getColour = (colValue) => {
    if(colValue == 0) {return "#000000"}
    else if(colValue == 1) {return "#ffffff"}
    else {return "#ff0000"}
  } 

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#000000]">
      <div className="w-[600px] h-[600px] border-[2px] border-[#ffffff]" ref={contRef}>
        {chessArray.map((item, i) => (
          <div className="flex border-[2px] border-[#000000]" key = {i} style={{
            height: (boardHeight - 4) / 8 + "px"
          }}>
            {item.map((block, j) => (
              <div className="" key={i + j} style={{
                width: boardWidth / 8 + "px",
                backgroundColor: getColour(block)
              }}
              onClick={() => handleColorChange(i, j)}
              >
             
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
