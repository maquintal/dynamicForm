// components/PageBuilder.js
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import TextComponent from './TextComponent';
import ImageComponent from './ImageComponent';

const componentTypes = {
  text: TextComponent,
  image: ImageComponent,
};

function PageBuilder() {
  const [components, setComponents] = useState([]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const movedComponent = components[source.index];
    const newComponents = [...components];
    newComponents.splice(source.index, 1);
    newComponents.splice(destination.index, 0, movedComponent);

    setComponents(newComponents);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="page" type="component">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {components.map((component, index) => (
              <Draggable key={index} draggableId={`component-${index}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {React.createElement(componentTypes[component.type], component)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default PageBuilder;
