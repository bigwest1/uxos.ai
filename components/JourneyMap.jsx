import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StepCard from './StepCard';

export default function JourneyMap({ steps, onReorder }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(steps);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onReorder(reordered);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-brand-dark">
        2. Journey map
      </h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {steps.map((step, idx) => (
                <Draggable key={idx} draggableId={String(idx)} index={idx}>
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
