import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./Atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (args: DropResult) => {
    const { destination, draggableId, source } = args;
    // if destination == null kill this function
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const sIndex = source.index;
        const dIndex = destination?.index;
        boardCopy.splice(sIndex, 1);
        boardCopy.splice(dIndex, 0, draggableId);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      setToDos((allBoards) => {
        const prvBoardCopy = [...allBoards[source.droppableId]];
        const nxtBoardCopy = [...allBoards[destination.droppableId]];
        prvBoardCopy.splice(source.index, 1);
        nxtBoardCopy.splice(destination.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: prvBoardCopy,
          [destination.droppableId]: nxtBoardCopy,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
          ;
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
export default App;
