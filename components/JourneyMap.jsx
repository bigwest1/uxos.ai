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
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-brand-dark">Original Flow</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="journey">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
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
    </section>
  );
}
