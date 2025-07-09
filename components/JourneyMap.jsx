import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StepCard from './StepCard';

export default function JourneyMap({ steps, onReorder }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(steps);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    onReorder(items);
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Original Flow</h2>
      <div className="relative pl-8">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-700"></div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="journey">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-6"
              >
                {steps.map((step, idx) => (
                  <Draggable key={idx} draggableId={`step-${idx}`} index={idx}>
                    {(prov) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                      >
                        <StepCard step={step} index={idx} />
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
    </section>
  );
}
