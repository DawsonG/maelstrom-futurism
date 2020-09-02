import React, { Fragment, useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

// import renderEntities from './renderEntities';
import { brightness, hexToDecimal } from "../utils/colors";

import * as styles from "./Annotator.styles";
import { IAnnotator, ILabel } from "./Annotator.interfaces";

const Annotator: React.FC<IAnnotator> = ({
  name,
  label,
  value,
  isEditable = true,
  defaultEntities,
  entityLabels
}) => {
  let inputNode = useRef(null);

  const [selections, setSelections] = useState([]);
  const [text, setText] = useState(value || "");
  const [entities, setEntities] = useState(defaultEntities || []);

  const handleEntityClick = (label: ILabel) => {
    if (selections.length < 1) return;

    const { start, end } = selections.pop();
    const value = text.substr(start, end - start);

    setEntities(prevState => [...prevState, { start, end, value, label }]);
    setSelections([]);
  };

  const selectionChangeHandler = () => {
    const selection = window.getSelection();

    if (
      selection.anchorNode &&
      selection.anchorNode.parentNode === inputNode.current
    ) {
      setSelections(prevState => {
        const newSelection = {
          start: selection.anchorOffset,
          end: (selection as any).extentOffset // missing TS item
        };

        // Don't allow the selection to just grow and grow. Cap it at a reasonable level.
        if (prevState.length > 50) {
          return [newSelection];
        }

        return [...prevState, newSelection];
      });
    }
  };

  useEffect(() => {
    document.addEventListener("selectionchange", selectionChangeHandler, false);

    return () =>
      document.removeEventListener("selectionchange", selectionChangeHandler);
  }, [entities]);

  const handleTextChange = (event: any) => {
    const oldText = text;
    const oldEntities = entities;
    const newText = event.target.value;
    const newEntities = [];

    //update the entity boundaries

    oldEntities.forEach(oldEntity => {
      const oldSelection = oldText.substr(
        oldEntity.start,
        oldEntity.end - oldEntity.start
      );

      function findClosestStart(lastMatch?: number) {
        if (!lastMatch) {
          const index = newText.indexOf(oldSelection);
          if (index === -1) {
            return index;
          } else {
            return findClosestStart(index);
          }
        } else {
          const from = lastMatch + oldSelection.length;
          const index = newText.indexOf(oldSelection, from);
          if (index === -1) {
            return lastMatch;
          }
          const prevDiff = Math.abs(oldEntity.start - lastMatch);
          const nextDiff = Math.abs(oldEntity.start - index);
          if (prevDiff < nextDiff) {
            return lastMatch;
          } else {
            return findClosestStart(index);
          }
        }
      }
      const start = findClosestStart();
      if (start === -1) {
        return;
      }

      newEntities.push({
        ...oldEntity,
        start: start,
        end: start + oldSelection.length
      });
    });

    setEntities(newEntities);
    setText(newText);
  };

  let html = "";
  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    let charInserted = false;
    for (let entity of entities) {
      if (i === entity.start) {
        const color = hexToDecimal(entity.label.color);
        html += `<span class="mf_annotator_span" style="background-color: rgba(${color.r}, ${color.g}, ${color.b}, 0.4);">${char}`;
        charInserted = true;
      } else if (i === entity.end) {
        html += `</span>${char}`;
        charInserted = true;
      }
    }

    if (!charInserted) html += char;
  }

  return (
    <Fragment>
      {label && <label htmlFor={name}>{label}</label>}
      <div css={styles.wrapper}>
        <div css={styles.labelList}>
          {entityLabels &&
            entityLabels.map(label => (
              <span
                key={label.name}
                css={styles.labelStyle}
                style={{
                  backgroundColor: label.color,
                  color: brightness(label.color) < 50 ? "white" : "black"
                }}
                role="button"
                onClick={() => handleEntityClick(label)}
              >
                {label.name}
              </span>
            ))}
        </div>

        <div style={{ position: "relative" }}>
          <ContentEditable
            html={text}
            onChange={handleTextChange}
            innerRef={inputNode}
            css={styles.inputStyle}
            disabled={!isEditable}
          />

          <div
            css={styles.zeroPos}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        {/*entities.map(entity => <p>{entity.start}:{entity.end}:{entity.value}</p>)*/}
      </div>
    </Fragment>
  );
};

export default Annotator;
