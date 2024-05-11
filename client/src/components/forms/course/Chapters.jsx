import AddChapterDialog from "@/components/dialogs/AddChapterDialog";
import axios from "axios";
import { Grip, Pencil, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 1,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgray" : "#e0eaf0",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  padding: grid,
});

const Chapters = ({ initialValue, courseId, refresh }) => {
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(initialValue);
  }, [initialValue]);

  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) return;

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);

    setLoading(true);
    axios
      .patch("https://udemy.dev/api/courses/" + courseId, {
        chapters: newItems,
      })
      .then((response) => {
        toast.success("Course chapters updated successfully");
        setLoading(false);
        refresh();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response?.data?.error?.message || error.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-full bg-slate-100 rounded-lg p-5">
      <div className="flex justify-between">
        <span className="font-inter font-semibold text-base text-black/80">
          Course Chapters
        </span>
        <span className="cursor-pointer text-sm">
          <AddChapterDialog
            trigger={
              <div className="flex items-center">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add chapter
              </div>
            }
            courseId={courseId}
            refresh={refresh}
          />
        </span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items?.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className="rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Grip className="h-5 w-5 mr-2" />
                          {item?.title}
                        </span>
                        <span className="flex items-center">
                          <span className="bg-slate-500 text-white px-2 mr-4 py-0.5 text-xs rounded-3xl">
                            {item?.status}
                          </span>
                          <Link
                            to={`/instructor/courses/${courseId}/chapter/${item._id}`}
                          >
                            <Pencil className="h-4 w-4 text-green-700" />
                          </Link>
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Chapters;
