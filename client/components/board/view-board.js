import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addRetro } from "../../store/actions/retro";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddRetroPoint from "./add-retro-point";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const ViewBoard = React.memo(({ retros, onSave }) => {
  const initialColumn = {
    good: {
      name: "Went well",
      items: [],
    },
    bad: {
      name: "Needs Improvement",
      items: [],
    },
    action: {
      name: "Action Items",
      items: [],
    },
  };

  useEffect(() => {
    console.log("Inside");
    const copiedGood = { ...columns.good };
    const copiedBad = { ...columns.bad };
    const copiedAction = { ...columns.action };
    setColumns({
      ...columns,
      good: {
        ...copiedGood,
        items: retros.filter((retro) => retro.classification === "good"),
      },
      bad: {
        ...copiedBad,
        items: retros.filter((retro) => retro.classification === "bad"),
      },
      action: {
        ...copiedAction,
        items: retros.filter((retro) => retro.classification === "action"),
      },
    });
  }, [retros]);

  const [columns, setColumns] = useState(initialColumn);
  const handleSave = (data) => {
    onSave(data);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "space-around", height: "80%" }}
    >
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([key, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={key}
            >
              <h3 style={{ marginBottom: 0 }}>{column.name}</h3>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={key} key={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgray",
                          padding: 4,
                          width: 320,
                          height: 420,
                          overflowY: "auto",
                        }}
                      >
                        <AddRetroPoint
                          classification={key}
                          handleSave={handleSave}
                        />
                        {column.items.map((item, index) => {
                          //   console.log(item);
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 5,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#33135C"
                                        : key === "good"
                                        ? "lightgreen"
                                        : key === "bad"
                                        ? "#FC6C85"
                                        : key === "action"
                                        ? "orange"
                                        : "inherit",
                                      color: snapshot.isDragging
                                        ? "white"
                                        : "black",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.description}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    retros: state.retro.retros,
    loading: state.retro.loading,
    error: state.retro.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (data) => dispatch(addRetro(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBoard);
