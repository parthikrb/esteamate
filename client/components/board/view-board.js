import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateRetro, addRetro, deleteRetro } from "../../store/actions/retro";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddRetroPoint from "./add-retro-point";
import RetroActions from "./retro-actions";
import EditPoint from "./edit-point";

const onDragEnd = (
  result,
  columns,
  setColumns,
  retros,
  onUpdate,
  currentUser
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  const id = result.draggableId;
  const retroPoint = retros.find((retro) => retro.id === id);
  const data = {
    classification: destination.droppableId,
    description: retroPoint.description,
    sprint: retroPoint.sprint.id,
    created_by: retroPoint.createdBy,
    updated_by: currentUser.id,
  };

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    onUpdate(id, data);
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

const ViewBoard = React.memo(
  ({ retros, sprint, onSave, onUpdate, onDelete, history, currentUser }) => {
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

    const [openEdit, setOpenEdit] = useState(false);
    const [editPoint, setEditPoint] = useState(undefined);

    useEffect(() => {
      if (!history) {
        retros = retros && retros.filter((retro) => retro.resolved !== true);
      }
      if (sprint) {
        retros = retros && retros.filter((retro) => retro.sprint.id === sprint);
      }
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
    }, [retros, sprint]);

    const [columns, setColumns] = useState(initialColumn);

    const handleSave = (data) => {
      onSave(data);
    };

    const handleResolve = (id) => {
      const retroPoint = retros.find((retro) => retro.id === id);
      const data = {
        ...retroPoint,
        sprint: retroPoint.sprint.id,
        updated_by: currentUser.id,
        resolved: true,
      };
      onUpdate(id, data);
    };

    const handleEdit = (id) => {
      setOpenEdit(true);
      setEditPoint(retros.find((retro) => retro.id === id));
    };

    const handleDelete = (id) => {
      onDelete(id);
    };

    const handleAction = (operation, id) => {
      console.log(operation);
      switch (operation) {
        case "edit":
          handleEdit(id);
          break;
        case "delete":
          handleDelete(id);
          break;
        case "resolve":
          handleResolve(id);
          break;
        default:
          return;
      }
    };

    const handleCloseEdit = () => {
      setOpenEdit(false);
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          height: "80%",
        }}
      >
        <EditPoint
          shouldOpen={openEdit}
          shouldCloseView={handleCloseEdit}
          point={editPoint}
        />
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(
              result,
              columns,
              setColumns,
              retros,
              onUpdate,
              currentUser
            )
          }
        >
          {Object.entries(columns).map(([key, column]) => {
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
                            width: '24.8vw',
                            height: '66vh',
                            overflowY: "auto",
                          }}
                        >
                          {!history && (
                            <AddRetroPoint
                              classification={key}
                              sprint={sprint}
                              currentUser={currentUser}
                              handleSave={handleSave}
                            />
                          )}
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                                isDragDisabled={history}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        display: "flex",
                                        padding: 5,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",

                                        backgroundColor: snapshot.isDragging
                                          ? "#33135C"
                                          : key === "good"
                                          ? "lightgreen"
                                          : key === "bad"
                                          ? "#FC6C85"
                                          : key === "action" && !item.resolved
                                          ? "orange"
                                          : key === "action" && item.resolved
                                          ? "#AFE3D0"
                                          : "inherit",
                                        color: snapshot.isDragging
                                          ? "white"
                                          : "black",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          flexWrap: "wrap",
                                          flexDirection: "column",
                                          flexGrow: 1,
                                          maxWidth: "80%",
                                        }}
                                      >
                                        {item.description}
                                      </div>
                                      {!history &&
                                        currentUser &&
                                        (currentUser.isAdmin ||
                                          item.created_by ===
                                            currentUser.id) && (
                                          <RetroActions
                                            item={item}
                                            currentUser={currentUser}
                                            takeAction={handleAction}
                                          />
                                        )}
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
  }
);

const mapStateToProps = (state) => {
  return {
    retros: state.retro.retros,
    loading: state.retro.loading,
    error: state.retro.error,
    currentUser: state.current_user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (data) => dispatch(addRetro(data)),
    onUpdate: (id, data) => dispatch(updateRetro(id, { ...data })),
    onDelete: (id) => dispatch(deleteRetro(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBoard);
