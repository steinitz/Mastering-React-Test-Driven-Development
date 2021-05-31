import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

const shouldLogUndefinedElement = false

export const childrenOf = element => {
  if (element == undefined) {
    if (shouldLogUndefinedElement) console.log ('childrenOf: undefined element argument');
    return [];
  }
  if (element.props == undefined) {
    if (shouldLogUndefinedElement) console.log ('childrenOf: undefined element.props. element = ', element);
    return [];
  }
  if (typeof(element) === 'string') {
    return [];
  }
   const {props: {children}} = element;
  if (!children) {
    return [];
  }
  if (typeof(children) === 'string') {
    return [children];
  }
  if (Array.isArray(children)) {
    return children;
  }
  return [children];
}

const elementsMatching = (element, matcherFn) => {
  if (matcherFn(element)) {
    return [element];
  }
  return childrenOf(element).reduce(
    (acc, child) => [
      ...acc,
      ...elementsMatching(child, matcherFn)
    ], []
  );
};

export const createShallowRenderer = () => {
  let renderer = new ShallowRenderer();

  return {
    render: component => renderer.render(component),
    elementMatching: matcherFn =>
      elementsMatching(renderer.getRenderOutput(), matcherFn)[0],
    elementsMatching: matcherFn =>
      elementsMatching(renderer.getRenderOutput(), matcherFn),
    child: n => childrenOf(renderer.getRenderOutput())[n],
  };
};

export const type = typeName => element => {
  if (!element) {
    if (shouldLogUndefinedElement) console.log('type: element argument undefined');
    return false;
  }
  return element.type === typeName;
};

export const id = id => element => {
  if (!element) {
    if (shouldLogUndefinedElement) console.log('id: element argument undefined');
    return false;
  }
  if (!element.props) {
    if (shouldLogUndefinedElement) console.log('id: element is not a React component');
    return false;
  }
  return element.props.id === id;
};

export const className = className => element => {
  if (!element) {
    if (shouldLogUndefinedElement) console.log('className: element argument undefined');
    return false;
  }
  if (!element.props) {
    if (shouldLogUndefinedElement) console.log('className: element is not a React component');
    return false;
  }
  return element.props.className === className;
};

export const click = element => element.props.onClick();
