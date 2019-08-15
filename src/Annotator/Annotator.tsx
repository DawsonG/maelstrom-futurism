import React, { Fragment, Component } from "react";
import { findDOMNode } from "react-dom";

// import Input from '../Input';
import { brightness } from "../utils/colors";
import * as styles from "./Annotator.styles";

interface EntityInterface {
  start: number;
  end: number;
  value: string;
  entity: Entity;
}

interface ExampleInterface {
  id: string;
  text: string;
  entities: Array<EntityInterface>;
}

type Entity = {
  name: string;
  color: string;
};

interface AnnotatorInterface {
  name: string;
  value?: any;
  label?: string;
  placeholder?: string;
  entityLabels: Array<Entity>;
  example: ExampleInterface;
}

class Annotator extends Component<AnnotatorInterface> {
  selectionAnchorNode: Node;
  inputNode: HTMLInputElement;

  state = {
    selection: [],
    entities: [],
    text: ""
  };

  componentDidMount() {
    document.addEventListener(
      "selectionchange",
      () => {
        const selection = window.getSelection();

        if (
          selection.anchorNode &&
          selection.anchorNode === this.selectionAnchorNode
        ) {
          this.setSelection(
            this.inputNode.selectionStart,
            this.inputNode.selectionEnd
          );
        }
      },
      false
    );
  }

  setSelection = (start, end) =>
    this.setState((prevState?: any) => ({
      selection: [...prevState.selection, { start, end }]
    }));

  handleEntityClick(entity: Entity) {
    const { text, selection } = this.state;
    const { start, end } = selection.pop();
    const value = text.substr(start, end - start);

    this.setState((prevState?: any) => ({
      entities: [...prevState.entities, { start, end, value, entity }]
    }));
  }

  handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { text: oldText, entities: oldEntities } = this.state;
    const text = event.target.value;
    const entities = [];

    //update the entity boundaries

    oldEntities.forEach(oldEntity => {
      const oldSelection = oldText.substr(
        oldEntity.start,
        oldEntity.end - oldEntity.start
      );

      function findClosestStart(lastMatch?: number) {
        if (!lastMatch) {
          const index = text.indexOf(oldSelection);
          if (index === -1) {
            return index;
          } else {
            return findClosestStart(index);
          }
        } else {
          const from = lastMatch + oldSelection.length;
          const index = text.indexOf(oldSelection, from);
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

      entities.push({
        ...oldEntity,
        start: start,
        end: start + oldSelection.length
      });
    });

    this.setState({
      text,
      entities
    });
  }

  renderEntityHighlight(text: string, entity: EntityInterface, key: number) {
    const start = text.substr(0, entity.start);
    const end = text.substr(entity.end);

    return (
      <div key={key} css={styles.zeroPos}>
        <span>{start}</span>
        <span style={{ backgroundColor: entity.entity.color }}>
          {entity.value}
        </span>
        <span>{end}</span>
      </div>
    );
  }

  render() {
    const { text, entities } = this.state;
    const { label, name, placeholder, entityLabels } = this.props;

    return (
      <Fragment>
        {label && <label htmlFor={name}>{label}</label>}
        <div css={styles.wrapper}>
          <div css={styles.labelList}>
            {entityLabels &&
              entityLabels.map(entity => (
                <span
                  css={styles.labelStyle}
                  style={{
                    backgroundColor: entity.color,
                    color: brightness(entity.color) < 50 ? "white" : "black"
                  }}
                  role="button"
                  onClick={() => this.handleEntityClick(entity)}
                >
                  {entity.name}
                </span>
              ))}
          </div>

          <div
            ref={node => (this.selectionAnchorNode = node)}
            style={{ position: "relative" }}
          >
            <input
              type="text"
              ref={node => (this.inputNode = node && findDOMNode(node))}
              onChange={event => this.handleTextChange(event)}
              value={text}
              placeholder={placeholder}
              css={styles.inputStyle}
            />
            {entities.map((entity, index) =>
              this.renderEntityHighlight(text, entity, index)
            )}
          </div>

          {/*entities.map(entity => <p>{entity.start}:{entity.end}:{entity.value}</p>)*/}
        </div>
      </Fragment>
    );
  }
}

export default Annotator;
